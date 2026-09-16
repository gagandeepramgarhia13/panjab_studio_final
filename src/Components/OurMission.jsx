import React from "react";
import { useNavigate } from "react-router-dom";
import SectionGlow from "./SectionGlow";

export default function OurMission() {
  const navigate = useNavigate();

  const pillars = [
    {
      title: "Emotion First",
      desc: "We don't just point a camera — we wait for the real moment: a nervous glance, a joyful tear, a laugh that can't be staged. That's what we chase.",
    },
    {
      title: "Cinematic Craft",
      desc: "Every frame is composed with intention — lighting, movement, and color graded to feel like a film still, not a snapshot.",
    },
    {
      title: "Timeless Storytelling",
      desc: "Trends fade, but a well-told story doesn't. We shoot and edit so your memories feel just as alive ten years from now as they do today.",
    },
    {
      title: "Built on Trust",
      desc: "From your first message to final delivery, we treat your day with the same care we'd want for our own — clear communication, no surprises.",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/vwebp/1200x/14/d6/39/14d639f490597e4f176d6762f3ab9864.webp')] bg-cover bg-center bg-fixed">

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* 🔹 Content Wrapper */}
      <div className="relative w-full flex flex-col items-center px-4 md:px-10 pt-[100px] sm:pt-[130px] md:pt-[150px] pb-20 text-white overflow-hidden">
        <SectionGlow variant="dark" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-3xl mb-12 md:mb-16">
          <h1 className="text-3d-gold text-3xl md:text-5xl font-semibold">
            Our Mission
          </h1>
          <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
            Our mission is to turn your moments into timeless stories. We create visuals
            that are both emotional and cinematic — every frame crafted to feel alive,
            even years later.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="relative z-10 max-w-6xl w-full grid sm:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 shadow-xl hover:border-[#C8A45D]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(200,164,93,0.25)]"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="relative z-10 max-w-3xl w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl transition-transform duration-500 hover:-translate-y-1">
          <p className="text-lg md:text-2xl font-light italic text-gray-100 leading-relaxed">
            "We don't just document your day — we preserve the feeling of it."
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-8 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Start Your Story →
          </button>
        </div>

      </div>
    </section>
  );
}