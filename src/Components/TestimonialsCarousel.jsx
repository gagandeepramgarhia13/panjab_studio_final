import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { usePrefersReducedMotion } from "../hooks/useScrollAnimation";

// A 3D "coverflow" testimonials carousel for the home page: the active
// review sits centered and sharp, the neighbours fall away into depth,
// blurred and rotated, and it auto-advances every few seconds (pausing on
// hover). Dependency-free — just React state + CSS transforms, matching the
// rest of this project's scroll/animation system.
export default function TestimonialsCarousel({ testimonials }) {
  const reducedMotion = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const nextSlide = useCallback(() => {
    if (!testimonials.length) return;
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  }, [testimonials.length]);

  const previousSlide = useCallback(() => {
    if (!testimonials.length) return;
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  }, [testimonials.length]);

  // Auto-advance every 3s; pauses on hover, and never runs for reduced motion.
  useEffect(() => {
    if (testimonials.length <= 1 || reducedMotion || isPaused) return undefined;
    const timer = window.setInterval(nextSlide, 3000);
    return () => window.clearInterval(timer);
  }, [testimonials.length, reducedMotion, isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") previousSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  useEffect(() => {
    if (testimonials.length > 0 && activeIndex >= testimonials.length) setActiveIndex(0);
  }, [testimonials.length, activeIndex]);

  // -2 = far left … 0 = center/active … 2 = far right
  const getPosition = (index) => {
    const total = testimonials.length;
    if (total <= 1) return 0;
    let position = index - activeIndex;
    if (position > total / 2) position -= total;
    if (position < -total / 2) position += total;
    return position;
  };

  if (!testimonials.length) return null;

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto w-full h-[420px] sm:h-[400px] lg:h-[430px] overflow-hidden lg:overflow-visible" style={{ perspective: "1600px" }}>
        {testimonials.map((testimonial, index) => {
          const position = getPosition(index);
          const isActive = position === 0;

          if (!isDesktop && !isActive) return null;
          if (Math.abs(position) > 2) return null;

          let transform, opacity, filter, zIndex, scale;
          const width = "w-[88%] sm:w-[560px] lg:w-[620px]";

          if (position === 0) {
            transform = "translateX(-50%) translateZ(80px) rotateY(0deg)";
            opacity = 1; filter = "blur(0px)"; scale = 1; zIndex = 30;
          } else if (position === -1) {
            transform = "translateX(-112%) translateZ(-100px) rotateY(10deg)";
            opacity = 0.32; filter = "blur(2px)"; scale = 0.86; zIndex = 20;
          } else if (position === 1) {
            transform = "translateX(12%) translateZ(-100px) rotateY(-10deg)";
            opacity = 0.32; filter = "blur(2px)"; scale = 0.86; zIndex = 20;
          } else if (position === -2) {
            transform = "translateX(-165%) translateZ(-250px) rotateY(18deg)";
            opacity = 0.10; filter = "blur(5px)"; scale = 0.72; zIndex = 10;
          } else {
            transform = "translateX(65%) translateZ(-250px) rotateY(-18deg)";
            opacity = 0.10; filter = "blur(5px)"; scale = 0.72; zIndex = 10;
          }

          return (
            <article
              key={testimonial.id}
              onClick={() => { if (!isActive) setActiveIndex(index); }}
              className={`absolute left-1/2 top-0 ${width} transform-gpu origin-center ${!isActive ? "cursor-pointer" : ""} ${reducedMotion ? "transition-none" : "transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"}`}
              style={{
                transform: `${transform} scale(${scale})`,
                opacity,
                filter,
                zIndex,
                transformStyle: "preserve-3d",
              }}
              aria-hidden={!isActive}
            >
              {isActive && (
                <>
                  <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-[#C8A45D]/10 blur-3xl" aria-hidden="true" />
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl border border-[#C8A45D]/20" aria-hidden="true" />
                </>
              )}

              <div className={`relative overflow-hidden rounded-2xl border ${isActive ? "border-[#C8A45D]/35" : "border-white/10"} bg-[var(--background-secondary)]/95 backdrop-blur-xl shadow-2xl ${isActive ? "shadow-[0_25px_80px_rgba(0,0,0,0.5)]" : ""}`}>
                {isActive && (
                  <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" aria-hidden="true" />
                )}
                <TestimonialCard testimonial={testimonial} className="h-full !shadow-none !ring-0 !bg-transparent" />
              </div>
            </article>
          );
        })}
      </div>

      {testimonials.length > 1 && (
        <div className="relative z-40 mt-2 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={previousSlide}
            className="group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-[#C8A45D]/40 hover:bg-[#C8A45D]/[0.08] hover:text-[#C8A45D] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/40"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((testimonial, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/40 ${active ? "w-7 bg-[#C8A45D]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-[#C8A45D]/40 hover:bg-[#C8A45D]/[0.08] hover:text-[#C8A45D] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/40"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
