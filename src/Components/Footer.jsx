import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
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
    // Extra bottom padding (well beyond the fixed call button's own footprint)
    // so the credit line + LinkedIn button never sit under/behind it.
    <footer className="w-full bg-[#0a0a0b] text-gray-300 pt-16 pb-28 sm:pb-16 px-4 relative border-t border-white/5">

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
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-300 cursor-pointer"
            >
              <i className={`${icon} text-base`}></i>
            </a>
          ))}
        </div>

        {/* 🔹 Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm tracking-[3px] uppercase mb-10">
          <Link to="/faq" className="text-gray-300 hover:text-[#C8A96A] transition-colors">
            Frequently Asked Questions
          </Link>
          <Link to="/terms" className="text-gray-300 hover:text-[#C8A96A] transition-colors">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="text-gray-300 hover:text-[#C8A96A] transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* 🔹 Bottom */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Panjab Studio. All Rights Reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-2 flex-wrap">
          Designed & Developed by <b className="text-gray-400">Gagandeep Ramgarhia</b>
          <a
            href="https://www.linkedin.com/in/gagandeep-ramgarhia-41a406326"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gagandeep Ramgarhia on LinkedIn"
            className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/20 text-gray-400 hover:text-black hover:bg-[#C8A96A] hover:border-[#C8A96A] transition-all duration-300"
          >
            <FaLinkedin size={12} />
          </a>
        </p>
      </div>

      {/* 🔹 Scroll To Top Button — only shows after scrolling down. Sits at
          bottom-left (opposite the site's fixed bottom-right call button)
          and the footer's own extra bottom padding above keeps this row of
          text clear of both fixed buttons on short/mobile screens. */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#C8A96A] text-black w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white transition-all duration-300 z-[1000000] shadow-[0_10px_25px_-8px_rgba(200,169,106,0.6)]
          ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        ↑
      </button>

    </footer>
  );
}