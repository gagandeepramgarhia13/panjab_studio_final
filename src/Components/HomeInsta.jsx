export default function HomeInsta() {
    const images = [
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    ];

    return (
        <section className="w-full py-16 px-4 bg-[#181819] flex items-center flex-col ">

            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Follow Us on Instagram
                </h2>
                <a href="">
                    <p className="text-gray-400 mt-2">
                        @insta_id
                    </p>
                </a>
            </div>

            {/* Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 ">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden group rounded-lg"
                    >
                        {/* Image */}
                        <img
                            src={img}
                            alt="instagram"
                            className="w-full h-40 md:h-60 object-cover transition duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                                View Post
                            </span>
                        </div>
                    </div>
                ))}
            </div>
                {/* Button */}
                <a href="">
                    <button className="border border-white text-white px-6 mt-5 py-2 hover:bg-white hover:text-black transition">
                        VISIT INSTAGARM
                    </button>
                </a>


        </section>
    );
}