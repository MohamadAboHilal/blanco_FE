import React from "react";
import { useTranslation } from "react-i18next";

import starsBG from "../assets/starsBG.svg";
import rocket from "../assets/rocket.png";
import hands from "../assets/hands.png";
import eye from "../assets/eye.png";

export default function AboutBlancoSection() {
  const { t, i18n } = useTranslation();

  // Determine RTL for Arabic
  const isRTL =
    (typeof i18n.dir === "function" ? i18n.dir() === "rtl" : false) ||
    (i18n.language && i18n.language.toLowerCase().startsWith("ar"));

  const cards = [
    {
      title: t("aboutBlanco.mission"),
      text: t("aboutBlanco.missionText"),
      icon: rocket,
      alt: "Mission icon",
    },
    {
      title: t("aboutBlanco.values"),
      text: t("aboutBlanco.valuesText"),
      icon: hands,
      alt: "Values icon",
    },
    {
      title: t("aboutBlanco.vision"),
      text: t("aboutBlanco.visionText"),
      icon: eye,
      alt: "Vision icon",
    },
  ];

  return (
    <section>
      <div
        className="relative rounded-3xl bg-[#FBF4ED] px-6 py-10 md:px-10 md:py-12"
        style={{
          backgroundImage: `url(${starsBG})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center bottom",
          backgroundSize: "min(1200px,95vw) auto",
        }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-20 text-center md:text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B36]">
              ✨{t("aboutBlanco.about")}{" "}
              <span className="text-[#00B0DF]">{t("aboutBlanco.blanco")}</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-36">
            {cards.map((c, i) => (
              <div
                key={i}
                // Set the text direction per card, so body text flips correctly in Arabic
                dir={isRTL ? "rtl" : "ltr"}
                className={`group relative rounded-2xl bg-white shadow-[0_18px_45px_-20px_rgba(0,0,0,0.25)] ring-black/5 p-6 md:p-7 flex flex-col min-h-[240px] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[#00B0DF]">
                    {c.title}
                  </h3>
                  <img
                    src={c.icon}
                    alt={c.alt}
                    className="h-7 w-7 md:h-8 md:w-8 object-contain"
                    loading="lazy"
                  />
                </div>

                <p className="mt-4 text-[15px] md:text-base leading-7 text-[#6B7280] whitespace-pre-line">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
