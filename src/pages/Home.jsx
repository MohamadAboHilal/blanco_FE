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
        {/* Container with proper responsive layout */}
        <div className="flex flex-col 2xl:flex-row items-center 2xl:items-stretch justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 2xl:py-0 2xl:mt-2 2xl:min-h-[380px]">
          {/* LEFT: Text Content */}
          <div className="flex flex-col items-center 2xl:items-start text-center 2xl:text-left w-full 2xl:max-w-xl order-1 2xl:order-1">
            {/* Main Title */}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-[64px] font-extrabold leading-tight text-[#FDC789] break-words whitespace-nowrap">
                {t("hero.title1")}
              </h1>
            </div>

            {/* Secondary Title with Highlighted Word */}
            {(() => {
              const title = t("hero.title2") || "";
              const parts = title.trim().split(/\s+/);
              const last = parts.pop() || "";
              const before = parts.join(" ");
              return (
                <h2
                  className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[44px] font-extrabold leading-tight text-[#00B0DF] whitespace-nowrap"
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

            {/* Subtitle with Highlighted Text */}
            {(() => {
              const sub = t("hero.sub");
              const hl = t("hero.highlight");
              const parts = sub.split(hl);
              return (
                <p
                  className={
                    `mt-6 text-slate-500 text-base sm:text-lg md:text-xl font-normal leading-relaxed whitespace-normal break-words text-center ` +
                    (dir === "rtl" ? "lg:text-right" : "lg:text-left")
                  }
                  dir={dir}
                >
                  {parts[0]}
                  <span className="text-[#00B0DF] font-semibold">{hl}</span>
                  {parts[1] ?? ""}
                </p>
              );
            })()}

            {/* Guarantee Section */}
            <div className="mt-8 flex items-center justify-center 2xl:justify-start gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-emerald-500 flex-shrink-0"
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
              <span className="text-lg sm:text-xl font-normal text-slate-900">
                {t("hero.guarantee")}
              </span>
            </div>

            {/* Call Button */}
            <a
              href={telHref}
              aria-label={`Call ${callNumber}`}
              className="mt-10 inline-flex items-center rounded-2xl gap-1 bg-[#DFF4FF] text-[#00B0DF] px-6 py-4 text-lg sm:text-xl font-bold hover:bg-[#CCE8FF] transition-colors duration-200"
            >
              {t("hero.call")}
              <LtrNum>&nbsp;{callNumber}</LtrNum>
            </a>
          </div>

          {/* RIGHT: Image */}
          <div className="w-full 2xl:w-auto flex justify-center items-end 2xl:justify-end 2xl:flex-col 2xl:h-full order-2 2xl:order-2">
            <img
              src={figures}
              alt="Figures"
              className="
                w-full h-auto object-contain
                max-w-[280px] 
                sm:max-w-[350px] 
                md:max-w-[450px] 
                lg:max-w-[500px] 
                xl:max-w-[550px] 
                2xl:max-w-[560px] 
                3xl:max-w-[640px]
                max-h-[300px]
                sm:max-h-[350px]
                md:max-h-[400px]
                lg:max-h-[450px]
                xl:max-h-[500px]
                2xl:max-h-[70vh]
                mx-auto 2xl:mx-0
                pt-4 2xl:pt-0
              "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
