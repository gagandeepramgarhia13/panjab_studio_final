import { FaQuoteRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionGlow from "./SectionGlow";


export default function HomeTestimonials() {

  return (
    <section className="w-full py-20 bg-[#e5e5e5] flex items-center justify-center text-center relative overflow-hidden">

      <SectionGlow variant="light" />

      {/* 🔹 Content */}
      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-black mb-10">
          Know Our Customer Feedback
        </h2>

        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <FaQuoteRight className="text-5xl text-black/20" />
        </div>

        {/* Testimonial Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-[0_25px_60px_-20px_rgba(90,75,56,0.25)] ring-1 ring-black/5 px-6 py-8 sm:px-10 sm:py-10 transition-transform duration-500 hover:-translate-y-1">
          {/* Testimonial Text */}
          <p className="text-black/80 leading-relaxed mb-8">
            “These guys are absolutely fabulous at what they do, they do their jobs with such elegance and passion. Just made our special day that much more fun and memorable.”
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 text-[#C8A96A]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>

        {/* Button */}
        <Link
          to="/testimonials"
          className="inline-block mt-10 border border-black px-6 py-2 hover:bg-black hover:text-white transition"
        >
          Testimonials
        </Link>


      </div>
    </section>
  );
}