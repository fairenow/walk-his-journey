const BIBLE_BASE_URL = 'https://bible.guidedstepswellness.com/passage/kjv';

const toPathSegment = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function getBiblePassageUrl(book, reference) {
  const bookSlug = toPathSegment(book);
  const normalizedReference = reference.trim().replace(/[–—]/g, '-');
  const separatorIndex = normalizedReference.indexOf(':');

  if (separatorIndex === -1) {
    return `${BIBLE_BASE_URL}/${bookSlug}/${toPathSegment(normalizedReference)}`;
  }

  const chapter = normalizedReference.slice(0, separatorIndex);
  const verses = normalizedReference.slice(separatorIndex + 1);
  return `${BIBLE_BASE_URL}/${bookSlug}/${toPathSegment(chapter)}/${toPathSegment(verses)}`;
}
