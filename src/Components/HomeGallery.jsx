// src/components/Gallery.jsx

import { galleryImages } from "../utility/data.js";
import { useNavigate } from "react-router-dom";


const buttons = [
    { name: "Photography", path: "/photography" },
    { name: "Cinematography", path: "/cinematography" }
];

export default function HomeGallery() {
    const navigate = useNavigate();

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
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[500px]">

                {/* LEFT BIG IMAGE */}
                <div className="md:col-span-2 md:row-span-2 h-[200px] md:h-full overflow-hidden rounded-xl">
                    <img
                        src={galleryImages[0]}
                        alt=""
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                </div>

                {/* RIGHT 4 IMAGES */}
                {galleryImages.slice(1).map((img, index) => (
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