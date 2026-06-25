// src/components/Gallery.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, BUCKETS } from "../supabase";

const buttons = [
    { name: "Photography", path: "/photography" },
    { name: "Cinematography", path: "/cinematography" }
];

export default function HomeGallery() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLatestPhotos() {
            const { data, error } = await supabase.storage
                .from(BUCKETS.photos)
                .list("", { limit: 3, sortBy: { column: "created_at", order: "desc" } });

            if (!error && data) {
                const urls = data
                    .filter((f) => f.name !== ".emptyFolderPlaceholder")
                    .slice(0, 3)
                    .map((f) => {
                        const { data: urlData } = supabase.storage.from(BUCKETS.photos).getPublicUrl(f.name);
                        return urlData.publicUrl;
                    });
                setImages(urls);
            }
            setLoading(false);
        }
        fetchLatestPhotos();
    }, []);

    return (
        <section className="w-full bg-[#181819] bg-no-repeat bg-cover py-16 px-4">

            {/* Heading */}
            <div className="text-center text-white mb-5" data-aos="fade-right">
                <h1 className="text-[50px] font-bold">
                    Featured Media
                </h1>
                <p>
                    Photos & Videos
                </p>
            </div>

            {/* Gallery Layout */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : images.length === 0 ? (
                <div className="text-center text-white/30 py-16">
                    <p>No photos uploaded yet.</p>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[500px]">

                    {/* LEFT BIG IMAGE */}
                    <div className="md:col-span-2 md:row-span-2 h-[200px] md:h-full overflow-hidden rounded-xl">
                        <img
                            src={images[0]}
                            alt=""
                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                        />
                    </div>

                    {/* RIGHT IMAGES */}
                    {images.slice(1).map((img, index) => (
                        <div
                            key={index}
                            className="h-[200px] md:h-full overflow-hidden rounded-xl"
                        >
                            <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                            />
                        </div>
                    ))}

                </div>
            )}

            {/* Buttons */}
            <div className="w-full flex justify-center py-10">
                <div className="flex flex-wrap justify-center gap-4">
                    {buttons.map((btn, index) => (
                        <button onClick={() => navigate(btn.path)}
                            key={btn.name + index}
                            className="border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition"
                        >
                            {btn.name}
                        </button>
                    ))}
                </div>
            </div>

        </section>
    );
}