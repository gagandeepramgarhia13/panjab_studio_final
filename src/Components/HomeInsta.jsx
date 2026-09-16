import { socialLinks } from "../utility/data";

export default function HomeInsta() {
    return (
        <section className="w-full py-16 px-4 bg-[#181819] flex items-center flex-col ">

            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Follow Us on Instagram
                </h2>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <p className="text-gray-400 mt-2 hover:text-[#C8A96A] transition">
                        @panjabstudiosuk
                    </p>
                </a>
            </div>

            {/* Live Instagram Feed — auto-updates whenever a new post goes up */}
            <div className="max-w-6xl w-full mx-auto">
                <div className="elfsight-app-971d7cbe-834a-4d16-a8f6-b4a8f4cb3156" data-elfsight-app-lazy></div>
            </div>

            {/* Button */}
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <button className="border border-white text-white px-6 mt-5 py-2 hover:bg-white hover:text-black transition">
                    VISIT INSTAGRAM
                </button>
            </a>

        </section>
    );
}
