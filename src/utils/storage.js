const isBrowser = typeof window !== 'undefined';
export const WALK_STATE_STORAGE_KEY = 'whj_walk_state_v1';
export const FEED_STORAGE_KEY = 'whj_feed_v1';
export const REFLECTIONS_STORAGE_KEY = 'whj_reflections_v1';
const JOURNAL_STORAGE_KEY = 'journal';

function safeParse(value, fallback) {
  try {
    return JSON.parse(value ?? '') ?? fallback;
  } catch (err) {
    return fallback;
  }
}

export function getProgress() {
  if (!isBrowser) return {};
  return safeParse(localStorage.getItem('progress'), {});
}

export function updateProgress(journeyId, miles) {
  if (!isBrowser) return;
  const progress = getProgress();
  progress[journeyId] = miles;
  localStorage.setItem('progress', JSON.stringify(progress));
}

export function getMiles(journeyId) {
  return getProgress()[journeyId] || 0;
}

export function getJournal() {
  if (!isBrowser) return [];
  return safeParse(localStorage.getItem(JOURNAL_STORAGE_KEY), []);
}

export function saveReflection(journeyId, text, title) {
  if (!isBrowser) return;
  const entries = getJournal();
  const now = new Date();
  entries.unshift({
    journeyId,
    text,
    title: title?.trim() ?? '',
    date: now.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  });
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
}

export function clearProgress() {
  if (!isBrowser) return;
  localStorage.removeItem('progress');
}

export function clearWalkState() {
  if (!isBrowser) return;
  localStorage.removeItem(WALK_STATE_STORAGE_KEY);
}

export function clearFeedHistory() {
  if (!isBrowser) return;
  localStorage.removeItem(FEED_STORAGE_KEY);
}

export function clearReflections() {
  if (!isBrowser) return;
  localStorage.removeItem(JOURNAL_STORAGE_KEY);
  localStorage.removeItem(REFLECTIONS_STORAGE_KEY);
}
