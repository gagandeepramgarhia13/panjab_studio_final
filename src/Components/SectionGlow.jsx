// Purely decorative ambient background — soft gold glow orbs + a faint
// diagonal texture, matching the site's gold/black (Panjab Studios logo)
// theme. Drop it as the FIRST child of a `relative overflow-hidden`
// section to give an otherwise flat/empty background some depth, without
// touching any real content. Wrap the section's actual content in a
// `relative z-10` wrapper so it stays above this layer.
export default function SectionGlow({ variant = "light", className = "" }) {
  const isDark = variant === "dark";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Primary gold glow */}
      <div
        className="absolute -top-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,106,0.45) 0%, rgba(200,169,106,0) 70%)",
          opacity: isDark ? 0.5 : 0.35,
          animation: "floatSlow 16s ease-in-out infinite",
        }}
      />

      {/* Secondary glow, opposite corner */}
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

      {/* Faint diagonal line texture for subtle 3D depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.05 : 0.035,
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          color: isDark ? "#C8A96A" : "#5A4B38",
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
