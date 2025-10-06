import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import ServicesSection from "./pages/ServiceSection.jsx";
import ReviewsSection from "./pages/ReviewsSection.jsx";
import ClientsSection from "./pages/ClientsSection.jsx";
import TipsSection from "./pages/TipsSection.jsx";
import FaqSection from "./pages/FaqSection.jsx";
import ContactSection from "./pages/ContactSection.jsx";
import Work from "./pages/Work.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import { HomeDataProvider } from "./contexts/HomeDataContext.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
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
  const [seo, setSeo] = useState(null);

  // tiny helpers
  const pick = (obj, keys) => {
    for (const k of keys) {
      const v = obj?.[k];
      if (v != null && String(v).trim() !== "") return String(v).trim();
    }
    return null;
  };
  const twitterHandle = (val) => {
    if (!val) return null;
    // accept "@user", "user", or "https://x.com/user"
    const m = String(val).match(
      /(?:x\.com\/|twitter\.com\/)?@?([A-Za-z0-9_]{1,15})$/
    );
    return m ? `@${m[1]}` : String(val);
  };

  useEffect(() => {
    (async () => {
      try {
        const lang = localStorage.getItem("lang") || "en";
        const res = await fetch("https://api.blancoone.com/api/seo", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            language: lang,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch SEO data");
        const data = await res.json();

        // clean null/empty
        const cleaned = Object.fromEntries(
          Object.entries(data).filter(
            ([_, v]) => v != null && String(v).trim() !== ""
          )
        );
        setSeo(cleaned);
      } catch (e) {
        console.error("SEO fetch failed:", e);
      }
    })();
  }, []);

  // resolve fields from either colon or underscore keys
  const title = pick(seo, ["title"]);
  const description = pick(seo, ["description"]);
  const keywords = pick(seo, ["keywords"]);
  const robots = pick(seo, ["robots"]);
  const canonical = pick(seo, ["canonical"]);
  const favicon = pick(seo, ["favicon", "Favicon"]);

  const ogTitle = pick(seo, ["og:title", "og_title"]);
  const ogDescription = pick(seo, ["og:description", "og_description"]);
  const ogImage = pick(seo, ["og:image", "og_image"]);
  const ogType = pick(seo, ["og:type", "og_type"]) || "website"; // fallback

  const twCard = pick(seo, ["twitter:card", "twitter_card"]);
  const twTitle = pick(seo, ["twitter:title", "twitter_title"]);
  const twDescription = pick(seo, [
    "twitter:description",
    "twitter_description",
  ]);
  const twSite = twitterHandle(pick(seo, ["twitter:site", "twitter_site"]));

  return (
    <HomeDataProvider>
      {/* === Global SEO (React 19 hoists into <head>) === */}
      {seo && (
        <>
          {/* Basic */}
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          {keywords && <meta name="keywords" content={keywords} />}
          {robots && <meta name="robots" content={robots} />}
          {canonical && <link rel="canonical" href={canonical} />}

          {/* Favicon */}
          {favicon && (
            <>
              <link rel="icon" href={favicon} />
              <link rel="shortcut icon" href={favicon} />
            </>
          )}

          {/* Open Graph */}
          {ogTitle && <meta property="og:title" content={ogTitle} />}
          {ogDescription && (
            <meta property="og:description" content={ogDescription} />
          )}
          {ogImage && <meta property="og:image" content={ogImage} />}
          <meta property="og:type" content={ogType} />
          <meta property="og:url" content={window.location.href} />

          {/* Twitter */}
          {twCard && <meta name="twitter:card" content={twCard} />}
          {twTitle && <meta name="twitter:title" content={twTitle} />}
          {twDescription && (
            <meta name="twitter:description" content={twDescription} />
          )}
          {twSite && <meta name="twitter:site" content={twSite} />}
        </>
      )}

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <FloatingWhatsApp />
      <Footer />
    </HomeDataProvider>
  );
}
