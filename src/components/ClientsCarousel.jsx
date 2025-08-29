import React, { useEffect, useRef, useState, useCallback } from "react";

export default function ClientsCarousel({ logos = [] }) {
  const ref = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) === 0) return;
      // convert vertical wheel to horizontal
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 6, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const page = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* scroll area */}
      <div
        ref={ref}
        className="carousel w-full overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar px-12"
      >
        <div className="carousel-item flex gap-16">
          {logos.map((src, i) => (
            <div key={i} className="flex-none">
              <img
                src={src}
                alt={`client-${i}`}
                className="h-10 md:h-12 w-auto object-contain"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
