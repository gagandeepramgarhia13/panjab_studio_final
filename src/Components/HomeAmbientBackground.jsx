// A single, continuous animated gradient background for the entire Home
// page. Every home section used to paint its own flat background color
// plus its own clipped ambient glow — two adjacent sections with slightly
// different edge treatment is exactly what produced the visible seam/
// "highlighted partition" line between sections. The fix is architectural:
// there is now exactly ONE background layer for the whole page, fixed
// behind everything, so there is nothing left to create a seam between
// sections — it's the same pixel underneath the whole scroll.
//
// `fixed` (not `absolute`) so it always fills the viewport regardless of
// total page height, stays cheap (one composited layer, never resized on
// scroll) and never leaves a gap past the last section. Pure CSS
// transforms/opacity only — GPU-friendly, no layout thrash while scrolling.
export default function HomeAmbientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ background: "var(--background)" }}
      aria-hidden="true"
    >
      {/* Slow-drifting blurred aurora mesh — the soft, moving gradient that
          gives the whole page a living, cinematic depth. */}
      <div
        className="absolute left-1/2 top-1/2 w-[160vw] h-[160vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(200,164,93,0.16), rgba(84,68,38,0.08) 30%, transparent 55%, rgba(200,164,93,0.10) 80%, rgba(200,164,93,0.16))",
          filter: "blur(140px)",
          animation: "auroraDrift 32s ease-in-out infinite alternate",
        }}
      />

      {/* Two large, slow-floating gold glow orbs, opposite corners. */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[65vw] h-[65vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,164,93,0.14) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "floatSlow 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,137,77,0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "floatSlower 24s ease-in-out infinite",
        }}
      />

      {/* Faint drifting particles for a subtle "alive" feel. */}
      <div
        className="absolute top-[22%] right-[16%] w-2 h-2 rounded-full"
        style={{
          background: "#C8A45D",
          opacity: 0.5,
          boxShadow: "0 0 14px 4px rgba(200,164,93,0.4)",
          animation: "particleDrift 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[30%] left-[10%] w-1.5 h-1.5 rounded-full"
        style={{
          background: "#C8A45D",
          opacity: 0.4,
          boxShadow: "0 0 10px 3px rgba(200,164,93,0.35)",
          animation: "particleDrift 14s ease-in-out infinite 2s",
        }}
      />
    </div>
  );
}
