import { Link } from "react-router-dom";

export default function HomeCTA() {
  const phoneNumber = "+447873600056";

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[var(--background-secondary)] overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />

      <div className="relative z-10 max-w-3xl mx-auto text-center" data-aos="zoom-in">
        <span className="text-xs tracking-[4px] uppercase text-[#C8A45D] font-medium">
          Let's Create Together
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mt-3 leading-tight">
          Ready To Tell Your Story?
        </h2>
        <p className="text-gray-300 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Whether it's a wedding, a live event, or a brand film — let's talk
          about how Panjab Studio can bring your vision to life.
        </p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
          <Link
            to="/contact"
            className="px-6 sm:px-7 py-3 bg-[#C8A45D] text-black font-medium rounded-full hover:bg-white transition-all duration-300 text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(200,164,93,0.6)]"
          >
            Get In Touch →
          </Link>
          <a
            href={`https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-7 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base hover:-translate-y-0.5"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
