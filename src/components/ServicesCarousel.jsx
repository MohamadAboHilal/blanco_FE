import React, { useRef, useEffect } from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesCarousel({ services }) {
  const carouselRef = useRef(null);

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

    // Add mouse enter/leave handlers for better UX
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

  return (
    <>
      <div
        ref={carouselRef}
        tabIndex={0}
        className="carousel w-full overflow-x-auto scroll-smooth focus:outline-none"
        style={{ outline: "none" }}
      >
        {services.map((service, idx) => (
          <div key={idx} className="carousel-item basis-1/4 flex-none px-3">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </>
  );
}
