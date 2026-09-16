import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, BUCKETS } from "../supabase";
import SectionGlow from "./SectionGlow";

export default function MusicVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase.storage
        .from(BUCKETS.musicVideos)
        .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
      if (!error && data) {
        const urls = data
          .filter(f => f.name !== ".emptyFolderPlaceholder")
          .map(f => {
            const { data: urlData } = supabase.storage.from(BUCKETS.musicVideos).getPublicUrl(f.name);
            return { src: urlData.publicUrl, name: f.name };
          });
        setVideos(urls);
      }
      setLoading(false);
    }
    fetchVideos();
  }, []);

  const handleVideoClick = (index) => {
    const currentVideo = videoRefs.current[index];
    if (activeIndex === index) {
      currentVideo.pause(); currentVideo.currentTime = 0; setActiveIndex(null);
    } else {
      videoRefs.current.forEach((vid) => { if (vid) { vid.pause(); vid.currentTime = 0; } });
      currentVideo.play(); setActiveIndex(index);
    }
  };

  return (
    <section className="w-full min-h-screen">
      <div className="relative w-full h-[90vh] flex justify-center items-center px-4 md:px-10 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/cinematography.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-200 space-y-6">
          <button onClick={() => navigate("/cinematography")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition mx-auto text-sm">
            <ArrowLeft size={16} /> Back to Cinematography
          </button>
          <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">Music Videos</h2>
          <img src="/panjab_logo/5.png" alt="logo" className="h-24 mx-auto object-contain" />
          <p className="italic text-gray-300">Visuals that move with the music — cinematic, bold, and built to make an impact.</p>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 md:px-10 py-16">
        <SectionGlow variant="light" />
        {loading ? (
          <div className="relative z-10 flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#6B2638] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Loading videos…</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="relative z-10 text-center py-24 text-white/30">
            <p className="text-lg">No videos uploaded yet.</p>
            <p className="text-sm mt-2">Upload to the <span className="text-[#6B2638]">music-videos</span> bucket in Admin.</p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid, index) => (
              <div key={index} onClick={() => handleVideoClick(index)}
                className="relative overflow-hidden rounded-2xl group cursor-pointer transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)]">
                <video ref={(el) => (videoRefs.current[index] = el)} src={vid.src}
                  className="w-full h-[300px] object-cover transition duration-500"
                  muted={activeIndex !== index} loop preload="metadata" controls={activeIndex === index} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 2px rgba(107,38,56,0.7)" }} />
                {activeIndex !== index && (
                  <>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 text-black rounded-full px-4 py-2 text-sm font-semibold">▶ click to play</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}