import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from './Components/Navbar'
import HomeAmbientBackground from './Components/HomeAmbientBackground'
import HeroPage from './Components/HeroPage'
import WhatWeDo from './Components/whatWeDo'
import HomePhotography from './Components/HomePhotography'
import HomeCinematography from './Components/HomeCinematography'
import HomeGallery from './Components/HomeGallery'
import HomeExplore from './Components/HomeExplore'
import HomeTestimonials from './Components/HomeTestimonials'
import HomeInsta from './Components/HomeInsta'
import HomeCTA from './Components/HomeCTA'
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
import OurTeam from "./Components/OurTeam";

// Photography categories
import LiveEvents from "./Components/LiveEvents";
import Weddings from "./Components/Weddings";
import PortraitShoot from "./Components/PortraitShoot";
import CommercialPhotos from "./Components/CommercialPhotos";

// Cinematography categories
import WeddingVideos from "./Components/WeddingVideos";
import LiveEventsVideos from "./Components/LiveEventsVideos";
import MusicVideos from "./Components/MusicVideos";
import CommercialVideos from "./Components/CommercialVideos";
import HomeOurTeam from "./Components/HomeOurTeam";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <Routes>

        {/* ✅ Home Page */}
        <Route path="/" element={
          <>
            {/* One continuous animated background for the whole home page —
                see HomeAmbientBackground.jsx for why this replaced each
                section painting its own flat/clipped background. */}
            <HomeAmbientBackground />
            <HeroPage />
            <WhatWeDo />
            <HomePhotography />
            <HomeCinematography />
            <HomeOurTeam />
            <HomeGallery />
            <HomeExplore />
            <HomeTestimonials />
            <HomeInsta />
            <HomeCTA />

          </>
        } />

        {/* ✅ About Page */}
        <Route path="/about" element={<About />} />

        {/* ✅ Our Mission */}
        <Route path="/our-mission" element={<OurMission />} />

        {/* ✅ Our Team */}
        <Route path="/team" element={<OurTeam fullPage={true} />} />

        {/* ✅ Photography */}
        <Route path="/photography" element={<Photography />} />
        <Route path="/photography/weddings" element={<Weddings />} />
        <Route path="/photography/live-events" element={<LiveEvents />} />
        <Route path="/photography/portrait-shoot" element={<PortraitShoot />} />
        <Route path="/photography/commercial-photos" element={<CommercialPhotos />} />

        {/* ✅ Cinematography */}
        <Route path="/cinematography" element={<Cinematography />} />
        <Route path="/cinematography/wedding-videos" element={<WeddingVideos />} />
        <Route path="/cinematography/live-events-videos" element={<LiveEventsVideos />} />
        <Route path="/cinematography/music-videos" element={<MusicVideos />} />
        <Route path="/cinematography/commercial-videos" element={<CommercialVideos />} />

        {/* ✅ Testimonials */}
        <Route path="/testimonials" element={<Testimonials />} />

        {/* ✅ Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />

        {/* ✅ Legal */}
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />

      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;