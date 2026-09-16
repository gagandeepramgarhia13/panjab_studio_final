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
      colors: {
        beige: "#F6F0E1",
        dark_beige: "#E8D9C0",
        light_beige: "#FDF7F0",
        dark_brown: "#5A4B38",
        primary_green: "#1F3D2B",
        sage_green: "#6B8F71",
        // 🔥 New brand direction — Burgundy + Dusty Rose (replaces the old
        // gold system). `gold` is kept as an alias so it still resolves
        // correctly if referenced anywhere legacy.
        gold: "#6B2638",
        burgundy: "#6B2638",
        "burgundy-hover": "#85354A",
        "dusty-rose": "#B9828C",
        "soft-rose": "#D8BFC2",
        ivory: "#F8F5F0",
        text_color: "#e2be6a",
      },
    },
  },
  plugins: [],
};