import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from './Components/Navbar'
import HeroPage from './Components/HeroPage'
import WhatWeDo from './Components/whatWeDo'
import HomeGallery from './Components/HomeGallery'
import HomeTestimonials from './Components/HomeTestimonials'
import HomeInsta from './Components/HomeInsta'
import Footer from './Components/Footer'
import About from './Components/About'
import Photography from "./Components/Photography";
import Cinematography from "./Components/Cinematography";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import AdminPage from "./Components/AdminPage";
import AdminLogin from "./Components/AdminLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import TermsAndConditions from "./Components/TermsAndConditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import FAQ from "./Components/FAQ";
import OurMission from "./Components/OurMission";




function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const images = [
    { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", size: "large" },
    { src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7", size: "wide" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba", size: "tall" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d" },
    { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e", size: "wide" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", size: "tall" },
    { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", size: "wide" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", size: "tall" },
    { src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913" },
    { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7", size: "large" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e" },
    { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9", size: "wide" },
    { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", size: "tall" },
    { src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7" },
  ];

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <HeroPage />
            <WhatWeDo />
            <HomeGallery />
            <HomeTestimonials />
            <HomeInsta />
          </>
        } />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* ✅ Photography Page — now fetches from Supabase */}
        <Route path="/photography" element={<Photography />} />

        {/* ✅ Cinematography Page — now fetches from Supabase */}
        <Route path="/cinematography" element={<Cinematography />} />

        {/* ✅ Testimonials Page */}
        <Route path="/testimonials" element={<Testimonials images={images} />} />

        {/* ✅ Contact Page */}
        <Route path="/contact" element={<Contact images={images} />} />

        {/* ✅ Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Admin Page — protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        {/* ✅ Term and conditions */}
        <Route path="/terms" element={<TermsAndConditions />} />

        {/* ✅ PrivacyPolicy */}
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* ✅ FAQ */}
        <Route path="/faq" element={<FAQ />} />

        <Route path="/our-mission" element={<OurMission />} />


      </Routes>

      {!isAdmin && <Footer />}


    </>
  );
}

export default App;
