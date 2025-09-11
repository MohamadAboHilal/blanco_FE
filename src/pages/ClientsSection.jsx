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

          {/* Right — logos carousel */}
          {loading ? (
            <div className="h-[140px] grid place-items-center text-slate-400">
              {t("common.loading") || "Loading…"}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              {t("common.failed") || "Failed to load clients."}
            </div>
          ) : logos.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
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
