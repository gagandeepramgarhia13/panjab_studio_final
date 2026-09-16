export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 🔥 Makes every `hover:` utility sitewide (card lifts/tilts, gold glows,
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
        gold: "#C8A96A",
        ivory: "#F8F5F0",
        text_color: "#e2be6a",
      },
    },
  },
  plugins: [],
};