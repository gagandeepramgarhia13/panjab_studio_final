import { useEffect, useRef, useState, useCallback } from "react";

// ============================================================================
// Reusable 3D scroll-animation primitives — the whole "camera moving through
// a 3D composition" system is built from these few hooks, reused everywhere
// (Hero, WhatWeDo, HomePhotography/Cinematography, About, Photography,
// Cinematography galleries) instead of one-off scroll code per component.
//
// Everything here is dependency-free (no GSAP/framer-motion/Lenis) — pure
// scroll/IntersectionObserver + rAF-throttled reads, transform/opacity only
// (GPU-friendly, never animates layout properties), and respects both
// `prefers-reduced-motion` and a mobile/tablet breakpoint where the heavier
// parallax and rotation are dialed back automatically.
// ============================================================================

/** True once, and live-updated, for prefers-reduced-motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mql.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/** True below the "full 3D experience" breakpoint (tablet/mobile). Depth,
 *  rotation and parallax distance are all reduced under this. */
export function useIsCompactViewport(breakpoint = 900) {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = () => setCompact(mql.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [breakpoint]);
  return compact;
}

/** Shared rAF-throttled scroll-Y subscription so every hook below reads the
 *  same single scroll listener instead of each registering its own. */
let scrollSubscribers = new Set();
let rafId = null;
let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

function tick() {
  lastScrollY = window.scrollY;
  scrollSubscribers.forEach((cb) => cb(lastScrollY));
  rafId = null;
}

function onScroll() {
  if (rafId == null) rafId = requestAnimationFrame(tick);
}

function subscribe(cb) {
  if (scrollSubscribers.size === 0 && typeof window !== "undefined") {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  scrollSubscribers.add(cb);
  return () => {
    scrollSubscribers.delete(cb);
    if (scrollSubscribers.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("scroll", onScroll);
    }
  };
}

/**
 * useScrollProgress — tracks how far a ref'd element has travelled through
 * the viewport, as a continuous 0→1 value (0 = just entering from the
 * bottom, 0.5 = centered, 1 = just leaving the top). This is the "scroll
 * position drives the animation continuously" primitive everything else is
 * built on, rather than a single fire-once IntersectionObserver trigger.
 */
export function useScrollProgress(range = 1) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when element's top is at the bottom of the viewport,
      // 1 when element's bottom has passed the top of the viewport.
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)) * range);
    };

    compute();
    const unsub = subscribe(compute);
    window.addEventListener("resize", compute);
    return () => {
      unsub();
      window.removeEventListener("resize", compute);
    };
  }, [range]);

  return [ref, progress];
}

/**
 * useTopExitProgress — for an element pinned at the very TOP of the page
 * (the Hero). Unlike useScrollProgress (built for "reveal an element as it
 * scrolls up into view from below"), this is 0 exactly at scrollY = 0 and
 * increases to 1 once the user has scrolled down past the element's own
 * height. useScrollProgress's formula evaluates to ≈0.5 for a top-pinned
 * element even at rest (zero scroll), which was causing the Hero heading/
 * CTA to render blurred and faded on page load before any scrolling
 * happened — this hook fixes that by measuring distance scrolled against
 * the element's own height instead of its position within the viewport.
 */
export function useTopExitProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const height = el.offsetHeight || 1;
      // rect.top is 0 at rest (top of page) and goes negative while
      // scrolling down past the element — exactly what we want as the
      // "how far past the hero have we scrolled" measure.
      const rect = el.getBoundingClientRect();
      const raw = Math.max(0, -rect.top) / height;
      setProgress(Math.min(1, raw));
    };

    compute();
    const unsub = subscribe(compute);
    window.addEventListener("resize", compute);
    return () => {
      unsub();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return [ref, progress];
}

/**
 * useParallax — moves an element vertically at a fraction/multiple of
 * scroll speed. speed < 1 = slower than scroll (background/midground),
 * speed > 1 = faster (foreground). Distance is clamped and reduced
 * automatically on compact viewports / reduced-motion.
 */
