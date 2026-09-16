import { useState } from "react";

// Single source of truth for the site's Dark / White theme. Only two
// themes exist now (no "system" option) — kept as a plain hook (no
// Context) since only the Navbar's ThemeToggle needs to *change* it —
// every other component just reads var(--x) from index.css and repaints
// automatically when data-theme flips.
//
// The actual "no flash on load" work happens in index.html's inline
// script, which runs before React even mounts. This hook re-applies the
// same logic afterwards so React state and the DOM attribute never drift
// apart.
const STORAGE_KEY = "panjab-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function useTheme() {
  const [theme, setThemeState] = useState(() => applyTheme(readStoredTheme()));

  const setTheme = (next) => {
    setThemeState(applyTheme(next));
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still works
      // for this page view, it just won't persist across reloads.
    }
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, setTheme, toggle };
}
