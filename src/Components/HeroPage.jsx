import React from "react";
import { Link } from "react-router-dom";
import { followLinks } from "../utility/data";


const Hero = () => {

  return (
    <div className="relative h-[90vh] w-full overflow-hidden font-sans text-white">

      {/* 🔹 Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero_vdo.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-black/50"></div>


      {/* =========================
          🔥 FOLLOW US (DESKTOP)
      ========================== */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
        
        {/* 🔹 Black Glow Background
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-32 h-64 bg-black/60 blur-3xl rounded-full"></div>
        </div> */}

        <div className="bg-white/20 backdrop-blur-md px-3 py-4 rounded-md flex flex-col items-center gap-5">
          {followLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg hover:text-yellow-400 transition"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>

        <div className="w-[1px] h-16 bg-white/40"></div>

        <span className="text-xs tracking-[3px] rotate-90">
          FOLLOW US
        </span>
      </div>


      {/* =========================
          📱 FOLLOW US (MOBILE)
      ========================== */}
      <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20">

        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6">

          <a href="#" className="text-white text-xl hover:text-yellow-400 transition">
            <i className="ri-instagram-line"></i>
          </a>

          <a href="#" className="text-white text-xl hover:text-yellow-400 transition">
            <i className="ri-linkedin-line"></i>
          </a>

          <a href="#" className="text-white text-xl hover:text-yellow-400 transition">
            <i className="ri-youtube-line"></i>
          </a>

        </div>

      </div>

      {/* 🔹 Center Content */}
      <main className="relative z-10 flex items-center justify-center h-full text-center px-6">

        <div className="max-w-3xl flex flex-col items-center">

          {/* Logo */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute w-28 h-28 bg-gradient-to-r from-yellow-400/40 via-yellow-200/20 to-transparent blur-2xl rounded-full"></div>

            <img
              src="/panjab_logo/5.png"
              alt="Logo"
              className="relative w-24 md:w-32"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-6xl font-serif mb-6 leading-tight">
            <span className="italic font-light">
              Crafting Timeless Visual Stories
            </span>
          </h1>

          {/* Button */}
          <Link
            to="/about"
            className="border border-white px-6 py-2 hover:bg-white hover:text-black transition"
          >
            Read More About Us →
          </Link>

        </div>

      </main>
    </div >
  );
};

export default Hero;