import React, { useMemo } from "react";
import ClientsCarousel from "../components/ClientsCarousel";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

export default function ClientsSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { clients: apiClients, loading, error } = useHomeData();

  // Map API -> carousel prop (array of image URLs)
  const logos = useMemo(
    () => (apiClients ?? []).map((c) => c.image),
    [apiClients]
  );

  return (
    <section
      id="clients"
      className="w-full py-8 sm:py-10 md:py-12 my-10 md:my-16 lg:my-20 bg-[#f5f6fa] overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[320px_minmax(0,1fr)] items-center gap-4 md:gap-6 lg:gap-8 bg-[#f5f6fa]">
          {/* Left — fixed content, centered on small/medium screens */}
          <div className="space-y-2 w-full lg:w-auto text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              ✨ {t("clients.our")}{" "}
              <span className="text-[#00B0DF]">{t("clients.clients")}</span>
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl pt-2 sm:pt-4 font-semibold px-0 sm:px-10">
              {t("clients.description")}
            </p>
          </div>

          {/* Right — logos carousel, always horizontal */}
          {loading ? (
            <div className="h-[120px] sm:h-[140px] grid place-items-center text-slate-400 w-full">
              {t("common.loading") || "Loading…"}
            </div>
          ) : error ? (
            <div className="p-4 sm:p-6 text-center text-red-600 w-full">
              {t("common.failed") || "Failed to load clients."}
            </div>
          ) : logos.length === 0 ? (
            <div className="p-4 sm:p-6 text-center text-slate-500 w-full">
              {t("clients.none") || "No clients to show."}
            </div>
          ) : (
            <ClientsCarousel logos={logos} />
          )}
        </div>
      </div>
    </section>
  );
}
