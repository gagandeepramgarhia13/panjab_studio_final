import React, { useEffect, useState } from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { supabase } from "../supabase";
import SectionGlow from "./SectionGlow";
import TestimonialCard from "./TestimonialCard";

// Submission form — every testimonial lands here as "pending" and only
// appears on the site once an admin approves it from /admin.
function TestimonialForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // status/published are sent explicitly as "pending"/false so the insert
    // matches the database's row-level-security check exactly — a visitor
    // can never approve or publish their own review this way.
    const { error } = await supabase.from("testimonials").insert([
      {
        name: form.name,
        email: form.email || null,
        rating,
        message: form.message,
        status: "pending",
        published: false,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setRating(5);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-md ring-1 ring-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] p-6 md:p-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">Share Your Experience</h3>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Worked with Panjab Studio? We'd love to hear about it. Your
          testimonial will appear here once our team reviews and approves it.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-white">Thank you! 🙌</p>
          <p className="text-gray-400 text-sm mt-2">
            Your testimonial has been submitted and is awaiting approval —
            it'll show up on this page soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm text-[#C8A45D] hover:underline"
          >
            Submit another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A45D] transition-colors"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email (optional)"
              className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A45D] transition-colors"
            />
          </div>

          {/* Rating picker */}
          <div className="flex items-center justify-center gap-1 py-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform duration-150 hover:scale-125"
              >
                <Star
                  size={26}
                  className={(hoverRating || rating) >= n ? "fill-[#C8A45D] text-[#C8A45D]" : "text-gray-600"}
                />
              </button>
            ))}
          </div>

          <textarea
            rows="4"
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your experience…"
            className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A45D] transition-colors"
          ></textarea>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-[#C8A45D] text-black rounded-xl font-semibold text-sm hover:bg-white transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5"
          >
            {status === "sending" ? "Submitting…" : "Submit Testimonial →"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-xs text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function Testimonials() {
  // Every card on this page is a real review submitted through the form
  // below, then approved AND published by an admin — nothing here is
  // invented or hard-coded.
  const [approved, setApproved] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(true);

  useEffect(() => {
    async function fetchApproved() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!error && data) setApproved(data);
      setLoadingApproved(false);
    }
    fetchApproved();
  }, []);

  const averageRating = approved.length
    ? (approved.reduce((sum, t) => sum + (t.rating || 0), 0) / approved.length)
    : 0;

  return (
    <section className="w-full  min-h-screen flex flex-col items-center" >

      {/* 🔥 Video Section (Heading + Content) */}
      <div className="relative w-full h-[90vh] flex justify-center items-center py-24 px-4 md:px-10 mb-16 overflow-hidden">

        {/* 🎥 Background Video */}
        <img className="absolute inset-0 w-full h-full object-cover" src="https://cdn.wallpapersafari.com/74/86/Hszyvw.jpg" alt="" />

        {/* 🔹 Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* 🔹 Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">

          {/* Heading */}
          <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">
            Testimomials
          </h2>

          {/* Logo */}
          <div className="mb-6">
            <img
              src="/panjab_logo/5.png"
              alt="logo"
              className="h-32 mx-auto object-contain"
            />
          </div>

          <h3 className="text-xl md:text-2xl font-medium text-white">
            Welcome to our Testimonials page
          </h3>
          <p>
            — an honest collection of experiences shared by couples, families, and brands who trusted
            Panjab Studio to tell their stories. Their words reflect the passion, precision, and heart we pour into every frame.
          </p>

        </div>
      </div>

      {/* Center Container */}
      <div className="relative w-full overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 pb-10 px-4 md:px-0">

          {/* Heading */}
          <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-center text-white mb-2">
            What Our Clients Say
          </h2>

          {/* Rating summary */}
          {!loadingApproved && approved.length > 0 && (
            <div className="flex flex-col items-center gap-2 text-center mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} className={i < Math.round(averageRating) ? "fill-[#C8A45D] text-[#C8A45D]" : "text-white/20"} />
                ))}
              </div>
              <p className="text-2xl font-bold text-white">
                {averageRating.toFixed(1)} <span className="text-base font-medium text-gray-400">out of 5</span>
              </p>
              <p className="text-sm text-gray-500">
                Based on {approved.length} published customer {approved.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          )}

          {/* Real, admin-approved & published reviews */}
          {loadingApproved ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : approved.length === 0 ? (
            <div className="max-w-xl mx-auto text-center bg-white/[0.04] backdrop-blur-md rounded-3xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 px-6 py-12 sm:px-10">
              <MessageSquareQuote className="w-10 h-10 text-[#C8A45D]/40 mx-auto mb-4" />
              <p className="text-gray-300 font-medium">No published reviews yet</p>
              <p className="text-gray-500 text-sm mt-2">
                We'd rather show nothing than something we made up. If we've worked with you,
                use the form below — yours could be the first review on this page.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approved.map((item, index) => (
                <div key={item.id} data-aos="fade-up" data-aos-delay={Math.min(index, 6) * 60} className="h-full">
                  <TestimonialCard testimonial={item} />
                </div>
              ))}
            </div>
          )}

          {/* Submission form */}
          <div className="mt-6 max-w-3xl mx-auto w-full">
            <TestimonialForm />
          </div>

        </div>
      </div>
    </section>
  );
}
