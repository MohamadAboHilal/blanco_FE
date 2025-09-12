import React, { useEffect } from "react";
import WhoWeAreSection from "../pages/WhoWeAreSection.jsx";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="min-h-screen bg-[#F9FBFF]">
      <WhoWeAreSection />
    </main>
  );
}
