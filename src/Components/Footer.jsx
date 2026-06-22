import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
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
          {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              <Icon size={16} />
            </div>
          ))}
        </div>

        {/* 🔹 Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm tracking-[3px] uppercase mb-10">
          <a href="#" className="hover:underline">
            Frequently Asked Questions
          </a>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* 🔹 Bottom */}
        <p className="text-sm text-black/70">
          Copyright © 2021–2025. All Rights Reserved.
        </p>
      </div>

      {/* 🔹 Scroll To Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition z-[1000000] "
      >
        ↑
      </button>

    </footer>
  );
}