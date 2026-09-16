import React, { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { supabase, BUCKETS } from "../supabase";
import Button from "./Button";
import { photographyCategories as categories } from "../utility/data";
import SectionGlow from "./SectionGlow";

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
        {/* Soft fade into the page background so the hero blends seamlessly
            into the section below instead of cutting off with a hard line. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">
          <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">Our Photography</h2>
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

      {/* Category Buttons */}
      <div className="relative z-10 px-4 md:px-10 mb-12">
        <h3 className="text-[#C8A45D]/80 text-xs uppercase tracking-widest text-center mb-6">
          Browse by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.path}
              to={cat.path}
              variant="ghost"
              size="responsive"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="relative overflow-hidden px-4 md:px-10 pb-16">
        <SectionGlow variant="dark" />
        {loading ? (
          <div className="relative z-10 flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Loading photos…</p>
          </div>
        ) : images.length === 0 ? (
          <div className="relative z-10 text-center py-24 text-white/30">
            <p className="text-lg">No photos uploaded yet.</p>
            <p className="text-sm mt-2">
              Visit <span className="text-[#C8A45D]">/admin</span> to upload photos.
            </p>
          </div>
        ) : (
          <div className="relative z-10 [column-count:2] md:[column-count:3] lg:[column-count:4] gap-4 [column-gap:1rem]">
            {images.map((img, index) => (
              <div
                key={img.src}
                className="relative mb-4 overflow-hidden rounded-xl group break-inside-avoid transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={img.src}
                  alt={`gallery-${index}`}
                  className="w-full h-auto block transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(200,164,93,0.7)" }} />
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