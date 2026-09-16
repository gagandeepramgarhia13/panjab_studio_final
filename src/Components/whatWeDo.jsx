import { whatWeDo } from "../utility/data";
import { Link } from "react-router-dom";
import SectionGlow from "./SectionGlow";
import TiltCard from "./TiltCard";

export default function WhatWeDo() {

  return (
    <section className="relative w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0e]"></div>
      <SectionGlow variant="dark" />

      <div className="relative z-10">

        {/* Grid Section — 4 cards directly after the Hero: intentionally
            border-free in every state (normal + hover), and kept simple —
            no visible box/shadow at rest, only a soft glass glow on hover.
            Depth/interest comes entirely from that hover glow, lift and
            TiltCard's 3D tilt — never from an outline. */}
        <div className="hidden sm:grid max-w-6xl mx-auto grid-cols-2 lg:grid-cols-4 gap-6 mt-16 sm:mt-20 tilt-perspective">
          {whatWeDo.map((item, index) => (
            <TiltCard
              key={index}
              max={6}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay={index * 120}
              className="group aspect-square flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-transparent hover:bg-white/[0.05] hover:backdrop-blur-md hover:shadow-[0_25px_55px_-15px_rgba(200,169,106,0.3)] hover:-translate-y-2"
            >
              <img
                src={item.logo}
                alt={item.title}
                className="w-14 h-14 object-contain mb-4 brightness-0 invert transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
              />
              <h3 className="text-lg font-semibold mb-2 text-white">
                {item.title}
              </h3>
            </TiltCard>
          ))}
        </div>

        {/* About Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">
              About Panjab Studio
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At <span className="font-semibold text-[#C8A96A]">Panjab Studio</span>,
              we don't just capture moments—we tell stories.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our goal is to create timeless memories you'll cherish forever.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 px-6 py-3 bg-[#C8A96A] text-black rounded-full hover:bg-white transition hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(200,169,106,0.5)]"
            >
              Contact Us →
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#C8A96A]/40 via-transparent to-transparent blur-2xl opacity-70 -z-10" />
            <img
              src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
              alt="about"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-[#C8A96A]/20 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}