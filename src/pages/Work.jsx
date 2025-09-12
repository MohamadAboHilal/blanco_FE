// Work.jsx
import React, { useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import WorkCard from "../components/WorkCard";
import VideoCard from "../components/VideoCard";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

function SlideCard({ g }) {
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

function RowEmbla({ items, dir }) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps",
    direction: dir,
  });

  return (
    <div className="overflow-hidden" ref={emblaRef} dir={dir}>
      <div
        className="flex gap-[var(--work-gap)]"
        style={{ "--work-gap": "2.5rem" }}
      >
        {items.map((g) => (
          <div
            key={g.id}
            className="flex-none w-[320px] sm:w-[360px] md:w-[380px]"
          >
            <SlideCard g={g} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { galleries, loading, error } = useHomeData();

  const [filter, setFilter] = useState("all"); // 'all' | 'beforeAfter' | 'video'

  // split once for the two-row ALL view (even/odd keeps order but distributes rows)
  const [topRow, bottomRow] = useMemo(() => {
    const a = [],
      b = [];
    (galleries ?? []).forEach((g, i) => (i % 2 === 0 ? a : b).push(g));
    return [a, b];
  }, [galleries]);

  const pillBase =
    "px-8 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500";
  const activeClass = "bg-sky-500 text-white shadow";
  const inactiveClass = "text-gray-600";

  return (
    <div className="w-full min-h-[65vh] flex flex-col items-center justify-center space-y-10">
      {/* Heading + Subtitle + Tabs */}
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
          <span className="inline-block text-yellow-400 mr-2">✨</span>
          {t("work.our")} <span className="text-sky-500">{t("work.work")}</span>{" "}
          {t("work.gallery")}
        </h2>
        <p className="text-gray-600 font-semibold text-xl">
          {t("work.description")}
        </p>

        {/* Pills */}
        <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-sm gap-4">
          <button
            className={`${pillBase} ${
              filter === "all" ? activeClass : inactiveClass
            }`}
            onClick={() => setFilter("all")}
          >
            {t("work.all")}
          </button>
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
      <div className="w-full flex flex-col items-center space-y-10">
        {loading ? (
          <div className="w-full max-w-7xl grid place-items-center text-slate-400 h-[50vh]">
            {t("common.loading") || "Loading…"}
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">
            {t("common.failed") || "Failed to load gallery."}
          </div>
        ) : galleries?.length ? (
          <>
            {/* ALL: two Embla rows, horizontal drag/scroll, no buttons */}
            {filter === "all" && (
              <div className="w-full max-w-7xl space-y-10 select-none">
                <RowEmbla items={topRow} dir={dir} />
                <RowEmbla items={bottomRow} dir={dir} />
              </div>
            )}

            {/* BEFORE & AFTER: grid of WorkCard */}
            {filter === "beforeAfter" && (
              <div className="w-full max-w-7xl">
                <div
                  className="grid [grid-template-columns:repeat(auto-fill,minmax(360px,1fr))] gap-[var(--work-gap)]"
                  style={{ "--work-gap": "2.5rem" }}
                >
                  {galleries
                    .filter(
                      (g) =>
                        g.type === "image" && g.before_image && g.after_image
                    )
                    .map((g) => (
                      <WorkCard
                        key={g.id}
                        beforeSrc={g.before_image}
                        afterSrc={g.after_image}
                        alt={`gallery-${g.id}`}
                      />
                    ))}
                </div>
                {galleries.filter((g) => g.type === "image").length === 0 && (
                  <div className="p-6 text-center text-slate-500">
                    {t("work.noImages") || "No before/after items available."}
                  </div>
                )}
              </div>
            )}

            {/* VIDEO: grid of VideoCard */}
            {filter === "video" && (
              <div className="w-full max-w-7xl">
                <div
                  className="grid [grid-template-columns:repeat(auto-fill,minmax(360px,1fr))] gap-[var(--work-gap)]"
                  style={{ "--work-gap": "2.5rem" }}
                >
                  {galleries
                    .filter((g) => g.type === "video" && g.video)
                    .map((g) => (
                      <VideoCard
                        key={g.id}
                        src={g.video}
                        poster={g.video_thumbnail || undefined}
                        title={`video-${g.id}`}
                      />
                    ))}
                </div>
                {galleries.filter((g) => g.type === "video").length === 0 && (
                  <div className="p-6 text-center text-slate-500">
                    {t("work.noVideos") || "No videos available."}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center text-slate-500">
            {t("work.none") || "No gallery items yet."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Work;
