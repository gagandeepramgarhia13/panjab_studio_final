import { whatWeDo } from "../utility/data";
import { Link } from "react-router-dom";
import SectionGlow from "./SectionGlow";

export default function WhatWeDo() {

  return (
    <section className="relative w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[#e5e5e5]"></div>
      <SectionGlow variant="light" />

      <div className="relative z-10">

        {/* Grid Section */}
        <div className="hidden sm:grid max-w-6xl mx-auto grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDo.map((item, index) => (
            <div
              key={index}
              className="group aspect-square flex flex-col items-center justify-center text-center p-6 rounded-xl bg-white/0 hover:bg-white/70 hover:shadow-[0_20px_45px_-15px_rgba(90,75,56,0.35)] hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={item.logo}
                alt={item.title}
                className="w-14 h-14 object-contain mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
              />
              <h3 className="text-lg font-semibold mb-2 text-black">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-black">
              About Panjab Studio
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At <span className="font-semibold text-black">Panjab Studio</span>,
              we don't just capture moments—we tell stories.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our goal is to create timeless memories you'll cherish forever.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
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