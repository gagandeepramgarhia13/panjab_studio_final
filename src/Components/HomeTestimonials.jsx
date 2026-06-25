import { FaQuoteRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function HomeTestimonials() {
  
  return (
    <section className="w-full py-20 bg-[#e5e5e5] flex items-center justify-center text-center relative">

      {/* 🔹 Content */}
      <div className="max-w-3xl mx-auto px-6 relative">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold text-black mb-10">
          Know Our Customer Feedback
        </h2>

        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <FaQuoteRight className="text-5xl text-black/20" />
        </div>

        {/* Testimonial Text */}
        <p className="text-black/80 leading-relaxed mb-8">
          “These guys are absolutely fabulous at what they do, they do their jobs with such elegance and passion. Just made our special day that much more fun and memorable.”
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-10 text-black">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        {/* Button */}
        <Link
          to="/testimonials"
          className="border border-black px-6 py-2 hover:bg-black hover:text-white transition"
        >
          Testimonials
        </Link>


      </div>
    </section>
  );
}