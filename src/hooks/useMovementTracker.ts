import { useCallback, useEffect, useRef, useState } from "react";

type Position = {
  latitude: number;
  longitude: number;
};

type MovementTrackerState = {
  distanceMeters: number;
  isTracking: boolean;
  error?: string;
};

type MovementTrackerControls = {
  startTracking: () => void;
  stopTracking: () => void;
  resetDistance: () => void;
};

const haversineDistance = (from: Position, to: Position) => {
  const earthRadiusMeters = 6371000;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusMeters * c;
};

const useMovementTracker = (): MovementTrackerState & MovementTrackerControls => {
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const watchIdRef = useRef<number | null>(null);
  const previousPositionRef = useRef<Position | null>(null);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = null;
    previousPositionRef.current = null;
    setIsTracking(false);
  }, []);

  const handlePositionUpdate = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const currentPosition: Position = { latitude, longitude };

    if (previousPositionRef.current) {
      const delta = haversineDistance(previousPositionRef.current, currentPosition);
      setDistanceMeters((current) => current + delta);
    }

    previousPositionRef.current = currentPosition;
  }, []);

  const handlePositionError = useCallback(
    (geolocationError: GeolocationPositionError) => {
      const message = geolocationError.message || "Unable to retrieve location";
      setError(message);
      stopTracking();
    },
    [stopTracking]
  );

  const startTracking = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setError(undefined);

    if (watchIdRef.current !== null) return;

    const watchId = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handlePositionError,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    watchIdRef.current = watchId;
    setIsTracking(true);
  }, [handlePositionError, handlePositionUpdate]);

  const resetDistance = useCallback(() => {
    setDistanceMeters(0);
    previousPositionRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    distanceMeters,
    isTracking,
    error,
    startTracking,
    stopTracking,
    resetDistance,
  };
};

export default useMovementTracker;
