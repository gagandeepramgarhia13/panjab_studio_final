import { useEffect, useState } from "react";

// Single source of truth for the site's Light / Dark / System theme.
// Kept as a plain hook (no Context) since only the Navbar's ThemeToggle
// needs to *change* it — every other component just reads var(--x) from
// index.css and repaints automatically when data-theme flips.
//
// The actual "no flash on load" work happens in index.html's inline
// script, which runs before React even mounts. This hook re-applies the
// same resolution logic afterwards so React state and the DOM attribute
// never drift apart, and keeps listening for OS-level changes while the
// preference is "system".
const STORAGE_KEY = "panjab-theme";

function resolveTheme(pref) {
  if (pref === "system") {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return pref;
}

function applyTheme(pref) {
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.setAttribute("data-theme-pref", pref);
  return resolved;
}

function readStoredPref() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "system";
  } catch {
    return "system";
  }
}

export default function useTheme() {
  const [pref, setPrefState] = useState(readStoredPref);
  const [resolved, setResolved] = useState(() => applyTheme(readStoredPref()));

  const setPref = (next) => {
    setPrefState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still works
      // for this page view, it just won't persist across reloads.
    }
    setResolved(applyTheme(next));
  };

  // Follow OS-level changes live while "system" is selected.
  useEffect(() => {
    if (pref !== "system" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setResolved(applyTheme("system"));
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [pref]);

  return { pref, resolved, setPref };
}
