// import React from "react";

// export default function Contact() {
//   return (
//     <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/1200x/99/88/cc/9988cc10978a5801d0b91242bd9b2a9a.jpg')] bg-cover bg-center bg-fixed">

//       <div className="absolute inset-0 bg-black/70"></div>

//       <div className="relative z-10 w-full px-3 sm:px-6 md:px-10 pt-[90px] sm:pt-[120px] md:pt-[140px] pb-16 sm:pb-20 flex flex-col items-center text-white">

//         {/* 🔥 HEADER */}
//         <div className="text-center mb-8 sm:mb-12 md:mb-16">
//           <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-semibold">
//             Contact Us
//           </h2>

//           <p className="mt-2 sm:mt-3 md:mt-4 text-gray-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
//             Have a question, idea, or want to book us for your special day?
//             We’d love to hear from you.
//           </p>
//         </div>

//         {/* 🔥 MAIN GRID */}
//         <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-10">

//           {/* LEFT */}
//           <div className="space-y-4 sm:space-y-5 md:space-y-6 
//             bg-white/10 backdrop-blur-xl border border-white/20 
//             rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10">

//             <h3 className="text-lg sm:text-xl md:text-3xl font-semibold">
//               Let’s Talk
//             </h3>

//             <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
//               Whether it's a wedding, pre-wedding shoot, or creative project,
//               we’re here to bring your vision to life.
//             </p>

//             <div className="space-y-2 sm:space-y-3 text-gray-200 text-xs sm:text-sm md:text-base">
//               <p>📍 Bangalore, India</p>
//               <p>📞 +91 98765 43210</p>
//               <p>📧 panjabstudio@gmail.com</p>
//             </div>

//             {/* Socials */}
//             <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4">
//               {["Instagram", "YouTube", "WhatsApp"].map((item, i) => (
//                 <div
//                   key={i}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base 
//                   bg-white/20 rounded-full 
//                   hover:bg-white hover:text-black cursor-pointer transition"
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* RIGHT FORM */}
//           <div className="bg-white/10 backdrop-blur-xl border border-white/20 
//             rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10">

//             <form className="space-y-3 sm:space-y-4 md:space-y-5">

//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
//                 bg-white/20 border border-white/30 
//                 text-white placeholder-gray-300 
//                 focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
//               />

//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
//                 bg-white/20 border border-white/30 
//                 text-white placeholder-gray-300 
//                 focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
//               />

//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
//                 bg-white/20 border border-white/30 
//                 text-white placeholder-gray-300 
//                 focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
//               />

//               <textarea
//                 rows="3"
//                 placeholder="Your Message"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
//                 bg-white/20 border border-white/30 
//                 text-white placeholder-gray-300 
//                 focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
//               ></textarea>

//               <button
//                 type="submit"
//                 className="w-full py-2.5 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl 
//                 font-semibold hover:bg-gray-200 transition text-xs sm:text-sm md:text-base"
//               >
//                 Send Message →
//               </button>

//             </form>

//           </div>

//         </div>

//         {/* MAP */}
//         <div className="max-w-7xl w-full mt-8 sm:mt-10 md:mt-16 
//           bg-white/10 backdrop-blur-xl border border-white/20 
//           rounded-xl sm:rounded-2xl md:rounded-3xl 
//           p-4 sm:p-6 md:p-10 text-center">

//           <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
//             Visit Us
//           </h3>

//           <p className="text-gray-300 mb-3 text-xs sm:text-sm md:text-base">
//             Based in Bangalore, available worldwide for destination shoots.
//           </p>

//           <div className="w-full h-[180px] sm:h-[220px] md:h-[300px] 
//             bg-black/40 rounded-lg sm:rounded-xl 
//             flex items-center justify-center text-gray-400 text-xs sm:text-sm md:text-base">
//             Google Map (Embed here)
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { supabase } from "../supabase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase.from("contact_submissions").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });

    // Trigger email notification (Edge Function) — fails silently if not set up yet
    try {
      await fetch(
        "https://pafgsyhrjntottedfqcu.supabase.co/functions/v1/notify-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
    } catch (err) {
      console.log("Email notify skipped:", err);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/1200x/99/88/cc/9988cc10978a5801d0b91242bd9b2a9a.jpg')] bg-cover bg-center bg-fixed">

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full px-3 sm:px-6 md:px-10 pt-[90px] sm:pt-[120px] md:pt-[140px] pb-16 sm:pb-20 flex flex-col items-center text-white">

        {/* 🔥 HEADER */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-semibold">
            Contact Us
          </h2>

          <p className="mt-2 sm:mt-3 md:mt-4 text-gray-300 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Have a question, idea, or want to book us for your special day?
            We’d love to hear from you.
          </p>
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-10">

          {/* LEFT */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10">

            <h3 className="text-lg sm:text-xl md:text-3xl font-semibold">
              Let’s Talk
            </h3>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Whether it's a wedding, pre-wedding shoot, or creative project,
              we’re here to bring your vision to life.
            </p>

            <div className="space-y-2 sm:space-y-3 text-gray-200 text-xs sm:text-sm md:text-base">
              <p>📍 Bangalore, India</p>
              <p>📞 +91 98765 43210</p>
              <p>📧 panjabstudio@gmail.com</p>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4">
              {["Instagram", "YouTube", "WhatsApp"].map((item, i) => (
                <div
                  key={i}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base 
                  bg-white/20 rounded-full 
                  hover:bg-white hover:text-black cursor-pointer transition"
                >
                  {item}
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10">

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">

              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
                bg-white/20 border border-white/30 
                text-white placeholder-gray-300 
                focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
              />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
                bg-white/20 border border-white/30 
                text-white placeholder-gray-300 
                focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
                bg-white/20 border border-white/30 
                text-white placeholder-gray-300 
                focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
              />

              <textarea
                rows="3"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
                bg-white/20 border border-white/30 
                text-white placeholder-gray-300 
                focus:outline-none focus:border-white text-xs sm:text-sm md:text-base"
              ></textarea>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-2.5 sm:py-3 bg-white text-black rounded-lg sm:rounded-xl 
                font-semibold hover:bg-gray-200 transition text-xs sm:text-sm md:text-base
                disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>

              {status === "success" && (
                <p className="text-green-400 text-xs sm:text-sm text-center">
                  ✅ Message sent! We'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-xs sm:text-sm text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}

            </form>

          </div>

        </div>

        {/* MAP */}
        <div className="max-w-7xl w-full mt-8 sm:mt-10 md:mt-16 
          bg-white/10 backdrop-blur-xl border border-white/20 
          rounded-xl sm:rounded-2xl md:rounded-3xl 
          p-4 sm:p-6 md:p-10 text-center">

          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
            Visit Us
          </h3>

          <p className="text-gray-300 mb-3 text-xs sm:text-sm md:text-base">
            Based in Bangalore, available worldwide for destination shoots.
          </p>

          <div className="w-full h-[180px] sm:h-[220px] md:h-[300px] 
            bg-black/40 rounded-lg sm:rounded-xl 
            flex items-center justify-center text-gray-400 text-xs sm:text-sm md:text-base">
            Google Map (Embed here)
          </div>

        </div>

      </div>
    </section>
  );
}