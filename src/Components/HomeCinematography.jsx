import { useNavigate } from "react-router-dom";
import { cinematographyCategories, cinematographyReel } from "../utility/data";
import SectionGlow from "./SectionGlow";

export default function HomeCinematography() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[#181819] py-14 sm:py-20 md:py-24 px-4 sm:px-6">
      <SectionGlow variant="dark" />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14"
          data-aos="fade-up"
        >
          <div>
            <span className="text-xs tracking-[4px] uppercase text-[#C8A96A]/80 font-medium">
              Motion &amp; Emotion
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mt-1 leading-tight">
              Cinematography
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
              Every story deserves to be told like a film — raw, emotional
              and unforgettable. Explore how we bring each one to life.
            </p>
          </div>

          <button
            onClick={() => navigate("/cinematography")}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium rounded-full hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition-all duration-300 flex-shrink-0"
          >
            View All Cinematography →
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {cinematographyCategories.map((cat, index) => (
            <div
              key={cat.path}
              onClick={() => navigate(cat.path)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer border border-white/10 transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_55px_-10px_rgba(200,169,106,0.25)]"
            >
              <video
                src={cinematographyReel}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 2px rgba(200,169,106,0.85)" }}
              />

              {/* Play indicator */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-[10px] sm:text-xs">▶</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-left">
                <span className="text-lg sm:text-2xl">{cat.icon}</span>
                <h3 className="text-white font-semibold text-xs sm:text-base md:text-lg mt-1 leading-tight">
                  {cat.label}
                </h3>
                <p className="text-white/60 text-[11px] mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                  {cat.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-[#C8A96A] text-[11px] sm:text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Watch →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
