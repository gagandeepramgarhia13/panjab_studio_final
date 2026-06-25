// import React from "react";

// export default function About() {
//   return (
//     <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/1200x/96/7d/db/967ddb68db475eec28ccb46fb152c3f6.jpg')] bg-cover bg-center bg-fixed">

//       {/* 🔹 Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* 🔹 Content Wrapper */}
//       <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-10 py-20 text-white">

//         {/* 🔥 ABOUT */}
//         <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center mt-16 
//           bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

//           {/* LEFT CONTENT */}
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-5xl font-semibold">
//               About Panjab Studio
//             </h2>

//             <p className="text-gray-200 leading-relaxed">
//               At <span className="font-semibold text-white">Panjab Studio</span>,
//               we don’t just capture moments—we tell stories.
//             </p>

//             <p className="text-gray-200 leading-relaxed">
//               From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.
//             </p>

//             <p className="text-gray-200 leading-relaxed">
//               Our goal is to create timeless memories you’ll cherish forever.
//             </p>

//             <button className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
//               Contact Us →
//             </button>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative">
//             <img
//               src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
//               alt="about"
//               className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
//             />
//           </div>
//         </div>

//         {/* 🔥 MISSION */}
//         <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 mt-16 items-center 
//           bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

//           {/* LEFT IMAGE */}
//           <div>
//             <img
//               src="https://i.pinimg.com/1200x/a7/36/9a/a7369a5b3302a3bc249f9ff75bc14f2d.jpg"
//               alt="mission"
//               className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
//             />
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-5xl font-semibold">
//               Our Mission
//             </h2>

//             <p className="text-gray-200">
//               Our mission is to turn your moments into timeless stories.
//             </p>

//             <p className="text-gray-200">
//               We create visuals that are both emotional and cinematic.
//             </p>

//             <p className="text-gray-200">
//               Every frame is crafted to feel alive—even years later.
//             </p>

//             <button className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
//               Learn More →
//             </button>
//           </div>
//         </div>

//         {/* 🔥 LET'S CONNECT */}
//         <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 mt-16 items-center 
//           bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

//           {/* LEFT CONTENT */}
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-5xl font-semibold">
//               Let’s Connect
//             </h2>

//             <p className="text-gray-200">
//               Every story is unique—and we’re here to capture yours.
//             </p>

//             <p className="text-gray-200">
//               Whether it's a wedding or creative shoot, we bring your vision to life.
//             </p>

//             <p className="text-gray-200">
//               Reach out—we’d love to connect.
//             </p>

//             <button className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
//               Contact Us →
//             </button>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div>
//             <img
//               src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
//               alt="connect"
//               className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
//             />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen bg-[url('https://i.pinimg.com/1200x/96/7d/db/967ddb68db475eec28ccb46fb152c3f6.jpg')] bg-cover bg-center bg-fixed">

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔹 Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-10 py-20 text-white">

        {/* 🔥 ABOUT */}
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center mt-16 
          bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold">
              About Panjab Studio
            </h2>

            <p className="text-gray-200 leading-relaxed">
              At <span className="font-semibold text-white">Panjab Studio</span>,
              we don’t just capture moments—we tell stories.
            </p>

            <p className="text-gray-200 leading-relaxed">
              From vibrant weddings to destination shoots, we blend cinematic visuals with real emotions.
            </p>

            <p className="text-gray-200 leading-relaxed">
              Our goal is to create timeless memories you’ll cherish forever.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Contact Us →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
              alt="about"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
            />
          </div>
        </div>

        {/* 🔥 MISSION */}
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 mt-16 items-center 
          bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

          {/* LEFT IMAGE */}
          <div>
            <img
              src="https://i.pinimg.com/vwebp/1200x/14/d6/39/14d639f490597e4f176d6762f3ab9864.webp"
              alt="mission"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Our Mission
            </h2>

            <p className="text-gray-200">
              Our mission is to turn your moments into timeless stories.
            </p>

            <p className="text-gray-200">
              We create visuals that are both emotional and cinematic.
            </p>

            <p className="text-gray-200">
              Every frame is crafted to feel alive—even years later.
            </p>

            <button
              onClick={() => navigate("/our-mission")}
              className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Learn More →
            </button>
          </div>
        </div>

        {/* 🔥 LET'S CONNECT */}
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 mt-16 items-center 
          bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-10 shadow-xl">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Let’s Connect
            </h2>

            <p className="text-gray-200">
              Every story is unique—and we’re here to capture yours.
            </p>

            <p className="text-gray-200">
              Whether it's a wedding or creative shoot, we bring your vision to life.
            </p>

            <p className="text-gray-200">
              Reach out—we’d love to connect.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Contact Us →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="https://i.pinimg.com/1200x/79/52/58/795258031ab9e309c0f449a0bb5e154d.jpg"
              alt="connect"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}