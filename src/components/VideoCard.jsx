import React, { useEffect, useState, useCallback } from "react";

export default function VideoCard({
  src, // video source (mp4/webm/ogg)
  poster, // preview image shown on the card
  autoPlay = true, // autoplay when modal opens
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  // Close on ESC + lock scroll when open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  return (
    <>
      {/* CARD (click to open) */}
      <div
        className="relative w-96 max-w-3xl rounded-2xl overflow-hidden transition cursor-pointer"
        onClick={handleOpen}
        aria-label={`Open player`}
      >
        {/* Poster preview */}
        <div className="relative aspect-video bg-gray-100">
          {poster ? (
            <img
              src={poster}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-400">
              No poster
            </div>
          )}

          {/* Play button */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-full h-16 w-16 bg-white/90 shadow-lg grid place-items-center">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL (click to close) */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={handleClose}
            className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-md"
          />

          {/* Player container */}
          <div className="relative w-[92vw] max-w-6xl max-h-[85vh] aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span className="sr-only">Close</span>✕
            </button>

            {/* HTML5 Video Player */}
            <video
              src={src}
              poster={poster}
              controls
              autoPlay={autoPlay}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
