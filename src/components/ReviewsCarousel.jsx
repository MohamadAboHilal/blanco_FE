import React, { useRef, useEffect } from "react";
import ReviewCard from "./ReviewCard";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ReviewsCarousel({ reviews = [] }) {
  const carouselRef = useRef(null);

  // Split reviews into pages of 4 (2x2)
  const pages = chunkArray(reviews, 4);

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

  // Each page is 2 columns wide, so scroll by the width of one page
  const scrollByPage = () => {
    const el = carouselRef.current;
    if (el) {
      const pageWidth = el.offsetWidth;
      return pageWidth;
    }
    return 1000;
  };

  return (
    <>
      <div
        ref={carouselRef}
        tabIndex={0}
        className="carousel w-full overflow-x-auto scroll-smooth focus:outline-none"
        style={{ outline: "none", height: "480px" }}
      >
        <div className="flex" style={{ minWidth: "100%" }}>
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="flex-none px-3"
              style={{ width: "100%" }}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
                {page.map((review, idx) => (
                  <ReviewCard key={idx} {...review} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
