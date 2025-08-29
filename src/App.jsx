import React from "react";
import "./components/Header.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import ServicesSection from "./pages/ServiceSection.jsx";
import ReviewsSection from "./pages/ReviewsSection.jsx";
import Footer from "./components/Footer.jsx";
import ClientsSection from "./pages/ClientsSection.jsx";
import TipsSection from "./pages/TipsSection.jsx";
import FaqSection from "./pages/FaqSection.jsx";
import ContactSection from "./pages/ContactSection.jsx";

function App() {
  return (
    <>
      <div className="">
        <Header />
        <Home />
        <ServicesSection />
        <ReviewsSection />
        <ClientsSection />
        <TipsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
