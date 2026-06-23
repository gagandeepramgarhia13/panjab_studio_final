import { useEffect, useState } from "react";
import { floatingLogos } from "@/data/yourFile"; // adjust path

export default function FloatingLogo() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {floatingLogos.map((logo) => (
                <div
                    key={logo.id}
                    className={`fixed z-[1000] transition-all duration-500 ease-in-out
                    ${scrolled
                            ? "top-4 left-4 scale-150"
                            : `${logo.position} -translate-x-1/2`
                        }`}
                >
                    {/* 🔹 Soft Gradient Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-white/40 via-white/20 to-transparent blur-2xl rounded-full"></div>
                    </div>

                    {/* 🔹 Logo */}
                    <img
                        src={logo.src}
                        alt={`logo-${logo.id}`}
                        className="relative h-16 object-contain drop-shadow-lg"
                    />
                </div>
            ))}
        </>
    );
}