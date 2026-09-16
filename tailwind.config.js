export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme is driven by a data-theme="dark" | "light" attribute on <html>
  // (see index.html's inline init script + ThemeToggle.jsx), not the OS
  // media query directly — that lets a manual Light/Dark choice override
  // the system preference. Any `dark:` utility used anywhere follows this.
  darkMode: ["selector", '[data-theme="dark"]'],
  // 🔥 Makes every `hover:` utility sitewide (card lifts/tilts, glows,
  // button/nav hover states, etc.) apply ONLY on devices that truly support
  // hovering with a mouse. On touchscreens, `hover:` styles never trigger
  // (and never get "stuck" after a tap) — this is what turns off the card
  // hover system on mobile without having to touch every component.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        // Sophisticated editorial serif for headings, clean modern sans
        // for body copy — the "luxury wedding studio" typography pairing.
        display: ["\"Cormorant Garamond\"", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        beige: "#F6F0E1",
        dark_beige: "#E8D9C0",
        light_beige: "#FDF7F0",
        dark_brown: "#5A4B38",
        primary_green: "#1F3D2B",
        sage_green: "#6B8F71",
        // 🔥 Dark Cinematic Luxury — Champagne Gold accent system.
        gold: "#C8A45D",
        "gold-bright": "#E0C27A",
        "gold-soft": "#A8894D",
        ivory: "#F8F5F0",
        text_color: "#e2be6a",
      },
    },
  },
  plugins: [],
};