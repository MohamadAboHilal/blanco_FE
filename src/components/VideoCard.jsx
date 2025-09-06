import React from "react";

export default function VideoCard({ thumb, title, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative w-full aspect-video overflow-hidden rounded-3xl
                 bg-white border border-white/60 shadow-2xl shadow-black/5 ring-1 ring-black/5
                 transition hover:shadow-black/10"
      aria-label={title || "Open video"}
    >
      <img
        src={thumb}
        alt={title || "Video thumbnail"}
        className="h-full w-full object-cover"
      />
      {/* Play button */}
      <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-slate-900">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
