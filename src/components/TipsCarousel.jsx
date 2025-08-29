import React, { useRef, useEffect, useMemo } from "react";
import TipCard from "./TipCard";

// Helper to chunk array into pages of 6
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function TipsCarousel({ tips = [] }) {
  const carouselRef = useRef(null);

  // Split tips into pages of 6 (3x2)
  const pages = useMemo(() => chunkArray(tips, 6), [tips]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 6,
        behavior: "smooth",
      });
    };

    const onMouseEnter = () => {
      el.focus();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!pages.length) return null;

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        tabIndex={0}
        className="carousel w-full overflow-x-auto scroll-smooth focus:outline-none"
        style={{ outline: "none", height: "320px" }}
      >
        <div className="flex" style={{ minWidth: "100%" }}>
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="flex-none px-2"
              style={{ width: "100%" }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full">
                {page.map((t, i) =>
                  t ? (
                    <TipCard key={i} {...t} />
                  ) : (
                    <div key={i} className="rounded-2xl" />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
