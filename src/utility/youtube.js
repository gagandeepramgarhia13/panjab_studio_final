// Small, dependency-free helpers for turning a YouTube URL (any common
// shape an admin might paste — watch?v=, youtu.be/, /embed/, /shorts/,
// /live/, with or without extra query params like a timestamp or playlist)
// into the pieces the UI needs: the bare 11-character video ID, a thumbnail
// image URL, a privacy-friendly embed URL, and the canonical watch URL for
// the "Watch on YouTube" button.

/** Extracts the 11-char YouTube video ID from a URL, or null if it doesn't
 *  look like a YouTube link at all. Accepts a bare ID too, so re-running it
 *  on an already-extracted ID is safe. */
export function getYouTubeId(url) {
  if (!url) return null;
  const trimmed = String(url).trim();

  // Already looks like a bare 11-character video ID.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const re of patterns) {
    const match = trimmed.match(re);
    if (match) return match[1];
  }
  return null;
}

/** Best-quality thumbnail that YouTube always generates (hqdefault is
 *  guaranteed to exist for every video; maxresdefault isn't). */
export function getYouTubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/** youtube-nocookie.com embed — plays inline without setting YouTube
 *  tracking cookies until the viewer actually interacts with the player. */
export function getYouTubeEmbedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/** Canonical watch URL, for the "Watch on YouTube" link/button. */
export function getYouTubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
