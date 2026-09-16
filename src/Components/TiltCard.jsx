import { useRef } from "react";

// Reusable 3D "tilt on mouse move" wrapper — the card leans toward the
// cursor with a bit of perspective depth and a soft gold glare that follows
// the pointer, then eases back flat when the mouse leaves. Pure CSS
// transforms via refs (no re-renders), so it stays smooth on any card.
//
// Usage: <TiltCard><YourCardMarkup /></TiltCard>
// `max` controls how far it tilts (degrees) — keep this small (default 6)
// so it stays tasteful rather than gimmicky. `glare` can be turned off for
// cards that already have busy hover effects of their own.
export default function TiltCard({ children, className = "", max = 6, glare = true, ...rest }) {
  const wrapRef = useRef(null);
  const glareRef = useRef(null);

  const handleMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * max * 2;
    const rotateX = (0.5 - py) * max * 2;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(200,169,106,0.25), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    const el = wrapRef.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glare && glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative will-change-transform transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
      {...rest}
    >
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 z-20"
        />
      )}
      {children}
    </div>
  );
}
