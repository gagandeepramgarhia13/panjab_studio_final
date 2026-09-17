import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, YOUTUBE_TABLE } from "../supabase";
import SectionGlow from "./SectionGlow";
import YouTubeVideoCard from "./YouTubeVideoCard";

export default function LiveEventsVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase
        .from(YOUTUBE_TABLE)
        .select("*")
        .eq("category", "live-events-videos")
        .order("created_at", { ascending: false });
      if (!error && data) setVideos(data);
      setLoading(false);
    }
    fetchVideos();
  }, []);

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
          <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">Live Events</h2>
          <img src="/panjab_logo/5.png" alt="logo" className="h-24 mx-auto object-contain" />
          <p className="italic text-gray-300">The energy of a live event, captured in motion — every performance, every crowd reaction, preserved forever.</p>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 md:px-10 py-16">
        <SectionGlow variant="light" />
        {loading ? (
          <div className="relative z-10 flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/40 text-sm">Loading videos…</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="relative z-10 text-center py-24 text-white/30">
            <p className="text-lg">No videos added yet.</p>
            <p className="text-sm mt-2">Add a YouTube link from the <span className="text-[#C8A45D]">Admin</span> panel.</p>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <YouTubeVideoCard key={vid.id} videoId={vid.video_id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
