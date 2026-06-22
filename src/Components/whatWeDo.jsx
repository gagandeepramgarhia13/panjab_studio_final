import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { whatWeDo } from "../utility/data";
import { Link } from "react-router-dom";

export default function WhatWeDo() {

  useEffect(() => {
    Aos.init({
      offset: 10,
      duration: 600,
      delay: 200,
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden">

      {/* 🔹 Background Overlay */}
      <div className="absolute inset-0 bg-[#e5e5e5] backdrop-blur-sm"></div>

      <div className="relative z-10">

        {/* 🔥 GRID SECTION */}
        <div
          className="hidden sm:grid max-w-6xl mx-auto grid-cols-2 lg:grid-cols-4 gap-6"
          data-aos="fade-up"
        >
          {whatWeDo.map((item, index) => (
            <div
              key={index}
              className="aspect-square flex flex-col items-center justify-center text-center p-6 backdrop-blur-lg rounded-xl"
            >
              <img
                src={item.logo}
                alt={item.title}
                className="w-14 h-14 object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2 text-black">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* 🔥 ABOUT SECTION */}
        <div className="max-w-6xl mx-auto mt-20 mb-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6" data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-semibold text-black">
              About Panjab Studio
            </h2>

            <p className="text-gray-700 leading-relaxed">
              At <span className="font-semibold text-black">Panjab Studio</span>,
              we don’t just capture moments—we tell stories.
            </p>

            <p className="text-gray-700 leading-relaxed">
              From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our goal is to create timeless memories you’ll cherish forever.
            </p>

            {/* ✅ LINK BUTTON */}
            <Link
              to="/contact"
              className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Contact Us →
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative" data-aos="fade-left">
            <img
              src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
              alt="about"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

        </div>

      </div>
    </section>
  );
}