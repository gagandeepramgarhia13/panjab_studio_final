import React from "react";
import { Star, Quote } from "lucide-react";

// A single published, real customer review — the same card is reused on the
// home page carousel and the full testimonials page grid so both look
// identical. Only reviews an admin has approved AND published ever reach
// this component.
export default function TestimonialCard({ testimonial, className = "" }) {
  const initials = (testimonial.name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <figure
      className={`flex h-full flex-col gap-5 rounded-3xl p-6 md:p-8 bg-white/[0.04] backdrop-blur-md ring-1 ring-white/10 text-gray-200 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_55px_-15px_rgba(200,164,93,0.25)] transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} className={i < testimonial.rating ? "fill-[#C8A45D] text-[#C8A45D]" : "text-white/20"} />
          ))}
        </div>
        <Quote className="h-6 w-6 shrink-0 text-[#C8A45D]/25" aria-hidden="true" />
      </div>

      <blockquote className="flex-1 text-sm md:text-base leading-relaxed italic">
        “{testimonial.message}”
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#C8A45D]/30 bg-[#C8A45D]/10 text-sm font-bold text-[#C8A45D]"
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-sm md:text-base text-white">{testimonial.name}</p>
          {testimonial.created_at && (
            <p className="truncate text-xs text-white/40">
              {new Date(testimonial.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
