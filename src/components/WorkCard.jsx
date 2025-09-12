import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Portal from "./Portal";

export default function WorkCard({
  beforeSrc,
  afterSrc,
  alt = "before/after",
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  // ESC to close + lock body scroll while open
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
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
        onClick={handleOpen}
      >
        <div className="relative aspect-video bg-gray-100">
          <img
            src={beforeSrc}
            alt={alt}
            className="absolute inset-y-0 left-0 w-1/2 h-full object-cover"
          />
          <img
            src={afterSrc}
            alt={alt}
            className="absolute inset-y-0 left-1/2 w-1/2 h-full object-cover"
          />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/70" />

          {/* Pills */}
          <div className="absolute inset-0 flex justify-between items-end px-4 pb-3">
            <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-600 text-xs font-semibold shadow">
              {t("work.before")}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-600 text-xs font-semibold shadow">
              {t("work.after")}
            </span>
          </div>
        </div>
      </div>

      {/* MODAL via Portal */}
      {open && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <button
              aria-label="Close"
              onClick={handleClose}
              className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm"
            />
            {/* Dialog */}
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-[92vw] max-w-6xl aspect-video rounded-2xl overflow-hidden bg-white shadow-2xl"
            >
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <span className="sr-only">Close</span>✕
              </button>

              <figure className="diff w-full h-full">
                <div className="diff-item-1" role="img">
                  <img src={beforeSrc} alt={`${alt} before`} />
                </div>
                <div className="diff-item-2" role="img">
                  <img src={afterSrc} alt={`${alt} after`} />
                </div>
                <div className="diff-resizer" />
              </figure>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
