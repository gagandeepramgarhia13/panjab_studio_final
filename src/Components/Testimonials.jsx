import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "From the very first call, they made us feel so comfortable. The team felt more like friends than photographers. They caught every little detail—we’re so happy with how everything turned out!",
      author: "Aman & Gurpreet",
    },
    {
      text: "We wanted a modern and clean look for our wedding film, and they delivered exactly that. The video and photos are just perfect. Our families love them too!",
      author: "Sarah & James",
    },
    {
      text: "Even though our wedding was abroad, the team handled everything so smoothly. The pictures and video look like something out of a movie. So glad we chose them! :)",
      author: "Ria & Arjun",
    },
    {
      text: "Our Nikkah was small and simple, but the video made it look so beautiful. They really captured the emotions and atmosphere of the day. We couldn’t stop smiling watching it.",
      author: "Fatima & Yasin",
    },
    {
      text: "We booked them for a product shoot after seeing their wedding videos. The results were sharp, professional, and delivered super fast. Highly recommended!",
      author: "Maya S",
    },
  ];

  return (
    <section className="w-full  min-h-screen flex flex-col items-center" >

      {/* 🔥 Video Section (Heading + Content) */}
      <div className="relative w-full h-[90vh] flex justify-center items-center py-24 px-4 md:px-10 mb-16 overflow-hidden">

        {/* 🎥 Background Video */}
        <img className="absolute inset-0 w-full h-full object-cover" src="https://cdn.wallpapersafari.com/74/86/Hszyvw.jpg" alt="" />

        {/* 🔹 Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* 🔹 Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Testimomials
          </h2>

          {/* Logo */}
          <div className="mb-6">
            <img
              src="/panjab_logo/5.png"
              alt="logo"
              className="h-32 mx-auto object-contain"
            />
          </div>

          <h3 className="text-xl md:text-2xl font-medium text-white">
            Welcome to our Testimonials page
          </h3>
          <p>
            — an honest collection of experiences shared by couples, families, and brands who trusted
            Panjab Studio to tell their stories. Their words reflect the passion, precision, and heart we pour into every frame.
          </p>

        </div>
      </div>

      {/* Center Container */}
      <div className="w-full max-w-3xl flex flex-col gap-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold text-center text-black mb-6">
          What Our Clients Say
        </h2>

        {/* Cards */}
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl p-6 md:p-8 bg-white text-gray-800 shadow-md hover:shadow-xl transition"
          >

            {/* ⭐ Stars */}
            <div className="mb-3 text-sm">⭐⭐⭐⭐⭐</div>

            {/* Text */}
            <p className="text-sm md:text-base leading-relaxed italic">
              “{item.text}”
            </p>

            {/* Author */}
            <div className="mt-4 flex items-center justify-between">
              <h4 className="font-semibold text-sm md:text-base">
                — {item.author}
              </h4>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}