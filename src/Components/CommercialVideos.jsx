import React, { useEffect, useState } from "react";
import { Maximize2, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase, BUCKETS } from "../supabase";

export default function CommercialVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVideos() {
            const { data, error } = await supabase.storage
                .from(BUCKETS.commercialVideos)
                .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });

            if (!error && data) {
                const items = data
                    .filter((f) => f.name !== ".emptyFolderPlaceholder")
                    .map((f) => {
                        const { data: urlData } = supabase.storage.from(BUCKETS.commercialVideos).getPublicUrl(f.name);
                        return { src: urlData.publicUrl, name: f.name };
                    });
                setVideos(items);
            }
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
                    <h2 className="text-3xl md:text-5xl font-semibold text-white">Commercial Videos</h2>
                    <img src="/panjab_logo/5.png" alt="logo" className="h-24 mx-auto object-contain" />
                    <p>
                        Elevate your brand with visually compelling commercial content —
                        from product showcases to brand stories, crafted to convert.
                    </p>
                </div>
            </div>

            {/* Video Gallery */}
            <div className="px-4 md:px-10 pb-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
                        <p className="text-white/40 text-sm">Loading videos…</p>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-24 text-white/30">
                        <p className="text-lg">No videos uploaded yet.</p>
                        <p className="text-sm mt-2">Upload to the <span className="text-[#C8A96A]">commercial-videos</span> bucket in Admin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((vid, index) => (
                            <div key={vid.src} className="relative overflow-hidden rounded-2xl group cursor-pointer"
                                onClick={() => setSelected(vid.src)}>
                                <video
                                    src={vid.src}
                                    className="w-full h-auto block"
                                    preload="metadata"
                                    muted
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition pointer-events-none"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/80 text-black rounded-full px-4 py-2 text-sm font-semibold">
                                        ▶ click to play
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setSelected(vid.src); }}
                                    className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-white/90 text-black text-sm font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-white">
                                    <Maximize2 size={15} /> View
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Lightbox */}
            {selected && (
                <div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
                    <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelected(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors z-[100000]">
                            <X size={24} />
                        </button>
                        <video src={selected} controls autoPlay className="w-full max-h-[85vh] object-contain rounded-xl mx-auto" />
                    </div>
                </div>
            )}
        </section>
    );
}