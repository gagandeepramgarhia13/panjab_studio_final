import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "../supabase";
import SectionGlow from "./SectionGlow";

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

    const { error } = await supabase.from("testimonials").insert([
      {
        name: form.name,
        email: form.email || null,
        rating,
        message: form.message,
        status: "pending",
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
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_-20px_rgba(90,75,56,0.3)] p-6 md:p-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-black">Share Your Experience</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Worked with Panjab Studio? We'd love to hear about it. Your
          testimonial will appear here once our team reviews and approves it.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-black">Thank you! 🙌</p>
          <p className="text-gray-500 text-sm mt-2">
            Your testimonial has been submitted and is awaiting approval —
            it'll show up on this page soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm text-[#C8A96A] hover:underline"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#C8A96A] transition-colors"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email (optional)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#C8A96A] transition-colors"
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
                  className={(hoverRating || rating) >= n ? "fill-[#C8A96A] text-[#C8A96A]" : "text-gray-300"}
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#C8A96A] transition-colors"
          ></textarea>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-[#C8A96A] hover:text-black transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5"
          >
            {status === "sending" ? "Submitting…" : "Submit Testimonial →"}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-xs text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      text: "From the very first call, they made us feel so comfortable. The team felt more like friends than photographers. They caught every little detail—we’re so happy with how everything turned out!",
      author: "Aman & Gurpreet",
    },
    {
      text: "We wanted a modern and clean look for our wedding film, and they delivered exactly that. The video and photos are just perfect. Our families love them too!",
      author: "Sarah & James",
    },
    {
      text: "Even though our wedding was abroad, the team handled everything so smoothly. The pictures and video look like something out of a movie. So glad we chose them! :)",
      author: "Ria & Arjun",
    },
    {
      text: "Our Nikkah was small and simple, but the video made it look so beautiful. They really captured the emotions and atmosphere of the day. We couldn’t stop smiling watching it.",
      author: "Fatima & Yasin",
    },
    {
      text: "We booked them for a product shoot after seeing their wedding videos. The results were sharp, professional, and delivered super fast. Highly recommended!",
      author: "Maya S",
    },
  ];

  const [approved, setApproved] = useState([]);
  const [loadingApproved, setLoadingApproved] = useState(true);

  useEffect(() => {
    async function fetchApproved() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (!error && data) setApproved(data);
      setLoadingApproved(false);
    }
    fetchApproved();
  }, []);

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
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
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
        <SectionGlow variant="light" />
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-6 pb-10">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-semibold text-center text-black mb-6">
            What Our Clients Say
          </h2>

          {/* Cards */}
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 md:p-8 bg-white text-gray-800 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >

              {/* ⭐ Stars */}
              <div className="mb-3 text-sm">⭐⭐⭐⭐⭐</div>

              {/* Text */}
              <p className="text-sm md:text-base leading-relaxed italic">
                “{item.text}”
              </p>

              {/* Author */}
              <div className="mt-4 flex items-center justify-between">
                <h4 className="font-semibold text-sm md:text-base">
                  — {item.author}
                </h4>

              </div>

            </div>
          ))}

          {/* Approved, community-submitted testimonials */}
          {!loadingApproved && approved.length > 0 && (
            <>
              <h3 className="text-xl md:text-2xl font-semibold text-center text-black mt-6 mb-2">
                More From Our Clients
              </h3>
              {approved.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl p-6 md:p-8 bg-white text-gray-800 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className={i < item.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed italic">
                    “{item.message}”
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <h4 className="font-semibold text-sm md:text-base">
                      — {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Submission form */}
          <div className="mt-6">
            <TestimonialForm />
          </div>

        </div>
      </div>
    </section>
  );
}
