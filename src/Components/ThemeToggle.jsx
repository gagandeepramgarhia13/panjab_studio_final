import { Moon, Sun } from "lucide-react";
import useTheme from "../useTheme";

// Compact two-state Dark/White luxury switch — a single pill with a
// sliding gold knob and a moon/sun icon, not a segmented 3-option control.
// Fully driven by CSS variables so it looks correct in both themes.
export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to White mode" : "Switch to Dark mode"}
      title={isDark ? "Switch to White mode" : "Switch to Dark mode"}
      className={`relative inline-flex items-center w-12 h-[26px] rounded-full border transition-colors duration-300 flex-shrink-0 ${className}`}
      style={{
        background: "var(--surface-glass)",
        borderColor: "var(--border-strong)",
        backdropFilter: "blur(10px)",
      }}
    >
      <span
        className="absolute top-[2px] left-[2px] flex items-center justify-center w-[20px] h-[20px] rounded-full transition-transform duration-300 ease-out"
        style={{
          transform: isDark ? "translateX(0)" : "translateX(22px)",
          background: "linear-gradient(135deg, var(--accent-hover), var(--accent))",
          boxShadow: "0 2px 8px -2px var(--glow)",
        }}
      >
        {isDark ? (
          <Moon size={12} strokeWidth={2.25} className="text-black/70" />
        ) : (
          <Sun size={12} strokeWidth={2.25} className="text-black/70" />
        )}
      </span>
    </button>
  );
}
