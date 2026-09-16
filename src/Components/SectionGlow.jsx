// Purely decorative ambient background — slow-moving gold glow orbs, a
// gently rotating halo ring, and a couple of drifting light particles.
// Matches the site's gold/black (Panjab Studios logo) theme and gives an
// otherwise flat/empty background some living, "3D" depth — like a very
// slow, subtle GIF rather than a static texture.
//
// Usage: drop it as the FIRST child of a `relative overflow-hidden`
// section. Wrap the section's real content in a `relative z-10` wrapper
// so it stays above this layer. It never touches content — decoration only.
export default function SectionGlow({ variant = "light", className = "" }) {
  const isDark = variant === "dark";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Slowly rotating halo ring — the "3D, moving" centerpiece */}
      <div
        className="absolute left-1/2 top-1/2 w-[42rem] h-[42rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: isDark
            ? "conic-gradient(from 0deg, rgba(200,169,106,0.16), transparent 25%, transparent 75%, rgba(200,169,106,0.16))"
            : "conic-gradient(from 0deg, rgba(200,169,106,0.12), transparent 25%, transparent 75%, rgba(200,169,106,0.12))",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "spinSlow 40s linear infinite",
        }}
      />

      {/* Primary gold glow orb, drifting */}
      <div
        className="absolute -top-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,106,0.45) 0%, rgba(200,169,106,0) 70%)",
          opacity: isDark ? 0.5 : 0.35,
          animation: "floatSlow 16s ease-in-out infinite",
        }}
      />

      {/* Secondary glow orb, opposite corner, drifting the other way */}
      <div
        className="absolute -bottom-28 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(232,205,143,0.35) 0%, rgba(232,205,143,0) 70%)"
            : "radial-gradient(circle, rgba(90,75,56,0.16) 0%, rgba(90,75,56,0) 70%)",
          opacity: isDark ? 0.45 : 0.3,
          animation: "floatSlower 20s ease-in-out infinite",
        }}
      />

      {/* Small drifting light particles for a subtle "alive" feel */}
      <div
        className="absolute top-[20%] right-[18%] w-2 h-2 rounded-full"
        style={{
          background: "#C8A96A",
          opacity: isDark ? 0.6 : 0.4,
          boxShadow: "0 0 12px 4px rgba(200,169,106,0.5)",
          animation: "particleDrift 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[25%] left-[12%] w-1.5 h-1.5 rounded-full"
        style={{
          background: "#C8A96A",
          opacity: isDark ? 0.5 : 0.35,
          boxShadow: "0 0 10px 3px rgba(200,169,106,0.45)",
          animation: "particleDrift 12s ease-in-out infinite 2s",
        }}
      />

      {/* Soft vignette so the glow blends back into the section edges */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)"
            : "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.03) 100%)",
        }}
      />
    </div>
  );
}
