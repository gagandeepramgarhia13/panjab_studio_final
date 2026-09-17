import { useParallax } from "../hooks/useScrollAnimation";

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
//
// Kept deliberately dark/low-contrast (opacities toned down from the first
// pass) so it reads as ambient depth, not a bright highlight competing with
// content — and each glow layer now also drifts a little with scroll at its
// own speed (background layer = slowest), giving the page's furthest depth
// layer in the "background moves slower than foreground" 3D scroll system.
export default function HomeAmbientBackground() {
  const [auroraRef, auroraY] = useParallax(0.06, { max: 60 });
  const [orb1Ref, orb1Y] = useParallax(0.1, { max: 80 });
  const [orb2Ref, orb2Y] = useParallax(0.08, { max: 70 });

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ background: "var(--background)" }}
      aria-hidden="true"
    >
      {/* Slow-drifting blurred aurora mesh — the soft, moving gradient that
          gives the whole page a living, cinematic depth. */}
      <div
        ref={auroraRef}
        className="parallax-el absolute left-1/2 top-1/2 w-[160vw] h-[160vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(200,164,93,0.09), rgba(60,48,26,0.05) 30%, transparent 55%, rgba(200,164,93,0.06) 80%, rgba(200,164,93,0.09))",
          filter: "blur(140px)",
          animation: "auroraDrift 32s ease-in-out infinite alternate",
          transform: `translate3d(-50%, calc(-50% + ${auroraY}px), 0)`,
        }}
      />

      {/* Two large, slow-floating gold glow orbs, opposite corners. */}
      <div
        ref={orb1Ref}
        className="parallax-el absolute -top-1/4 -left-1/4 w-[65vw] h-[65vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,164,93,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "floatSlow 18s ease-in-out infinite",
          transform: `translate3d(0, ${orb1Y}px, 0)`,
        }}
      />
      <div
        ref={orb2Ref}
        className="parallax-el absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,137,77,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "floatSlower 24s ease-in-out infinite",
          transform: `translate3d(0, ${orb2Y}px, 0)`,
        }}
      />

      {/* Faint drifting particles for a subtle "alive" feel. */}
      <div
        className="absolute top-[22%] right-[16%] w-2 h-2 rounded-full"
        style={{
          background: "#C8A45D",
          opacity: 0.3,
          boxShadow: "0 0 14px 4px rgba(200,164,93,0.25)",
          animation: "particleDrift 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[30%] left-[10%] w-1.5 h-1.5 rounded-full"
        style={{
          background: "#C8A45D",
          opacity: 0.22,
          boxShadow: "0 0 10px 3px rgba(200,164,93,0.2)",
          animation: "particleDrift 14s ease-in-out infinite 2s",
        }}
      />
    </div>
  );
}
