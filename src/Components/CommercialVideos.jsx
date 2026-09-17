import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, YOUTUBE_TABLE } from "../supabase";
import SectionGlow from "./SectionGlow";
import YouTubeVideoCard from "./YouTubeVideoCard";

export default function CommercialVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVideos() {
            const { data, error } = await supabase
                .from(YOUTUBE_TABLE)
                .select("*")
                .eq("category", "commercial-videos")
                .order("created_at", { ascending: false });
            if (!error && data) setVideos(data);
            setLoading(false);
        }
        fetchVideos();
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
                    <button
                        onClick={() => navigate("/photography")}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition mx-auto text-sm"
                    >
                        <ArrowLeft size={16} /> Back to Photography
                    </button>
                    <h2 className="text-3d-gold text-3xl md:text-5xl font-semibold text-white">Commercial Videos</h2>
                    <img src="/panjab_logo/5.png" alt="logo" className="h-24 mx-auto object-contain" />
                    <p>
                        Elevate your brand with visually compelling commercial content —
                        from product showcases to brand stories, crafted to convert.
                    </p>
                </div>
            </div>

            {/* Video Gallery */}
            <div className="relative overflow-hidden px-4 md:px-10 pb-16">
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
