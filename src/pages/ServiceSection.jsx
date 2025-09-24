import React, { useMemo } from "react";
import ServicesCarousel from "../components/ServicesCarousel";
import servicesBg from "../assets/servicesBg.svg";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

export default function ServicesSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { services: apiServices } = useHomeData();

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
      className="relative w-full z-0 mt-16 md:mt-20 overflow-x-hidden scroll-mt-[78px] bg-[#f5f6fa]"
    >
      {/* BG decoration: hide on small/medium */}
      <div
        aria-hidden="true"
        className="
          hidden lg:block
          absolute left-1/2 -translate-x-1/2
          top-[50px]
          w-[min(95vw,1200px)]
          aspect-[1209/492]
          bg-no-repeat bg-contain bg-center
          -z-10 pointer-events-none
        "
        style={{ backgroundImage: `url(${servicesBg})` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            ✨ {t("services.our")}{" "}
            <span className="text-[#00B0DF]">{t("services.cleaning")}</span>{" "}
            {t("services.service")}
          </h2>
          <p className="mt-4 md:mt-5 text-slate-600 leading-relaxed text-lg md:text-xl font-semibold">
            ✨ {t("services.description")} ✨.
          </p>
        </div>

        <div className="mt-8 bg-slate-50">
          <ServicesCarousel services={services} dir={dir} />
        </div>
      </div>
    </section>
  );
}
