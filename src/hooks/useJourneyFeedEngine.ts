import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { journeyScenes } from "../data/journeys.ts";
import useMovementTracker from "./useMovementTracker";

type WalkState = {
  currentSceneId: string;
  currentMomentIndex: number;
  totalDistanceMeters: number;
  distanceSinceLastMomentMeters: number;
};

type FeedMessage = {
  id: string;
  sceneId: string;
  momentIndex: number;
  text: string;
  timestamp: string;
};

type JourneyFeedEngine = {
  walkState: WalkState;
  feed: FeedMessage[];
  distanceMeters: number;
  isTracking: boolean;
  error?: string;
  startTracking: () => void;
  stopTracking: () => void;
  resetDistance: () => void;
  resetJourney: () => void;
};

const WALK_STATE_STORAGE_KEY = "whj_walk_state_v1";
const FEED_STORAGE_KEY = "whj_feed_v1";
const DISTANCE_PER_MOMENT_METERS = 25;

const safeParse = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn("Failed to parse stored value", error);
    return null;
  }
};

const createDefaultWalkState = (): WalkState => ({
  currentSceneId: journeyScenes[0]?.id ?? "",
  currentMomentIndex: 0,
  totalDistanceMeters: 0,
  distanceSinceLastMomentMeters: 0,
});

const createFeedMessage = (
  sceneId: string,
  momentIndex: number,
  text: string
): FeedMessage => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${sceneId}-${momentIndex}-${Date.now()}`,
  sceneId,
  momentIndex,
  text,
  timestamp: new Date().toISOString(),
});

const useJourneyFeedEngine = (): JourneyFeedEngine => {
  const {
    distanceMeters,
    isTracking,
    error,
    startTracking,
    stopTracking,
    resetDistance,
  } = useMovementTracker();

  const sceneOrder = useMemo(() => [...journeyScenes].sort((a, b) => a.order - b.order), []);
  const sceneById = useMemo(
    () => sceneOrder.reduce((map, scene) => ({ ...map, [scene.id]: scene }), {} as Record<string, (typeof journeyScenes)[number]>),
    [sceneOrder]
  );

  const [walkState, setWalkState] = useState<WalkState>(() => {
    const stored = safeParse<WalkState>(localStorage.getItem(WALK_STATE_STORAGE_KEY));
    if (stored && stored.currentSceneId) {
      return stored;
    }

    const fallback = createDefaultWalkState();
    localStorage.setItem(WALK_STATE_STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  });

  const [feed, setFeed] = useState<FeedMessage[]>(() => {
    const stored = safeParse<FeedMessage[]>(localStorage.getItem(FEED_STORAGE_KEY));
    if (stored) return stored;

    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify([]));
    return [];
  });

  const lastDistanceRef = useRef(distanceMeters);

  const getNextScene = useCallback(
    (currentSceneId: string) => {
      const currentIndex = sceneOrder.findIndex((scene) => scene.id === currentSceneId);
      if (currentIndex === -1) return null;
      return sceneOrder[currentIndex + 1] ?? null;
    },
    [sceneOrder]
  );

  useEffect(() => {
    localStorage.setItem(WALK_STATE_STORAGE_KEY, JSON.stringify(walkState));
  }, [walkState]);

  useEffect(() => {
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(feed));
  }, [feed]);

  useEffect(() => {
    if (distanceMeters <= lastDistanceRef.current) return;

    const distanceDelta = distanceMeters - lastDistanceRef.current;
    lastDistanceRef.current = distanceMeters;

    setWalkState((previous) => {
      const updates: FeedMessage[] = [];
      let totalDistanceMeters = previous.totalDistanceMeters + distanceDelta;
      let distanceSinceLastMomentMeters =
        previous.distanceSinceLastMomentMeters + distanceDelta;
      let currentSceneId = previous.currentSceneId || createDefaultWalkState().currentSceneId;
      let currentMomentIndex = previous.currentMomentIndex;

      while (distanceSinceLastMomentMeters >= DISTANCE_PER_MOMENT_METERS) {
        const scene = sceneById[currentSceneId];

        if (!scene) {
          distanceSinceLastMomentMeters = 0;
          break;
        }

        if (currentMomentIndex < scene.moments.length) {
          const momentText = scene.moments[currentMomentIndex];
          if (momentText) {
            updates.push(createFeedMessage(currentSceneId, currentMomentIndex, momentText));
          }

          currentMomentIndex += 1;
          distanceSinceLastMomentMeters -= DISTANCE_PER_MOMENT_METERS;
          continue;
        }

        const nextScene = getNextScene(scene.id);
        if (!nextScene) {
          distanceSinceLastMomentMeters = 0;
          break;
        }

        currentSceneId = nextScene.id;
        currentMomentIndex = 0;
      }

      if (updates.length) {
        setFeed((existing) => [...existing, ...updates]);
      }

      return {
        currentSceneId,
        currentMomentIndex,
        totalDistanceMeters,
        distanceSinceLastMomentMeters,
      };
    });
  }, [distanceMeters, getNextScene, sceneById]);

  const resetJourney = useCallback(() => {
    const resetState = createDefaultWalkState();
    setFeed([]);
    setWalkState(resetState);
    lastDistanceRef.current = 0;
    resetDistance();
  }, [resetDistance]);

  return {
    walkState,
    feed,
    distanceMeters,
    isTracking,
    error,
    startTracking,
    stopTracking,
    resetDistance,
    resetJourney,
  };
};

export default useJourneyFeedEngine;
