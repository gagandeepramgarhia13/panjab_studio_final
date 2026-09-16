import { useEffect, useState } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import SectionGlow from "./SectionGlow";

// Fallback quote — only shown while no real customer testimonial has been
// approved + published yet, so the section is never empty on a fresh site.
const fallback = {
  message:
    "These guys are absolutely fabulous at what they do, they do their jobs with such elegance and passion. Just made our special day that much more fun and memorable.",
  name: null,
  rating: 5,
};

export default function HomeTestimonials() {
  const [live, setLive] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLive() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (!error && data) setLive(data);
      setLoading(false);
    }
    fetchLive();
  }, []);

  // Slowly rotate through real, published testimonials when there's more than one.
  useEffect(() => {
    if (live.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % live.length), 6000);
    return () => clearInterval(id);
  }, [live.length]);

  const current = live.length > 0 ? live[index] : fallback;

  return (
    <section className="w-full py-20 bg-[#e5e5e5] flex items-center justify-center text-center relative overflow-hidden">

      <SectionGlow variant="light" />

      {/* 🔹 Content */}
      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold text-black mb-10">
          Know Our Customer Feedback
        </h2>

        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <FaQuoteRight className="text-5xl text-black/20" />
        </div>

        {/* Testimonial Card */}
        {!loading && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-[0_25px_60px_-20px_rgba(90,75,56,0.25)] ring-1 ring-black/5 px-6 py-8 sm:px-10 sm:py-10 transition-transform duration-500 hover:-translate-y-1">
            {/* Testimonial Text */}
            <p key={current.id || "fallback"} className="text-black/80 leading-relaxed mb-6">
              “{current.message}”
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 text-[#C8A96A] mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < (current.rating || 5) ? "" : "opacity-30"} />
              ))}
            </div>

            {current.name && (
              <p className="text-black/50 text-sm font-medium">— {current.name}</p>
            )}
          </div>
        )}

        {/* Dots — only when there's more than one live testimonial to rotate through */}
        {live.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-5">
            {live.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-[#C8A96A]" : "w-1.5 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <Link
            to="/testimonials"
            className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition hover:-translate-y-0.5 duration-300"
          >
            Testimonials
          </Link>
          <Link
            to="/testimonials"
            className="inline-block bg-black text-white px-6 py-2 hover:bg-[#C8A96A] hover:text-black transition hover:-translate-y-0.5 duration-300"
          >
            Share Your Experience →
          </Link>
        </div>

      </div>
    </section>
  );
}