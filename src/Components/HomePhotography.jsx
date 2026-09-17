import { useNavigate } from "react-router-dom";
import { photographyCategories } from "../utility/data";
import SectionGlow from "./SectionGlow";
import TiltCard from "./TiltCard";

export default function HomePhotography() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[var(--background)] py-14 sm:py-20 md:py-24 px-4 sm:px-6">
      <SectionGlow variant="dark" />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14"
          data-aos="fade-up"
        >
          <div>
            <span className="text-xs tracking-[4px] uppercase text-[#C8A45D]/70 font-medium">
              Frame By Frame
            </span>
            <h2 className="text-3d-gold text-2xl sm:text-4xl md:text-5xl font-semibold text-white mt-1 leading-tight">
              Photography
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
              From vibrant weddings to polished commercial work, every category
              below is a doorway into a different kind of story.
            </p>
          </div>

          <button
            onClick={() => navigate("/photography")}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8A45D] text-black text-sm font-medium rounded-full hover:bg-white transition-all duration-300 flex-shrink-0 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(200,164,93,0.5)]"
          >
            View All Photography →
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 md:gap-6 tilt-perspective">
          {photographyCategories.map((cat, index) => (
            <TiltCard
              key={cat.path}
              max={5}
              onClick={() => navigate(cat.path)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]"
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Gold border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 2px rgba(200,164,93,0.85)" }}
              />

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-left">
                <span className="text-lg sm:text-2xl">{cat.icon}</span>
                <h3 className="text-white font-semibold text-xs sm:text-base md:text-lg mt-1 leading-tight">
                  {cat.label}
                </h3>
                <p className="text-white/70 text-[11px] mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                  {cat.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-[#C8A45D] text-[11px] sm:text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
