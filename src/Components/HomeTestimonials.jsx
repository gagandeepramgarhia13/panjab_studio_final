import React, { useEffect, useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import TestimonialsCarousel from "./TestimonialsCarousel";

// Home page testimonials — nothing here is hard-coded. Every card is a real
// review submitted through /testimonials and then approved AND published by
// an admin from /admin. With none published yet, this section says so
// plainly rather than showing an invented quote.
export default function HomeTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (!error && data) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="w-full py-20 flex items-center justify-center text-center relative overflow-hidden">
      <div className="max-w-5xl w-full mx-auto px-6 relative z-10">
        <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white mb-10">
          Know Our Customer Feedback
        </h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="max-w-xl mx-auto bg-white/[0.04] backdrop-blur-md rounded-3xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 px-6 py-10 sm:px-10">
            <MessageSquareQuote className="w-10 h-10 text-[#C8A45D]/40 mx-auto mb-4" />
            <p className="text-gray-300 font-medium">No published reviews yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Worked with us? We'd love to hear how it went — yours could be the first.
            </p>
          </div>
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}

        <Link
          to="/testimonials"
          className="inline-block mt-10 border border-[#C8A45D]/50 text-white px-6 py-2 rounded-full hover:bg-[#C8A45D] hover:text-black hover:border-[#C8A45D] transition"
        >
          {testimonials.length === 0 ? "Leave a Review" : "See All Testimonials"}
        </Link>
      </div>
    </section>
  );
}
