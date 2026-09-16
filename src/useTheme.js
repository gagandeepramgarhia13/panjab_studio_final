// Dark mode is the only theme now — the White/Light option has been
// removed entirely. This hook is kept as a tiny no-op shim (rather than
// deleting it outright) so any existing import doesn't break; it simply
// makes sure the dark data-theme attribute is stamped on <html>.
export default function useTheme() {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  return { theme: "dark", setTheme: () => {}, toggle: () => {} };
}
