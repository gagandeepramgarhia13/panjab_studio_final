// import React, { useEffect, useState } from "react";
// import { supabase, BUCKETS } from "../supabase";

// export default function Photography() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPhotos() {
//       const { data, error } = await supabase.storage
//         .from(BUCKETS.photos)
//         .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

//       if (!error && data) {
//         const urls = data
//           .filter(f => f.name !== ".emptyFolderPlaceholder")
//           .map((f, i) => {
//             const { data: urlData } = supabase.storage.from(BUCKETS.photos).getPublicUrl(f.name);
//             // Give varied sizes for masonry effect
//             const sizes = ["large", "wide", "tall", null];
//             return { src: urlData.publicUrl, size: sizes[i % 4] };
//           });
//         setImages(urls);
//       }
//       setLoading(false);
//     }
//     fetchPhotos();
//   }, []);

//   return (
//     <section className="w-full min-h-screen">
//       {/* Hero */}
//       <div className="relative w-full h-[90vh] flex justify-center items-center py-24 px-4 md:px-10 mb-16 overflow-hidden">
//         <img className="absolute inset-0 w-full h-full object-cover"
//           src="https://i.pinimg.com/736x/e3/c1/f6/e3c1f6f7cd60abe2245c71e0ba5669de.jpg" alt="" />
//         <div className="absolute inset-0 bg-black/70"></div>
//         <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">
//           <h2 className="text-3xl md:text-5xl font-semibold text-white">Our Photography</h2>
//           <div className="mb-6">
//             <img src="/panjab_logo/5.png" alt="logo" className="h-32 mx-auto object-contain" />
//           </div>
//           <h3 className="text-xl md:text-2xl font-medium text-white">Wedding & Lifestyle Photography</h3>
//           <p>At <span className="font-semibold text-white">Panjab Studio</span>, we believe that photography is not just about clicking pictures—it's about capturing the soul of a moment.</p>
//           <p>We're there for the quiet in-between moments—the nervous smiles, joyful tears, heartfelt hugs, and spontaneous laughter.</p>
//           <p>Whether it's the vibrant colors of a Punjabi wedding, the rituals of a Hindu ceremony, or the elegance of a white wedding—we document it all with creativity and respect.</p>
//         </div>
//       </div>

//       {/* Gallery */}
//       <div className="px-4 md:px-10 pb-16">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-24 gap-4">
//             <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
//             <p className="text-white/40 text-sm">Loading photos…</p>
//           </div>
//         ) : images.length === 0 ? (
//           <div className="text-center py-24 text-white/30">
//             <p className="text-lg">No photos uploaded yet.</p>
//             <p className="text-sm mt-2">Visit <span className="text-[#C8A96A]">/admin</span> to upload photos.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
//             {images.map((img, index) => (
//               <div key={index} className={`relative overflow-hidden rounded-xl group
//                 ${img.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
//                 ${img.size === "wide" ? "md:col-span-2" : ""}
//                 ${img.size === "tall" ? "md:row-span-2" : ""}`}>
//                 <img src={img.src} alt={`gallery-${index}`}
//                   className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
//                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { supabase, BUCKETS } from "../supabase";

// export default function Photography() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPhotos() {
//       const { data, error } = await supabase.storage
//         .from(BUCKETS.photos)
//         .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

//       if (!error && data) {
//         const items = data
//           .filter((f) => f.name !== ".emptyFolderPlaceholder")
//           .map((f) => {
//             const { data: urlData } = supabase.storage.from(BUCKETS.photos).getPublicUrl(f.name);
//             return { src: urlData.publicUrl };
//           });
//         setImages(items);
//       }
//       setLoading(false);
//     }
//     fetchPhotos();
//   }, []);

