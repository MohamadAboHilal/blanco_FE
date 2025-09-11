// WorkCard.jsx
import React, { useEffect, useState, useCallback } from "react";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

export default function WorkCard({
  beforeSrc,
  afterSrc,
  alt = "before/after",
}) {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  // Close on ESC + lock scroll when open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
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
        className="relative w-96 max-w-3xl rounded-2xl overflow-hidden cursor-pointer"
        onClick={handleOpen}
      >
        {/* 50/50 Preview */}
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
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/70"></div>

          {/* Pills */}
          <div className="absolute inset-0 flex justify-between items-end px-6 pb-4">
            <span className="px-3 py-1 rounded-lg bg-sky-100 text-sky-600 text-sm font-semibold shadow">
              {t("work.before")}
            </span>
            <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-sm font-semibold shadow">
              {t("work.after")}
            </span>
          </div>
        </div>
      </div>

      {/* MODAL (click to close) */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop (click to close) */}
          <button
            aria-label="Close"
            onClick={handleClose}
            className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-md"
          />

          {/* Centered modal */}
          <div className="relative w-[92vw] max-w-7xl max-h-[85vh] aspect-video rounded-2xl overflow-hidden bg-white shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span className="sr-only">Close</span>✕
            </button>

            {/* Diff figure */}
            <figure className="diff w-full h-full">
              <div className="diff-item-1" role="img">
                <img src={beforeSrc} alt={`${alt} before`} />
              </div>
              <div className="diff-item-2" role="img">
                <img src={afterSrc} alt={`${alt} after`} />
              </div>
              <div className="diff-resizer"></div>
            </figure>
          </div>
        </div>
      )}
    </>
  );
}
