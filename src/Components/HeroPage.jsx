import React, { useState } from "react";
import { followLinks } from "../utility/data";
import Button from "./Button";

const Hero = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const phoneNumber = "+447873600056";

  return (
    <div className="relative h-[90vh] w-full font-sans text-white">

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

      {/* FOLLOW US (DESKTOP) */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
        <div className="bg-white/20 backdrop-blur-md px-2 py-3 rounded-md flex flex-col items-center gap-3">
          {followLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
              className="text-white text-sm hover:text-yellow-400 transition">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <div className="w-[1px] h-10 bg-white/40"></div>
        <span className="text-[10px] leading-[5rem] tracking-[3px] -rotate-90">FOLLOW US</span>
      </div>

      {/* Center Content */}
      <main className="relative z-10 flex items-end pb-6 justify-center h-full text-center px-6">
        <div className="max-w-3xl flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            <span className="italic font-light">Crafting Timeless Visual Stories</span>
          </h1>
          <Button to="/about" variant="outline" size="responsive">
            Read More About Us →
          </Button>
        </div>
      </main>

      {/* 📞 FLOATING CONTACT BUTTON */}
      {/* ✅ FIX 2: z-30 → z-[999999] */}
      <div className="fixed bottom-6 right-6 z-[999999] flex flex-col items-end gap-3">

        {contactOpen && (
          <div className="flex flex-col gap-3 mb-1">
            <Button
              href={`https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              variant="primary"
              size="md"
              className="bg-[#25D366] hover:bg-[#1ebe5d] rounded-full"
            >
              <i className="ri-whatsapp-line text-xl"></i>
              WhatsApp
            </Button>

            <Button
              href={`tel:${phoneNumber}`}
              variant="primary"
              size="md"
            >
              <i className="ri-phone-line text-xl"></i>
              Call Us
            </Button>
          </div>
        )}

        <button
          onClick={() => setContactOpen((o) => !o)}
          className="relative w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        >
          {!contactOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#C8A96A]/60 animate-ping"></span>
              <span className="absolute inset-0 rounded-full bg-[#C8A96A]/40 animate-ping [animation-delay:0.5s]"></span>
            </>
          )}
          <i className={`relative z-10 text-2xl ${contactOpen ? "ri-close-line" : "ri-phone-line animate-[wiggle_2s_ease-in-out_infinite]"}`}></i>
        </button>
      </div>

    </div>
  );
};

export default Hero;