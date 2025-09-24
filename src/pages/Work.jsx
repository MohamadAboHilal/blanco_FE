// Work.jsx
import React, { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import WorkCard from "../components/WorkCard";
import VideoCard from "../components/VideoCard";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

function SlideCard({ g }) {
  if (!g) return null;
  if (g.type === "image" && g.before_image && g.after_image) {
    return (
      <WorkCard
        beforeSrc={g.before_image}
        afterSrc={g.after_image}
        alt={`gallery-${g.id}`}
      />
    );
  }
  if (g.type === "video" && g.video) {
    return (
      <VideoCard
        src={g.video}
        poster={g.video_thumbnail || undefined}
        title={`video-${g.id}`}
      />
    );
  }
  return null;
}

// Pack items so each slide shows 2 rows (top/bottom)
function toColumns(items) {
  const cols = [];
  for (let i = 0; i < items.length; i += 2) {
    cols.push([items[i], items[i + 1] || null]);
  }
  return cols;
}

export default function Work() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { galleries, loading, error } = useHomeData();

  const [filter, setFilter] = useState("beforeAfter"); // 'beforeAfter' | 'video'

  const filtered = useMemo(() => {
    const all = galleries ?? [];
    if (filter === "beforeAfter") {
      return all.filter(
        (g) => g.type === "image" && g.before_image && g.after_image
      );
    }
    if (filter === "video") {
      return all.filter((g) => g.type === "video" && g.video);
    }
    return [];
  }, [galleries, filter]);

  const columns = useMemo(() => toColumns(filtered), [filtered]);

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "center",
    containScroll: "trimSnaps",
    direction: dir,
  });

  // 🔽 make pill paddings responsive (smaller on mobile)
  const pillBase =
    "px-5 sm:px-6 md:px-8 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500";
  const activeClass = "bg-sky-500 text-white shadow";
  const inactiveClass = "text-gray-600";

  return (
    <div className="w-full min-h-[65vh] flex flex-col items-center justify-center space-y-8 md:space-y-10">
      {/* Heading + Subtitle + Tabs */}
      <div className="flex flex-col items-center space-y-4 md:space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center">
          <span className="inline-block text-yellow-400 mr-2">✨</span>
          {t("work.our")} <span className="text-sky-500">{t("work.work")}</span>{" "}
          {t("work.gallery")}
        </h2>

        {/* 🔽 smaller text + nicer line-height on mobile */}
        <p className="text-base sm:text-lg md:text-xl leading-snug text-gray-600 font-semibold text-center px-4">
          {t("work.description")}
        </p>

        <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-sm gap-3 sm:gap-4">
          <button
            className={`${pillBase} ${
              filter === "beforeAfter" ? activeClass : inactiveClass
            }`}
            onClick={() => setFilter("beforeAfter")}
          >
            {t("work.beforeAfter")}
          </button>
          <button
            className={`${pillBase} ${
              filter === "video" ? activeClass : inactiveClass
            }`}
            onClick={() => setFilter("video")}
          >
            {t("work.video")}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center space-y-8 md:space-y-10">
        {loading ? (
          <div className="w-full max-w-7xl grid place-items-center text-slate-400 h-[50vh]">
            {t("common.loading") || "Loading…"}
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            {t("common.failed") || "Failed to load gallery."}
          </div>
        ) : filtered.length ? (
          // 🔽 make the gap responsive here (smaller on mobile)
          <div className="w-full max-w-7xl select-none [--work-gap:1rem] sm:[--work-gap:1.25rem] md:[--work-gap:0.75rem] lg:[--work-gap:0.75rem] xl:[--work-gap:0.75rem]">
            {/* Embla viewport */}
            <div
              className="overflow-hidden px-3 sm:px-4"
              ref={emblaRef}
              dir={dir}
            >
              {/* Track: each slide is a vertical column of two cards */}
              <div className="flex gap-[var(--work-gap)] justify-start">
                {columns.map((col, idx) => (
                  <div
                    key={idx}
                    // 🔽 1 column per view on small/medium, multi on large
                    className="flex-none w-full max-w-xs md:w-[380px] md:max-w-none md:basis-auto"
                  >
                    <div className="flex flex-col gap-[var(--work-gap)]">
                      <SlideCard g={col[0]} />
                      <SlideCard g={col[1]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500">
            {filter === "beforeAfter"
              ? t("work.noImages") || "No before/after items available."
              : filter === "video"
              ? t("work.noVideos") || "No videos available."
              : t("work.none") || "No gallery items yet."}
          </div>
        )}
      </div>
    </div>
  );
}
