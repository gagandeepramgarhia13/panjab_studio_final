import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const photoRef = useRef();
  const cineRef = useRef();

  // Clear, visible "current page" state — a small gold underline dot plus
  // gold text, applied to whichever nav item matches (or starts with, for
  // the Photography/Cinematography section) the current route.
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navItemClass = (path) =>
    `relative cursor-pointer transition-colors duration-300 [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)] hover:text-[#C8A45D] ${
      isActive(path) ? "text-[#C8A45D] after:content-[''] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-[#C8A45D]" : "text-white"
    }`;

  const mobileNavItemClass = (path) =>
    `cursor-pointer px-4 py-2.5 font-medium text-sm hover:bg-white/10 hover:text-[#C8A45D] transition-colors ${
      isActive(path) ? "text-[#C8A45D] bg-white/5 border-l-2 border-[#C8A45D]" : "text-white"
    }`;

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

  // Solid, high-contrast dropdown panel — was bg-white/10 (near-transparent),
  // which made it unreadable over bright hero images. Now a near-opaque
  // dark gradient with a gold edge + lifted shadow for a premium 3D feel.
  const dropdownClass = "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 origin-top rounded-2xl border border-[#C8A45D]/25 bg-gradient-to-b from-[#141414] to-[#070707] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(200,164,93,0.06)] [animation:dropdownIn_0.22s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden";
  const dropdownItemClass = "group/item relative isolate block w-full text-left px-4 py-2.5 text-sm text-white/85 transition-colors duration-300 hover:text-black overflow-hidden";
  const dropdownItemSweep = "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-[#C8A45D] to-[#D8C79F] transition-transform duration-300 ease-out group-hover/item:scale-x-100";

  return (
    <div className="fixed w-full z-[9999] top-0">

      <div className={`h-[56px] lg:h-[70px] px-4 lg:px-10 transition-all duration-500 ease-in-out
        ${scrolled ? "bg-black/60 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>

        {/* ── Mobile/Tablet ── */}
        <div className="grid grid-cols-3 lg:hidden items-center h-full">

          <div className="flex items-center">
            <img src="/panjab_logo/1.png" alt="logo"
              className={`w-auto cursor-pointer object-contain transition-all duration-500 ease-in-out ${scrolled ? "h-8" : "h-12"}`}
              onClick={() => handleNavigation("/")} />
          </div>

          <div className="flex items-center justify-center gap-3">
            {followLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-white text-base hover:text-[#C8A45D] transition">
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
              className={navItemClass("/")}>
              Home
            </li>

            {/* Photography Dropdown */}
            <li ref={photoRef} className="relative"
              onMouseEnter={() => { setPhotoDropdown(true); setCineDropdown(false); }}
              onMouseLeave={() => setPhotoDropdown(false)}>
              <button onClick={() => handleNavigation("/photography")}
                className={`flex items-center gap-1 ${navItemClass("/photography")}`}>
                Photography
                <ChevronDown size={14} className={`transition-transform duration-200 ${photoDropdown ? "rotate-180" : ""}`} />
              </button>
              {photoDropdown && <div className="absolute top-full left-0 w-full h-4" />}
              {photoDropdown && (
                <div className={dropdownClass}>
                  <div className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" />
                  <div className="py-1">
                    {photographyItems.map((item) => (
                      <button key={item.path} onClick={() => handleNavigation(item.path)} className={dropdownItemClass}>
                        <span className={dropdownItemSweep} />
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-[#C8A45D]/15">
                      <button onClick={() => handleNavigation("/photography")}
                        className="w-full text-left px-4 py-2.5 text-[#C8A45D] text-xs hover:bg-white/5 transition-colors">
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
                className={`flex items-center gap-1 ${navItemClass("/cinematography")}`}>
                Cinematography
                <ChevronDown size={14} className={`transition-transform duration-200 ${cineDropdown ? "rotate-180" : ""}`} />
              </button>
              {cineDropdown && <div className="absolute top-full left-0 w-full h-4" />}
              {cineDropdown && (
                <div className={dropdownClass}>
                  <div className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" />
                  <div className="py-1">
                    {cinematographyItems.map((item) => (
                      <button key={item.path} onClick={() => handleNavigation(item.path)} className={dropdownItemClass}>
                        <span className={dropdownItemSweep} />
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-[#C8A45D]/15">
                      <button onClick={() => handleNavigation("/cinematography")}
                        className="w-full text-left px-4 py-2.5 text-[#C8A45D] text-xs hover:bg-white/5 transition-colors">
                        View All →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li onClick={() => handleNavigation("/testimonials")}
              className={navItemClass("/testimonials")}>
              Testimonials
            </li>

            <li onClick={() => handleNavigation("/about")}
              className={navItemClass("/about")}>
              About Us
            </li>

            <li onClick={() => handleNavigation("/team")}
              className={navItemClass("/team")}>
              Our Team
            </li>

            <li onClick={() => handleNavigation("/contact")}
              className={navItemClass("/contact")}>
              Contact Us
            </li>

          </ul>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mx-4 mt-1 bg-gradient-to-b from-[#141414]/98 to-[#070707]/98 backdrop-blur-xl border border-[#C8A45D]/20 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] lg:hidden overflow-hidden [animation:menuIn_0.22s_cubic-bezier(0.16,1,0.3,1)]">
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent" />
          <ul className="flex flex-col divide-y divide-white/10">

            <li onClick={() => handleNavigation("/")}
              className={mobileNavItemClass("/")}>
              Home
            </li>

            {/* Mobile Photography */}
            <li>
              <button onClick={() => setMobilePhoto(!mobilePhoto)}
                className={`w-full flex items-center justify-between ${mobileNavItemClass("/photography")}`}>
                Photography
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobilePhoto ? "rotate-180" : ""}`} />
              </button>
              {mobilePhoto && (
                <div className="bg-black/30 border-t border-[#C8A45D]/10">
                  {photographyItems.map((item) => (
                    <button key={item.path} onClick={() => handleNavigation(item.path)}
                      className="w-full text-left px-8 py-2 text-white/70 text-sm hover:bg-[#C8A45D] hover:text-black transition-colors">
                      {item.label}
                    </button>
                  ))}
                  <button onClick={() => handleNavigation("/photography")}
                    className="w-full text-left px-8 py-2 text-[#C8A45D] text-xs hover:bg-white/10 transition-colors">
                    View All →
                  </button>
                </div>
              )}
            </li>

            {/* Mobile Cinematography */}
            <li>
              <button onClick={() => setMobileCine(!mobileCine)}
                className={`w-full flex items-center justify-between ${mobileNavItemClass("/cinematography")}`}>
                Cinematography
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileCine ? "rotate-180" : ""}`} />
              </button>
              {mobileCine && (
                <div className="bg-black/30 border-t border-[#C8A45D]/10">
                  {cinematographyItems.map((item) => (
                    <button key={item.path} onClick={() => handleNavigation(item.path)}
                      className="w-full text-left px-8 py-2 text-white/70 text-sm hover:bg-[#C8A45D] hover:text-black transition-colors">
                      {item.label}
                    </button>
                  ))}
                  <button onClick={() => handleNavigation("/cinematography")}
                    className="w-full text-left px-8 py-2 text-[#C8A45D] text-xs hover:bg-white/10 transition-colors">
                    View All →
                  </button>
                </div>
              )}
            </li>

            <li onClick={() => handleNavigation("/testimonials")}
              className={mobileNavItemClass("/testimonials")}>
              Testimonials
            </li>

            <li onClick={() => handleNavigation("/about")}
              className={mobileNavItemClass("/about")}>
              About Us
            </li>

            <li onClick={() => handleNavigation("/team")}
              className={mobileNavItemClass("/team")}>
              Our Team
            </li>

            <li onClick={() => handleNavigation("/contact")}
              className={mobileNavItemClass("/contact")}>
              Contact Us
            </li>

          </ul>
        </div>
      )}
    </div>
  );
}