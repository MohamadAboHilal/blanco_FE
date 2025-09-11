// Work.jsx
import React, { useState } from "react";
import WorkCard from "../components/WorkCard";
import VideoCard from "../components/VideoCard";
import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

function Work() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const [filter, setFilter] = useState("all"); // 'all' | 'beforeAfter' | 'video'

  const pillBase =
    "px-8 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500 ";
  const activeClass = "bg-sky-500 text-white shadow";
  const inactiveClass = "text-gray-600";

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-8">
      {/* Heading + Subtitle + Tabs */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
          <span className="inline-block text-yellow-400 mr-2">✨</span>
          {t("work.our")} <span className="text-sky-500">{t("work.work")}</span>{" "}
          {t("work.gallery")}
        </h2>
        <p className="mt-4 text-gray-600 font-semibold text-xl">
          {t("work.description")}
        </p>

        {/* Pills */}
        <div className="mt-6 inline-flex rounded-xl bg-gray-100 p-1 shadow-sm gap-4">
          <button
            className={`${pillBase} ${
              filter === "all" ? activeClass : inactiveClass
            }`}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t("work.all")}
          </button>
          <button
            className={`${pillBase} ${
              filter === "beforeAfter" ? activeClass : inactiveClass
            }`}
            aria-pressed={filter === "beforeAfter"}
            onClick={() => setFilter("beforeAfter")}
          >
            {t("work.beforeAfter")}
          </button>
          <button
            className={`${pillBase} ${
              filter === "video" ? activeClass : inactiveClass
            }`}
            aria-pressed={filter === "video"}
            onClick={() => setFilter("video")}
          >
            {t("work.video")}
          </button>
        </div>
      </div>

      {/* BEFORE & AFTER CARDS */}
      <div className="w-full max-w-7xl h-[50vh] overflow-y-auto">
        {(filter === "all" || filter === "beforeAfter") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkCard
              beforeSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
              afterSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
              alt="daisy"
            />
            <WorkCard
              beforeSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
              afterSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
              alt="daisy"
            />
            <WorkCard
              beforeSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
              afterSrc="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
              alt="daisy"
            />
          </div>
        )}

        {/* VIDEO CARDS */}
        {(filter === "all" || filter === "video") && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 first:mt-0">
            <VideoCard
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            />
            <VideoCard
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            />
            <VideoCard
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Work;
