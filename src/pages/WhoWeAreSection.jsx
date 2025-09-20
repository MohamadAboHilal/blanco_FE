import React from "react";
import building from "../assets/building.png";
import school from "../assets/school.png";
import hospital from "../assets/hospital.png";
import shop from "../assets/stores.png";
import governmentImg from "../assets/government.png";
import bigStarsBG from "../assets/bigStarsBG.svg";
import house from "../assets/house.png";

import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import AboutBlancoSection from "../components/AboutBlancoSection";

function SpecializationCard({ img, title, description }) {
  return (
    // Full-height cards for perfect alignment across the grid
    <div className="w-full max-w-[377px] h-full">
      <div className="flex h-full min-h-[207px] flex-col items-center justify-start rounded-[14px] bg-white/90 px-6 py-6 text-center  shadow-sm">
        {/* Consistent icon sizing */}
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="h-12 w-12 object-contain shrink-0"
        />

        {/* Consistent title styling */}
        <h5 className="mt-3 text-[17px] md:text-lg font-semibold text-[#0f172a] leading-snug">
          {title}
        </h5>

        {/* Consistent description styling + fixed text width for equal wrapping */}
        <p className="mt-2 text-sm md:text-base text-[#6b7280] leading-relaxed max-w-[320px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhoWeAreSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  const specializations = [
    {
      title: t("specializations.building"),
      img: building,
      description: t("specializations.buildingDescription"),
    },
    {
      title: t("specializations.school"),
      img: school,
      description: t("specializations.schoolDescription"),
    },
    {
      title: t("specializations.hospital"),
      img: hospital,
      description: t("specializations.hospitalDescription"),
    },
    {
      title: t("specializations.shop"),
      img: shop,
      description: t("specializations.shopDescription"),
    },
    {
      title: t("specializations.government"),
      img: governmentImg,
      description: t("specializations.governmentDescription"),
    },
    {
      title: t("specializations.house"),
      img: house,
      description: t("specializations.houseDescription"),
    },
  ];

  return (
    <section
      id="aboutBlanco"
      className="relative isolate w-full py-14 bg-[#F9FBFF] "
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-12">
        {/* panel: make it a stacking context and clip overflow */}
        <div className="relative z-0 overflow-hidden rounded-[28px] bg-white/90 backdrop-blur-sm ring-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] px-6 md:px-10 py-10">
          {/* decorative stars - behind everything in this panel */}
          <img
            src={bigStarsBG}
            alt=""
            className="pointer-events-none select-none absolute top-1/2 right-0 -translate-y-1/2 w-[200px] h-auto opacity-60 -z-10"
          />

          {/* content: lift above stars */}
          <div className="relative z-10">
            {/* Heading */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002833]">
                ✨ {t("about.who")}{" "}
                <span className="text-[#00B0DF]">{t("about.weAre")}</span>
              </h2>
              <p className="mt-5 text-black text-lg md:text-xl leading-relaxed">
                <span className="font-bold text-[#00B0DF]">
                  {t("about.blanco")}
                </span>{" "}
                {t("about.is")}{" "}
                <span className="font-semibold text-[#00B0DF]">
                  {t("about.b2b")}
                </span>{" "}
                {t("about.cleaning")}
              </p>
            </div>

            {/* Our Specializations */}
            <h3 className="mt-10 text-center text-xl md:text-2xl font-bold text-[#FDC789]">
              {t("about.ourSpecializations")}
            </h3>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
              {specializations.map((s, i) => (
                <SpecializationCard
                  key={i}
                  img={s.img}
                  title={s.title}
                  description={s.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <AboutBlancoSection />
    </section>
  );
}
