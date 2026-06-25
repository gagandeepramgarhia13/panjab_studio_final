import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { followLinks } from "../utility/data";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="w-full bg-[#e5e5e5] text-black py-16 px-4 relative">

      <div className="max-w-6xl mx-auto text-center">

        {/* 🔹 Logo */}
        <div className="mb-6">
          <img
            src="/panjab_logo/1.png"
            alt="logo"
            className="h-24 mx-auto object-contain"
          />
        </div>

        {/* 🔹 Social Icons */}
        <div className="flex justify-center gap-4 mb-10">
          {followLinks.map(({ id, icon, url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              <i className={`${icon} text-base`}></i>
            </a>
          ))}
        </div>

        {/* 🔹 Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm tracking-[3px] uppercase mb-10">
          <Link to="/faq" className="hover:underline">
            Frequently Asked Questions
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* 🔹 Bottom */}
        <p className="text-sm text-black/70">
          © {new Date().getFullYear()} Panjab Studio. All Rights Reserved.
        </p>
        <p className="text-xs text-black/50 mt-1">
          Designed & Developed by <b>Gagandeep Ramgarhia</b>
        </p>
      </div>

      {/* 🔹 Scroll To Top Button — only shows after scrolling down */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 transition-all duration-300 z-[1000000]
          ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        ↑
      </button>

    </footer>
  );
}