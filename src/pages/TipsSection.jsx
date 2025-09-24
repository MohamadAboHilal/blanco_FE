import React, { useMemo } from "react";
import TipsCarousel from "../components/TipsCarousel";
import starsBG from "../assets/starsBG.svg";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

function colorQuotedLocalized(title, dir) {
  if (!title?.includes('"')) return title;

  const quotes = (title.match(/"/g) || []).length;

  // LTR with proper pairs → color segments between pairs
  if (dir !== "rtl" && quotes >= 2 && quotes % 2 === 0) {
    const out = [];
    const parts = title.split('"');
    // parts: [pre, q1, between, q2, after] -> odd indexes are inside quotes
    parts.forEach((chunk, i) => {
      if (i % 2 === 1 && chunk.length) {
        out.push(
          <span key={`q-${i}`} className="text-[#00B0DF]">
            {chunk}
          </span>
        );
      } else if (chunk) {
        out.push(chunk);
      }
    });
    return out;
  }

  // RTL or unbalanced quotes → color text after the last quote
  const last = title.lastIndexOf('"');
  if (last >= 0 && last < title.length - 1) {
    const before = title.slice(0, last).replaceAll('"', "");
    const after = title.slice(last + 1);
    return [
      before,
      <span key="rtl-last" className="text-[#00B0DF]">
        {after}
      </span>,
    ];
  }

  // Fallback: remove quotes, no color
  return title.replaceAll('"', "");
}

export default function TipsSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { cleaningTips: apiTips, loading, error } = useHomeData();

  const tips = useMemo(
    () =>
      (apiTips ?? []).map((tip) => ({
        id: tip.id,
        icon: tip.icon,
        title: colorQuotedLocalized(tip.title, dir),
        text: tip.description,
      })),
    [apiTips, dir]
  );

  return (
    <section
      id="tips"
      className="w-full bg-[#FBF4ED] pt-8 pb-20 sm:pt-12 sm:pb-28 md:pt-14 md:pb-36 bg-repeat-x bg-bottom bg-contain"
      style={{
        backgroundImage: `url(${starsBG})`,
        backgroundPosition: "center bottom",
        backgroundSize: "min(1200px, 95vw) auto",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            ✨ {t("tips.professional")}{" "}
            <span className="text-[#00B0DF]">{t("tips.cleaning")}</span>{" "}
            {t("tips.tips")}
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-700 text-lg sm:text-xl md:text-2xl font-semibold pt-4 sm:pt-6">
            {t("tips.description")}
          </p>
        </div>

        {/* 3×3 carousel */}
        {loading ? (
          <div className="h-[180px] sm:h-[220px] md:h-[260px] grid place-items-center text-slate-400">
            {t("common.loading") || "Loading…"}
          </div>
        ) : error ? (
          <div className="p-4 sm:p-6 text-center text-red-600">
            {t("common.failed") || "Failed to load tips."}
          </div>
        ) : tips.length === 0 ? (
          <div className="p-4 sm:p-6 text-center text-slate-500">
            {t("tips.none") || "No tips available."}
          </div>
        ) : (
          <TipsCarousel tips={tips} />
        )}
      </div>
    </section>
  );
}