//   return (
//     <section className="w-full min-h-screen">
//       {/* Hero */}
//       <div className="relative w-full h-[90vh] flex justify-center items-center py-24 px-4 md:px-10 mb-16 overflow-hidden">
//         <img
//           className="absolute inset-0 w-full h-full object-cover"
//           src="https://i.pinimg.com/736x/e3/c1/f6/e3c1f6f7cd60abe2245c71e0ba5669de.jpg"
//           alt=""
//         />
//         <div className="absolute inset-0 bg-black/70"></div>
//         <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">
//           <h2 className="text-3xl md:text-5xl font-semibold text-white">Our Photography</h2>
//           <div className="mb-6">
//             <img src="/panjab_logo/5.png" alt="logo" className="h-32 mx-auto object-contain" />
//           </div>
//           <h3 className="text-xl md:text-2xl font-medium text-white">Wedding & Lifestyle Photography</h3>
//           <p>
//             At <span className="font-semibold text-white">Panjab Studio</span>, we believe that photography is not
//             just about clicking pictures—it's about capturing the soul of a moment.
//           </p>
//           <p>
//             We're there for the quiet in-between moments—the nervous smiles, joyful tears, heartfelt hugs, and
//             spontaneous laughter.
//           </p>
//           <p>
//             Whether it's the vibrant colors of a Punjabi wedding, the rituals of a Hindu ceremony, or the elegance
//             of a white wedding—we document it all with creativity and respect.
//           </p>
//         </div>
//       </div>

//       {/* Gallery — masonry, true aspect ratio, no cropping */}
//       <div className="px-4 md:px-10 pb-16">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-24 gap-4">
//             <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
//             <p className="text-white/40 text-sm">Loading photos…</p>
//           </div>
//         ) : images.length === 0 ? (
//           <div className="text-center py-24 text-white/30">
//             <p className="text-lg">No photos uploaded yet.</p>
//             <p className="text-sm mt-2">
//               Visit <span className="text-[#C8A96A]">/admin</span> to upload photos.
//             </p>
//           </div>
//         ) : (
//           <div className="[column-count:2] md:[column-count:3] lg:[column-count:4] gap-4 [column-gap:1rem]">
//             {images.map((img, index) => (
//               <div
//                 key={img.src}
//                 className="mb-4 overflow-hidden rounded-xl group break-inside-avoid"
//               >
//                 <img
//                   src={img.src}
//                   alt={`gallery-${index}`}
//                   className="w-full h-auto block transition duration-500 group-hover:scale-105"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { supabase, BUCKETS } from "../supabase";

export default function Photography() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase.storage
        .from(BUCKETS.photos)
        .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

      if (!error && data) {
        const items = data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => {
            const { data: urlData } = supabase.storage.from(BUCKETS.photos).getPublicUrl(f.name);
            return { src: urlData.publicUrl };
          });
        setImages(items);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  return (
    <section className="relative w-full min-h-screen z-0">
      {/* Hero */}
      <div className="relative w-full h-[90vh] flex justify-center items-center py-24 px-4 md:px-10 mb-16 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://i.pinimg.com/736x/e3/c1/f6/e3c1f6f7cd60abe2245c71e0ba5669de.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-white">Our Photography</h2>
          <div className="mb-6">
            <img src="/panjab_logo/5.png" alt="logo" className="h-32 mx-auto object-contain" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-white">Wedding & Lifestyle Photography</h3>
          <p>
            At <span className="font-semibold text-white">Panjab Studio</span>, we believe that photography is not
            just about clicking pictures—it's about capturing the soul of a moment.
          </p>
          <p>
            We're there for the quiet in-between moments—the nervous smiles, joyful tears, heartfelt hugs, and
            spontaneous laughter.
          </p>
          <p>
            Whether it's the vibrant colors of a Punjabi wedding, the rituals of a Hindu ceremony, or the elegance
            of a white wedding—we document it all with creativity and respect.
          </p>
        </div>
      </div>

      {/* Gallery — masonry, true aspect ratio, no cropping */}
      <div className="px-4 md:px-10 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Loading photos…</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-lg">No photos uploaded yet.</p>
            <p className="text-sm mt-2">
              Visit <span className="text-[#C8A96A]">/admin</span> to upload photos.
            </p>
          </div>
        ) : (
          <div className="[column-count:2] md:[column-count:3] lg:[column-count:4] gap-4 [column-gap:1rem]">
            {images.map((img, index) => (
              <div
                key={img.src}
                className="relative mb-4 overflow-hidden rounded-xl group break-inside-avoid"
              >
                <img
                  src={img.src}
                  alt={`gallery-${index}`}
                  className="w-full h-auto block transition duration-500 group-hover:scale-105"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

                {/* View button — bottom right */}
                <button
                  onClick={() => setSelected(img.src)}
                  className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-white/90 text-black text-sm font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-white"
                >
                  <Maximize2 size={15} />
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors z-[100000]"
            >
              <X size={24} />
            </button>
            <img
              src={selected}
              alt="Full view"
              className="w-full max-h-[85vh] object-contain rounded-xl mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}