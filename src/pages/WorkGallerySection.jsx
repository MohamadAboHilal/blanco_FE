import React, { useEffect, useMemo, useState } from "react";
import VideoCard from "../components/VideoCard";
import BeforeAfterCard from "../components/BeforeAfterCard";

export default function WorkGallerySection() {
  const [filter, setFilter] = useState("all"); // "all" | "beforeAfter" | "video"
  const [modal, setModal] = useState(null); // {type:"video", src} | {type:"diff", before, after}

  // Demo data — replace with your actual assets
  const videos = useMemo(
    () => [
      {
        thumb:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
        src: "/videos/livingroom.mp4",
      },
      {
        thumb:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
        src: "/videos/sofa.mp4",
      },
      {
        thumb:
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
        src: "/videos/carpet.mp4",
      },
    ],
    []
  );

  const beforeAfter = useMemo(
    () => [
      {
        before:
          "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop",
        after:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      },
      {
        before:
          "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1200&auto=format&fit=crop",
        after:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      },
      {
        before:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
        after:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    []
  );

  const showVideos = filter === "all" || filter === "video";
  const showBA = filter === "all" || filter === "beforeAfter";

  // ESC to close modal
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <section id="gallery" className="relative w-full py-16 bg-[#F9FBFF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ Our <span className="text-[#00B0DF]">Work</span> Gallery
          </h2>
          <p className="mt-3 text-slate-600 text-lg md:text-xl font-semibold">
            See the transformation – before and after photos & videos
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          <FilterPill
            label="All Work"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterPill
            label="Before & After"
            active={filter === "beforeAfter"}
            onClick={() => setFilter("beforeAfter")}
          />
          <FilterPill
            label="Video"
            active={filter === "video"}
            onClick={() => setFilter("video")}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showVideos &&
            videos.map((v, i) => (
              <VideoCard
                key={`v-${i}`}
                thumb={v.thumb}
                onOpen={() => setModal({ type: "video", src: v.src })}
              />
            ))}

          {showBA &&
            beforeAfter.map((b, i) => (
              <BeforeAfterCard
                key={`b-${i}`}
                before={b.before}
                after={b.after}
                onOpen={() =>
                  setModal({ type: "diff", before: b.before, after: b.after })
                }
                onHoverOpen={() =>
                  setModal({ type: "diff", before: b.before, after: b.after })
                }
              />
            ))}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-[101] isolate w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modal.type === "video" && (
              <div className="aspect-video w-full bg-black">
                <video
                  src={modal.src}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            {modal.type === "diff" && (
              <div className="p-3 md:p-4">
                {/* create local stacking context */}
                <div className="isolate">
                  <figure className="diff aspect-video w-full" tabIndex={0}>
                    <div className="diff-item-1" role="img" tabIndex={0}>
                      <img
                        src={modal.before}
                        alt="Before"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="diff-item-2" role="img">
                      <img
                        src={modal.after}
                        alt="After"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="diff-resizer"></div>
                  </figure>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition",
        active
          ? "bg-[#00B0DF] text-white"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
