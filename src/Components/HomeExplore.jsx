import { useNavigate } from "react-router-dom";
import { explorePages } from "../utility/data";
import TiltCard from "./TiltCard";

export default function HomeExplore() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-8 sm:mb-14" data-aos="fade-up">
          <span className="text-xs tracking-[4px] uppercase text-[#C8A45D]/70 font-medium">
            More To Discover
          </span>
          <h2 className="text-3d-gold text-2xl sm:text-4xl md:text-5xl font-semibold text-white mt-1 leading-tight">
            Get To Know Panjab Studio
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 tilt-perspective">
          {explorePages.map((page, index) => (
            <TiltCard
              key={page.path}
              max={5}
              onClick={() => navigate(page.path)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group h-56 sm:h-72 overflow-hidden rounded-2xl cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]"
            >
              <img
                src={page.image}
                alt={page.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 2px rgba(200,164,93,0.85)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {page.label}
                </h3>
                <p className="text-white/70 text-[11px] sm:text-xs mt-1 leading-relaxed">
                  {page.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-[#C8A45D] text-[11px] sm:text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More →
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
