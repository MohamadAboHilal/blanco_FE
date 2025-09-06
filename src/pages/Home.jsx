import figures from "../assets/Figures.png";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

function Home() {
  const { t } = useTranslation();
  const { dir } = useLocale();
  const number = "(+963) 999 222 111";

  return (
    <>
      <div
        id="main-container"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.15)" }}
        className="w-auto bg-[#EEF5FF] flex flex-col rounded-[10px] overflow-hidden max-w-auto mx-auto transition-colors duration-300"
      >
        {/* stack on mobile, side-by-side on large */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 px-6 lg:px-20 mt-2">
          {/* LEFT SIDE (text) */}
          <div className="flex flex-col items-start max-w-xl w-full">
            <div className="flex items-center gap-3">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tight"
                style={{ color: "#F9C48F" }}
              >
                {t("hero.title1")}
              </h1>
            </div>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              <span className="">{t("hero.title2")}</span>
            </h2>

            <p className="mt-6 text-slate-500 text-lg md:text-xl font-normal">
              <span className="text-[#00B0DF]">{t("hero.sub")}</span>
            </p>

            <div className="mt-8 flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-emerald-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M8 12l2.5 2.5L16 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-medium text-slate-900">
                {t("hero.guarantee")}
              </span>
            </div>

            {/* CALL BUTTON — now under the text */}
            <a
              href="tel:+963999222111"
              aria-label={`Call ${number}`}
              className="mt-10 inline-flex items-center gap-3 rounded-2xl
                         bg-[#DFF4FF] text-[#00B0DF] px-6 py-4 text-xl font-bold
                         ring-1 ring-cyan-100 hover:shadow-cyan-300/60 transition"
            >
              {t("hero.call")} <span dir="ltr"> {number}</span>
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
