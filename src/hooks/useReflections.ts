import { useCallback, useEffect, useState } from "react";
import { REFLECTIONS_STORAGE_KEY } from "../utils/storage.js";

type ReflectionEntry = {
  text: string;
  createdAt: string;
};

const safeParse = <T,>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn("Failed to parse reflections", error);
    return null;
  }
};

const useReflections = () => {
  const [reflections, setReflections] = useState<Record<string, ReflectionEntry>>(() => {
    return safeParse<Record<string, ReflectionEntry>>(localStorage.getItem(REFLECTIONS_STORAGE_KEY)) ?? {};
  });

  useEffect(() => {
    localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(reflections));
  }, [reflections]);

  const saveReflection = useCallback((messageId: string, text: string) => {
    setReflections((previous) => ({
      ...previous,
      [messageId]: {
        text,
        createdAt: new Date().toISOString(),
      },
    }));
  }, []);

  const deleteReflection = useCallback((messageId: string) => {
    setReflections((previous) => {
      const { [messageId]: _removed, ...rest } = previous;
      return rest;
    });
  }, []);

  const getReflection = useCallback(
    (messageId: string) => reflections[messageId] ?? null,
    [reflections]
  );

  return {
    reflections,
    saveReflection,
    deleteReflection,
    getReflection,
  };
};

export type { ReflectionEntry };
export default useReflections;
