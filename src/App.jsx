import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Home page = your current stack of sections
import Home from "./pages/Home.jsx";
import ServicesSection from "./pages/ServiceSection.jsx";
import ReviewsSection from "./pages/ReviewsSection.jsx";
import ClientsSection from "./pages/ClientsSection.jsx";
import TipsSection from "./pages/TipsSection.jsx";
import FaqSection from "./pages/FaqSection.jsx";
import ContactSection from "./pages/ContactSection.jsx";
import Work from "./pages/Work.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Context provider for data
import { HomeDataProvider } from "./contexts/HomeDataContext.jsx";

// About page (new) – renders your WhoWeAreSection
import AboutPage from "./pages/AboutPage.jsx";

import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        const header = document.getElementById("main-header");
        if (el) {
          const headerHeight = header ? header.offsetHeight : 70;
          const elTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elTop - headerHeight - 8,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location.state]);
  return (
    <>
      <Home />
      <ServicesSection />
      <Work />
      <ReviewsSection />
      <ClientsSection />
      <TipsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

export default function App() {
  return (
    // <>
    //
    //
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/about" element={<AboutPage />} />
    //     </Routes>
    //
    //
    //   </HomeDataProvider>
    // </>
    <>
      <HomeDataProvider>
        <Header />
        <Home />
        <AboutPage />
        <ServicesSection />
        <ClientsSection />
        <Work />
        <ReviewsSection />

        <TipsSection />
        <FaqSection />
        <ContactSection />
        <FloatingWhatsApp />
        <Footer />
      </HomeDataProvider>
    </>
  );
}