export function useParallax(speed = 0.3, { max = 120 } = {}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const compact = useIsCompactViewport();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setOffset(0);
      return;
    }
    const effectiveMax = compact ? Math.min(max, 32) : max;
    const effectiveSpeed = compact ? speed * 0.4 : speed;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerDelta = rect.top + rect.height / 2 - vh / 2;
      const value = Math.max(-effectiveMax, Math.min(effectiveMax, -centerDelta * effectiveSpeed * 0.15));
      setOffset(value);
    };

    compute();
    const unsub = subscribe(compute);
    window.addEventListener("resize", compute);
    return () => {
      unsub();
      window.removeEventListener("resize", compute);
    };
  }, [speed, max, reducedMotion, compact]);

  return [ref, offset];
}

/**
 * useDepthReveal — a "comes forward from depth" entrance: starts pushed
 * back in Z with a slight rotation/scale-down, and eases to its resting
 * transform as it crosses into view. Unlike a one-shot fade, the transform
 * is driven by the same continuous scroll progress used elsewhere, so it
 * keeps a subtle relationship with scroll position after the initial
 * reveal instead of just switching a class once.
 *
 * Deliberately transform/opacity ONLY — no `filter`. `transform` and
 * `opacity` are the two CSS properties browsers can animate purely on the
 * compositor thread; `filter` (blur in particular) forces a full repaint
 * on every single frame it changes. Recomputing a blur value on every
 * scroll tick was expensive enough to visibly delay hit-testing/click
 * handling on cards mid-animation (you'd scroll, the card looked right,
 * but a click didn't register until the animation — and the blur repaint
 * cost — had settled). Dropping the blur removes both the unwanted visual
 * effect and that interaction lag, while every other 3D transform stays.
 *
 * `depth`: 0 (subtle — body text/buttons) to 1 (strong — hero/major art).
 */
export function useDepthReveal({ depth = 0.6, delay = 0 } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const reducedMotion = usePrefersReducedMotion();
  const compact = useIsCompactViewport();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setStyle({ opacity: 1, transform: "none" });
      return;
    }

    const effectiveDepth = compact ? depth * 0.45 : depth;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Reveal window: element fully "arrived" once its top has crossed
      // ~78% up the viewport; before that it's still coming forward.
      const enterAt = vh * 0.92;
      const settledAt = vh * 0.35;
      let t = (enterAt - rect.top) / (enterAt - settledAt);
      t = Math.min(1, Math.max(0, t));
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      const translateZ = -140 * effectiveDepth * (1 - eased);
      const translateY = 46 * effectiveDepth * (1 - eased);
      const rotateX = 10 * effectiveDepth * (1 - eased);
      const scale = 1 - 0.08 * effectiveDepth * (1 - eased);
      const opacity = 0.15 + 0.85 * eased;

      setStyle({
        opacity,
        transform: `translate3d(0, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(1)}deg) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`,
        transitionDelay: `${delay}ms`,
      });
    };

    compute();
    const unsub = subscribe(compute);
    window.addEventListener("resize", compute);
    return () => {
      unsub();
      window.removeEventListener("resize", compute);
    };
  }, [depth, delay, reducedMotion, compact]);

  return [ref, style];
}

/**
 * use3DTilt — mouse-driven card tilt (perspective/rotateX/rotateY/translateZ
 * + a cursor-following glare), the same interaction TiltCard.jsx already
 * implements. Exposed here as a hook too so non-card elements (e.g. a
 * heading) can opt into the same physical-depth feel via useTextTilt below.
 * Inert on touch devices (no real cursor to tilt toward).
 */
export function use3DTilt({ max = 8, scale = 1.02 } = {}) {
  const ref = useRef(null);

  const supportsHover = useCallback(
    () => typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)").matches,
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      if (!supportsHover()) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const handleLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [max, scale, supportsHover]);

  return ref;
}
