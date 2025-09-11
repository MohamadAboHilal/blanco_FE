// ReviewsSection.jsx
import React, { useMemo } from "react";
import ReviewsCarousel from "../components/ReviewsCarousel";
import bigStarsBG from "../assets/bigStarsBG.svg";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

export default function ReviewsSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { testimonials: apiTestimonials, loading, error } = useHomeData();

  // Map API -> UI
  const reviews = useMemo(
    () =>
      (apiTestimonials ?? []).map((r) => ({
        id: r.id,
        avatar: r.client_image,
        name: r.client_name,
        role: r.client_position,
        rating: r.rate,
        text: r.text,
      })),
    [apiTestimonials]
  );

  return (
    <section
      id="reviews"
      className="relative w-full py-16 bg-[#F9FBFF] overflow-hidden overflow-x-hidden"
    >
      <img
        src={bigStarsBG}
        alt=""
        className="pointer-events-none select-none absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-auto z-20 opacity-90"
      />

      <div
        aria-hidden="true"
        className="absolute -left-24 -top-10 w-[420px] h-[420px] z-0 bg-[#00B0DF]/15 rounded-full blur-[150px]"
      />

      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ {t("reviews.whatOur")}{" "}
            <span className="text-[#00B0DF]">{t("reviews.clients")}</span>{" "}
            {t("reviews.say")}
          </h2>
          <p className="mt-4 text-gray-600 font-semibold text-xl">
            {t("reviews.description")}
          </p>
        </div>

        {loading ? (
          <div className="h-[220px] grid place-items-center text-slate-400">
            {t("common.loading") || "Loading…"}
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            {t("common.failed") || "Failed to load reviews."}
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            {t("reviews.none") || "No reviews available."}
          </div>
        ) : (
          <ReviewsCarousel reviews={reviews} />
        )}
      </div>
    </section>
  );
}
