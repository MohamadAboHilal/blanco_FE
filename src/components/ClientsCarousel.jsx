import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ClientsCarousel({ logos = [] }) {
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const node = emblaRef.current;
    const plugin = autoplay.current;
    const onEnter = () => plugin.stop();
    const onLeave = () => plugin.play();
    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);
    return () => {
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
    };
  }, [emblaApi, emblaRef]);

  return (
    <div className="relative px-6 md:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {logos.map((src, i) => (
            <div
              key={i}
              className="
                flex-none flex items-center justify-center
                basis-1/2 xs:basis-1/3 sm:basis-1/5 lg:basis-1/6
              "
            >
              <img
                src={src}
                alt={`client-${i}`}
                className="h-10 md:h-12 w-auto object-contain select-none"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
