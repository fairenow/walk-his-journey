const isBrowser = typeof window !== 'undefined';

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
  return safeParse(localStorage.getItem('journal'), []);
}

export function saveReflection(journeyId, text) {
  if (!isBrowser) return;
  const entries = getJournal();
  const now = new Date();
  entries.unshift({
    journeyId,
    text,
    date: now.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  });
  localStorage.setItem('journal', JSON.stringify(entries));
}

export function clearProgress() {
  if (!isBrowser) return;
  localStorage.removeItem('progress');
}
