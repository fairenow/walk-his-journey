import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type WalkSession = {
  id: string;
  startedAt: string;
  endedAt: string | null;
  distanceMeters: number;
};

type StoredTracking = {
  totalDistanceMeters: number;
  activeSession: WalkSession | null;
  sessions: WalkSession[];
  wantsTracking: boolean;
};

type TrackingContextValue = StoredTracking & {
  isTracking: boolean;
  error?: string;
  lastUpdatedAt: string | null;
  startTracking: () => void;
  stopTracking: () => void;
  clearHistory: () => void;
};

const STORAGE_KEY = "whj_distance_tracking_v2";
const defaultState: StoredTracking = {
  totalDistanceMeters: 0,
  activeSession: null,
  sessions: [],
  wantsTracking: false,
};

const readState = (): StoredTracking => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return stored ? { ...defaultState, ...stored } : defaultState;
  } catch {
    return defaultState;
  }
};

const distanceBetween = (a: GeolocationCoordinates, b: GeolocationCoordinates) => {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(b.latitude - a.latitude);
  const longitudeDelta = radians(b.longitude - a.longitude);
  const latitudeA = radians(a.latitude);
  const latitudeB = radians(b.latitude);
  const value =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.sin(longitudeDelta / 2) ** 2 * Math.cos(latitudeA) * Math.cos(latitudeB);
  return 6371000 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredTracking>(readState);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string>();
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);
  const previousPosition = useRef<GeolocationPosition | null>(null);
  const stateRef = useRef(state);

  const persist = useCallback((next: StoredTracking) => {
    stateRef.current = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setState(next);
  }, []);

  const stopWatch = useCallback(() => {
    if (watchId.current !== null) navigator.geolocation?.clearWatch(watchId.current);
    watchId.current = null;
    previousPosition.current = null;
    setIsTracking(false);
  }, []);

  const beginWatch = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Location tracking is not supported by this browser.");
      return;
    }
    if (watchId.current !== null) return;

    setError(undefined);
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const previous = previousPosition.current;
        previousPosition.current = position;
        setLastUpdatedAt(new Date(position.timestamp).toISOString());

        if (!previous) return;
        const elapsedSeconds = Math.max((position.timestamp - previous.timestamp) / 1000, 1);
        const delta = distanceBetween(previous.coords, position.coords);
        const acceptableAccuracy = position.coords.accuracy <= 100;
        const believableWalkingSpeed = delta / elapsedSeconds <= 4.5;
        if (delta < 1 || !acceptableAccuracy || !believableWalkingSpeed) return;

        const current = stateRef.current;
        if (!current.activeSession) return;
        const activeSession = {
          ...current.activeSession,
          distanceMeters: current.activeSession.distanceMeters + delta,
        };
        persist({
          ...current,
          totalDistanceMeters: current.totalDistanceMeters + delta,
          activeSession,
        });
      },
      (locationError) => {
        if (locationError.code === locationError.PERMISSION_DENIED) {
          stopWatch();
          persist({ ...stateRef.current, wantsTracking: false });
        }
        setError(locationError.message || "We could not update your location.");
      },
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 30000 }
    );
    setIsTracking(true);
  }, [persist, stopWatch]);

  const startTracking = useCallback(() => {
    const current = stateRef.current;
    const activeSession = current.activeSession ?? {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      startedAt: new Date().toISOString(),
      endedAt: null,
      distanceMeters: 0,
    };
    persist({ ...current, activeSession, wantsTracking: true });
    beginWatch();
  }, [beginWatch, persist]);

  const stopTracking = useCallback(() => {
    stopWatch();
    const current = stateRef.current;
    const sessions = current.activeSession
      ? [{ ...current.activeSession, endedAt: new Date().toISOString() }, ...current.sessions]
      : current.sessions;
    persist({ ...current, activeSession: null, sessions, wantsTracking: false });
  }, [persist, stopWatch]);

  const clearHistory = useCallback(() => {
    const current = stateRef.current;
    persist({
      ...current,
      totalDistanceMeters: current.activeSession?.distanceMeters ?? 0,
      sessions: [],
    });
  }, [persist]);

  useEffect(() => {
    if (stateRef.current.wantsTracking) beginWatch();
    return stopWatch;
  }, [beginWatch, stopWatch]);

  return (
    <TrackingContext.Provider value={{ ...state, isTracking, error, lastUpdatedAt, startTracking, stopTracking, clearHistory }}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) throw new Error("useTracking must be used inside TrackingProvider");
  return context;
}
