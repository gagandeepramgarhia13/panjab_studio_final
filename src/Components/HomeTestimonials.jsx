import { FaQuoteRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionGlow from "./SectionGlow";


export default function HomeTestimonials() {

  return (
    <section className="w-full py-20 bg-[#121213] flex items-center justify-center text-center relative overflow-hidden">

      <SectionGlow variant="dark" />

      {/* 🔹 Content */}
      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white mb-10">
          Know Our Customer Feedback
        </h2>

        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <FaQuoteRight className="text-5xl text-[#C8A96A]/25" />
        </div>

        {/* Testimonial Card */}
        <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10 px-6 py-8 sm:px-10 sm:py-10 transition-transform duration-500 hover:-translate-y-1">
          {/* Testimonial Text */}
          <p className="text-gray-200 leading-relaxed mb-8">
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
          className="inline-block mt-10 border border-[#C8A96A]/50 text-white px-6 py-2 rounded-full hover:bg-[#C8A96A] hover:text-black hover:border-[#C8A96A] transition"
        >
          Testimonials
        </Link>


      </div>
    </section>
  );
}