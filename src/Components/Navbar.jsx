import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    "Home",
    "Photography",
    "Cinematography",
    "Testimonials",
    "About Us",
    "Contact Us",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item) => {
    switch (item) {
      case "Home":
        navigate("/");
        break;
      case "Photography":
        navigate("/photography");
        break;
      case "Cinematography":
        navigate("/cinematography");
        break;
      case "Testimonials":
        navigate("/testimonials");
        break;
      case "About Us":
        navigate("/about");
        break;
      case "Contact Us":
        navigate("/contact");
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed w-full z-[9999] top-0">

      {/* Navbar */}
      <div
        className={`flex items-center justify-between h-[100px] px-6 md:px-12
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-black/60 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }
        `}
      >

        {/* Logo */}
        <div
          className={`transition-all duration-500 ease-in-out flex items-center
          ${scrolled ? "scale-150" : "scale-125"}
          `}
        >
          <img
            src="/panjab_logo/1.png"
            alt="logo"
            className="h-14 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Menu */}
        <nav>
          <ul className="hidden md:flex gap-10 text-white font-medium">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigation(item)}
                className="cursor-pointer transition hover:text-yellow-400 [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mx-4 mt-2 bg-[#0a0a0a]/95 backdrop-blur-md rounded-2xl border border-[#C8A96A]/20 shadow-2xl md:hidden overflow-hidden">
          <ul className="flex flex-col divide-y divide-white/10">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleNavigation(item);
                  setIsOpen(false);
                }}
                className="cursor-pointer transition-colors px-6 py-4 text-[#C8A96A] font-semibold text-lg hover:bg-white/5 hover:text-[#e0c389]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}