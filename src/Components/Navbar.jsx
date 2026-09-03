import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { followLinks } from "../utility/data";

const photographyItems = [
  { label: "💍 Weddings", path: "/photography/weddings" },
  { label: "🎤 Live Events", path: "/photography/live-events" },
  { label: "📸 Portrait Shoot", path: "/photography/portrait-shoot" },
  { label: "🏢 Commercial Photographs", path: "/photography/commercial-photos" },
];

const cinematographyItems = [
  { label: "💍 Weddings", path: "/cinematography/wedding-videos" },
  { label: "🎤 Live Events", path: "/cinematography/live-events-videos" },
  { label: "🎵 Music Videos", path: "/cinematography/music-videos" },
  { label: "🎬 Commercial Videos", path: "/cinematography/commercial-videos" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoDropdown, setPhotoDropdown] = useState(false);
  const [cineDropdown, setCineDropdown] = useState(false);
  const [mobilePhoto, setMobilePhoto] = useState(false);
  const [mobileCine, setMobileCine] = useState(false);
  const navigate = useNavigate();
  const photoRef = useRef();
  const cineRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setPhotoDropdown(false);
    setCineDropdown(false);
    setMobilePhoto(false);
    setMobileCine(false);
  };

  const dropdownClass = "absolute top-[calc(100%+8px)] left-0 w-52 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl";
  const dropdownItemClass = "w-full text-left px-4 py-2.5 text-white/80 text-sm hover:bg-[#C8A96A] hover:text-black transition-colors";

  return (
    <div className="fixed w-full z-[9999] top-0">

      <div className={`h-[56px] lg:h-[70px] px-4 lg:px-10 transition-all duration-500 ease-in-out
        ${scrolled ? "bg-black/60 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>

        {/* ── Mobile/Tablet ── */}
        <div className="grid grid-cols-3 lg:hidden items-center h-full">

          <div className="flex items-center">
            <img src="/panjab_logo/1.png" alt="logo"
              className="h-10 w-auto cursor-pointer object-contain"
              onClick={() => handleNavigation("/")} />
          </div>

          <div className="flex items-center justify-center gap-3">
            {followLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-white text-base hover:text-yellow-400 transition">
                <i className={link.icon}></i>
              </a>
            ))}
          </div>

          <div className="flex justify-end">
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden lg:flex items-center justify-between h-full">

          <div className={`transition-all duration-500 ease-in-out flex items-center
            ${scrolled ? "scale-110" : "scale-150"}`}>
            <img src="/panjab_logo/1.png" alt="logo"
              className="h-10 cursor-pointer object-contain"
              onClick={() => handleNavigation("/")} />
          </div>

          <ul className="flex gap-7 text-white text-sm font-medium items-center">

            <li onClick={() => handleNavigation("/")}
              className="cursor-pointer hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
              Home
            </li>

            {/* Photography Dropdown */}
            <li ref={photoRef} className="relative"
              onMouseEnter={() => { setPhotoDropdown(true); setCineDropdown(false); }}
              onMouseLeave={() => setPhotoDropdown(false)}>
              <button onClick={() => handleNavigation("/photography")}
                className="flex items-center gap-1 hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
                Photography
                <ChevronDown size={14} className={`transition-transform duration-200 ${photoDropdown ? "rotate-180" : ""}`} />
              </button>
              {photoDropdown && <div className="absolute top-full left-0 w-full h-3" />}
              {photoDropdown && (
                <div className={dropdownClass}>
                  <div className="py-1">
                    {photographyItems.map((item) => (
                      <button key={item.path} onClick={() => handleNavigation(item.path)} className={dropdownItemClass}>
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-white/20">
                      <button onClick={() => handleNavigation("/photography")}
                        className="w-full text-left px-4 py-2.5 text-[#C8A96A] text-xs hover:bg-white/10 transition-colors">
                        View All →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Cinematography Dropdown */}
            <li ref={cineRef} className="relative"
              onMouseEnter={() => { setCineDropdown(true); setPhotoDropdown(false); }}
              onMouseLeave={() => setCineDropdown(false)}>
              <button onClick={() => handleNavigation("/cinematography")}
                className="flex items-center gap-1 hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
                Cinematography
                <ChevronDown size={14} className={`transition-transform duration-200 ${cineDropdown ? "rotate-180" : ""}`} />
              </button>
              {cineDropdown && <div className="absolute top-full left-0 w-full h-3" />}
              {cineDropdown && (
                <div className={dropdownClass}>
                  <div className="py-1">
                    {cinematographyItems.map((item) => (
                      <button key={item.path} onClick={() => handleNavigation(item.path)} className={dropdownItemClass}>
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-white/20">
                      <button onClick={() => handleNavigation("/cinematography")}
                        className="w-full text-left px-4 py-2.5 text-[#C8A96A] text-xs hover:bg-white/10 transition-colors">
                        View All →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li onClick={() => handleNavigation("/testimonials")}
              className="cursor-pointer hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
              Testimonials
            </li>

            <li onClick={() => handleNavigation("/about")}
              className="cursor-pointer hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
              About Us
            </li>

            <li onClick={() => handleNavigation("/team")}
              className="cursor-pointer hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
              Our Team
            </li>

            <li onClick={() => handleNavigation("/contact")}
              className="cursor-pointer hover:text-yellow-400 transition [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
              Contact Us
            </li>

          </ul>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mx-4 mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl lg:hidden overflow-hidden">
          <ul className="flex flex-col divide-y divide-white/10">

            <li onClick={() => handleNavigation("/")}
              className="cursor-pointer px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
              Home
            </li>

            {/* Mobile Photography */}
            <li>
              <button onClick={() => setMobilePhoto(!mobilePhoto)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
                Photography
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobilePhoto ? "rotate-180" : ""}`} />
              </button>
              {mobilePhoto && (
                <div className="bg-white/5 border-t border-white/10">
                  {photographyItems.map((item) => (
                    <button key={item.path} onClick={() => handleNavigation(item.path)}
                      className="w-full text-left px-8 py-2 text-white/70 text-sm hover:bg-[#C8A96A] hover:text-black transition-colors">
                      {item.label}
                    </button>
                  ))}
                  <button onClick={() => handleNavigation("/photography")}
                    className="w-full text-left px-8 py-2 text-[#C8A96A] text-xs hover:bg-white/10 transition-colors">
                    View All →
                  </button>
                </div>
              )}
            </li>

            {/* Mobile Cinematography */}
            <li>
              <button onClick={() => setMobileCine(!mobileCine)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
                Cinematography
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCine ? "rotate-180" : ""}`} />
              </button>
              {mobileCine && (
                <div className="bg-white/5 border-t border-white/10">
                  {cinematographyItems.map((item) => (
                    <button key={item.path} onClick={() => handleNavigation(item.path)}
                      className="w-full text-left px-8 py-2 text-white/70 text-sm hover:bg-[#C8A96A] hover:text-black transition-colors">
                      {item.label}
                    </button>
                  ))}
                  <button onClick={() => handleNavigation("/cinematography")}
                    className="w-full text-left px-8 py-2 text-[#C8A96A] text-xs hover:bg-white/10 transition-colors">
                    View All →
                  </button>
                </div>
              )}
            </li>

            <li onClick={() => handleNavigation("/testimonials")}
              className="cursor-pointer px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
              Testimonials
            </li>

            <li onClick={() => handleNavigation("/about")}
              className="cursor-pointer px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
              About Us
            </li>

            <li onClick={() => handleNavigation("/team")}
              className="cursor-pointer px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
              Our Team
            </li>

            <li onClick={() => handleNavigation("/contact")}
              className="cursor-pointer px-4 py-2.5 text-white font-medium text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors">
              Contact Us
            </li>

          </ul>
        </div>
      )}
    </div>
  );
}