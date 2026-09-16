import { Sun, Moon, Monitor } from "lucide-react";
import useTheme from "../useTheme";

const options = [
  { key: "light", icon: Sun, label: "Light" },
  { key: "dark", icon: Moon, label: "Dark" },
  { key: "system", icon: Monitor, label: "System" },
];

// Premium segmented Light / Dark / System control — a compact glass pill,
// not a generic checkbox/select. Fully driven by CSS variables so it looks
// correct (ivory-on-dark, dark-on-ivory) in both themes without any
// conditional class logic, and the active option gets the burgundy fill
// the rest of the site uses for active/selected states.
export default function ThemeToggle({ className = "" }) {
  const { pref, setPref } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-0.5 p-1 rounded-full border backdrop-blur-md ${className}`}
      style={{ background: "var(--surface-glass)", borderColor: "var(--border)" }}
      role="radiogroup"
      aria-label="Theme"
    >
      {options.map(({ key, icon: Icon, label }) => {
        const active = pref === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setPref(key)}
            className="relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300"
            style={{
              background: active ? "var(--accent)" : "transparent",
              color: active ? "#F6F0EA" : "var(--text-secondary)",
              boxShadow: active ? "0 4px 14px -4px var(--glow)" : "none",
            }}
          >
            <Icon size={13} strokeWidth={2.25} />
          </button>
        );
      })}
    </div>
  );
}
