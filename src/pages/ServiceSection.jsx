import React, { useMemo } from "react";
import ServiceCard from "../components/ServiceCard";

import ServicesCarousel from "../components/ServicesCarousel";
import servicesBg from "../assets/servicesBg.svg";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

import { useHomeData } from "../contexts/HomeDataContext";

export default function ServicesSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();

  const { services: apiServices, loading, error } = useHomeData();

  const services = useMemo(
    () =>
      (apiServices ?? []).map((s) => ({
        id: s.id,
        badgeText: s.badge_text,
        badgeClass: s.badge_color,
        title: s.title,
        description: s.description,
        features: s.features ?? [],
      })),
    [apiServices]
  );

  return (
    <section
      id="services"
      className="relative w-full z-0 mt-20 overflow-x-hidden"
    >
      <div
        aria-hidden="true"
        className="
      absolute left-1/2 -translate-x-1/2
       top-[50px] md:top-[50px] 
      w-[min(95vw,1200px)]              
      aspect-[1209/492]                 
      bg-no-repeat bg-contain bg-center
      -z-10 pointer-events-none
      bg-[url('/assets/servicesBg.svg')] 
    "
        style={{ backgroundImage: `url(${servicesBg})` }}
      />

      <div
        aria-hidden="true"
        className="absolute -left-32 top-36 w-[400px] h-[400px] -z-10 
               bg-[#E5F9FF] rounded-full blur-[80px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ {t("services.our")}{" "}
            <span className="text-[#00B0DF]">{t("services.cleaning")}</span>{" "}
            {t("services.service")}
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed text-xl font-semibold">
            ✨ {t("services.description")} ✨.
          </p>
        </div>

        <div className="mt-8 bg-slate-50 ">
          <ServicesCarousel services={services} />
        </div>
      </div>
    </section>
  );
}
