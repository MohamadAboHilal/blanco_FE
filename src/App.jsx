import React from "react";
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

// Context provider for data
import { HomeDataProvider } from "./contexts/HomeDataContext.jsx";

// About page (new) – renders your WhoWeAreSection
import AboutPage from "./pages/AboutPage.jsx";

function HomePage() {
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
    <>
      <HomeDataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </HomeDataProvider>
    </>
  );
}
