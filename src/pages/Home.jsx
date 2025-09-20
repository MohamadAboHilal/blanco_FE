import React, { useEffect, useMemo, useState } from "react";
import figures from "../assets/figures2.png";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";

const LtrNum = ({ children }) => (
  <bdi dir="ltr" className="inline-block tabular-nums">
    {children}
  </bdi>
);

function Home() {
  const { t } = useTranslation();
  const { dir } = useLocale();

  const [contact, setContact] = useState(null);

  // Fetch contact data once (ignore AbortError from StrictMode/unmount)
  useEffect(() => {
    const ctrl = new AbortController();
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("https://api.blancoone.com/api/contact_data", {
          headers: { Accept: "application/json" },
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setContact(data);
      } catch (e) {
        if (e.name !== "AbortError") console.error("contact_data fetch:", e);
      }
    })();

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  // Number + tel: href
  const callNumber = contact?.call_number || "(+963) 999 222 111";
  const telHref = useMemo(
    () => `tel:${callNumber.replace(/[^\d+]/g, "")}`,
    [callNumber]
  );

  return (
    <>
      <div
        id="main-container"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.15)" }}
        className="w-auto bg-[#EEF5FF] flex flex-col rounded-[10px] max-w-auto mx-auto transition-colors duration-300"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 px-6 lg:px-20 mt-2">
          {/* LEFT SIDE (text) */}
          <div className="flex flex-col items-start max-w-xl w-full">
            {/* Top line with star and big peach title */}
            <div className="flex items-center gap-3">
              <h1 className="whitespace-nowrap text-[36px] md:text-[56px] lg:text-[64px] font-extrabold leading-tight text-[#FDC789]">
                {t("hero.title1")}
              </h1>
            </div>

            {/* “Make It Sparkle” — last word in a pill (works for Arabic too) */}
            {(() => {
              const title = t("hero.title2") || "";
              const parts = title.trim().split(/\s+/);
              const last = parts.pop() || "";
              const before = parts.join(" ");

              return (
                <h2
                  className="mt-4 text-[34px] md:text-[44px] font-extrabold leading-tight text-[#00B0DF] whitespace-nowrap"
                  dir="auto"
                >
                  {before && <span className="align-middle">{before}</span>}
                  {before && " "}
                  <span className="inline-block align-middle rounded-xl bg-[#00B0DF] text-white px-3 py-1">
                    {last}
                  </span>
                </h2>
              );
            })()}

            {/* Sub text with the highlighted phrase in brand blue */}
            {(() => {
              const sub = t("hero.sub");
              const hl = t("hero.highlight");
              const parts = sub.split(hl);
              return (
                <p className="mt-6 text-slate-500 text-lg md:text-xl font-normal leading-8">
                  {parts[0]}
                  <span className="text-[#00B0DF] font-semibold">{hl}</span>
                  {parts[1] ?? ""}
                </p>
              );
            })()}

            {/* Guarantee row */}
            <div className="mt-8 flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M8 12l2.5 2.5L16 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-normal text-slate-900">
                {t("hero.guarantee")}
              </span>
            </div>

            {/* Call button */}
            <a
              href={telHref}
              aria-label={`Call ${callNumber}`}
              className="mt-10 inline-flex items-center rounded-2xl gap-1
               bg-[#DFF4FF] text-[#00B0DF] px-6 py-4 text-xl font-bold"
            >
              {t("hero.call")}
              <LtrNum>&nbsp;{callNumber}</LtrNum>
            </a>
          </div>

          {/* RIGHT SIDE (image) */}
          <div className="flex-1 flex justify-end items-center">
            <img
              src={figures}
              alt="Figures"
              className="max-h-[80vh] object-contain ml-0 lg:ml-20"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
