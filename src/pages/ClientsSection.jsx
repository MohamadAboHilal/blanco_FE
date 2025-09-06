import React from "react";
import ClientsCarousel from "../components/ClientsCarousel";
// import your logo svgs/pngs
import adidas from "../assets/adidas.jpg";
import airbnb from "../assets/airbnb.jpg";
import tesla from "../assets/tesla.jpg";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

export default function ClientsSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();

  const logos = [
    adidas,
    airbnb,
    tesla,
    adidas,
    airbnb,
    tesla,
    adidas,
    airbnb,
    tesla,
    adidas,
    airbnb,
    tesla,
  ];

  return (
    <section id="clients" className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] items-center gap-8">
          {/* Left — fixed content */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              ✨ {t("clients.our")}{" "}
              <span className="text-[#00B0DF]">{t("clients.clients")}</span>
            </h2>
            <p className="text-slate-600 text-xl pt-4 font-semibold pl-10">
              {t("clients.description")}
            </p>
          </div>

          {/* Right — only logos scroll */}
          <ClientsCarousel logos={logos} />
        </div>
      </div>
    </section>
  );
}
