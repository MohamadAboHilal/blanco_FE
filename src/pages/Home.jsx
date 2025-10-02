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
        {/* Column below lg, row at lg+ (text left, image right) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 2xl:py-0 2xl:mt-2 2xl:min-h-[380px]">
          {/* LEFT at lg+: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-xl order-1 lg:order-1">
            {/* Main Title – scales 2xl -> xl -> lg */}
            <div className="flex items-center gap-3">
              <h1
                className="font-extrabold leading-tight text-[#FDC789] 
                text-3xl sm:text-4xl md:text-5xl
                lg:text-4xl lg:text-nowrap
                xl:text-5xl
                2xl:text-[64px]"
              >
                {t("hero.title1")}
              </h1>
            </div>

            {/* Secondary Title with last word highlighted */}
            {(() => {
              const title = t("hero.title2") || "";
              const parts = title.trim().split(/\s+/);
              const last = parts.pop() || "";
              const before = parts.join(" ");
              return (
                <h2
                  className="mt-4 font-extrabold leading-tight text-[#00B0DF]
                    text-2xl sm:text-3xl md:text-4xl
                    lg:text-3xl
                    xl:text-4xl
                    2xl:text-[44px]"
                  dir="auto"
                >
                  {before && <span className="align-middle">{before}</span>}
                  {before && " "}
                  <span className="inline-block align-middle rounded-xl bg-[#00B0DF] text-white px-3 py-3">
                    {last}
                  </span>
                </h2>
              );
            })()}

            {/* Subtitle with highlighted segment */}
            {(() => {
              const sub = t("hero.sub");
              const hl = t("hero.highlight");
              const parts = sub.split(hl);
              return (
                <p
                  className={
                    `mt-6 text-slate-500 font-normal leading-relaxed whitespace-normal break-words text-center ` +
                    (dir === "rtl" ? "lg:text-right" : "lg:text-left") +
                    " text-base sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-xl"
                  }
                  dir={dir}
                >
                  {parts[0]}
                  <span className="text-[#00B0DF] font-semibold">{hl}</span>
                  {parts[1] ?? ""}
                </p>
              );
            })()}

            {/* Guarantee */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <svg
                viewBox="0 0 24 24"
                className="
      h-5 w-5
      lg:h-4 lg:w-4
      xl:h-4 xl:w-4
      2xl:h-6 2xl:w-6
      text-emerald-500 flex-shrink-0
    "
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

              <span
                className="
      text-base
      lg:text-base
      xl:text-l
      2xl:text-xl
      font-normal text-slate-900
    "
              >
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

          {/* RIGHT at lg+: Image */}
          <div className="pt-32 w-full lg:w-auto flex justify-center items-end lg:justify-end lg:flex-col lg:h-full order-2 lg:order-2">
            <img
              src={figures}
              alt="Figures"
              className="
                 h-auto object-contain mx-auto lg:mx-0  lg:pt-0
                max-h-[320px] sm:max-h-[360px] md:max-h-[400px]
                lg:max-h-[420px] xl:max-h-[480px] 2xl:max-h-[520px]
                max-w-[280px] sm:max-w-[340px] md:max-w-[420px]
                lg:max-w-[440px] xl:max-w-[500px] 2xl:max-w-[560px]
              "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
