import React from "react";
import ReviewsCarousel from "../components/ReviewsCarousel";
import bigStarsBG from "../assets/bigStarsBG.svg";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

export default function ReviewsSection() {
  const { t } = useTranslation();
  const { dir } = useLocale();

  const reviews = [
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Jennifer Wilson",
      role: "Homeowner",
      rating: 5,
      text: "Blanco transformed my home! Their attention to detail is incredible and the staff is so professional. I wouldn't trust anyone else with my cleaning needs.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "David Miller",
      role: "Homeowner",
      rating: 5,
      text: "Excellent experience! The cleaners were punctual, polite, and left everything spotless.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Sophia Lee",
      role: "Homeowner",
      rating: 5,
      text: "Professional and efficient. Highly recommend Blanco for regular maintenance cleaning.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    // add more...
  ];

  return (
    <section
      id="reviews"
      className="relative w-full py-16 bg-[#F9FBFF] overflow-hidden"
    >
      <img
        src={bigStarsBG}
        alt=""
        className="pointer-events-none select-none
                 absolute top-1/2 right-0 -translate-y-1/2
                 w-[300px] h-auto
                 z-20 opacity-90"
      />

      <div
        aria-hidden="true"
        className="absolute -left-24 -top-10 w-[420px] h-[420px]
                 z-0 bg-[#00B0DF]/15 rounded-full blur-[150px]"
      />

      {/* Content */}
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

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
