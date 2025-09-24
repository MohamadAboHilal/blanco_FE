// FaqSection.jsx
import React, { useEffect, useMemo, useState } from "react";
import FaqItem from "../components/FaqItem";
import faqSymbol from "../assets/faqSymbol.svg";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { useHomeData } from "../contexts/HomeDataContext";

export default function FaqSection() {
  const { t } = useTranslation();
  const locale = useLocale();
  const { faqs: apiFaqs, loading, error } = useHomeData();

  // Map API -> UI shape
  const faqs = useMemo(
    () =>
      (apiFaqs ?? []).map((f) => ({
        id: f.id,
        q: f.question,
        a: f.answer,
      })),
    [apiFaqs]
  );

  // Open the first item after data arrives (or none: set to -1)
  const [openIndex, setOpenIndex] = useState(-1);
  useEffect(() => {
    if (faqs.length) setOpenIndex(0);
  }, [faqs.length]);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden mt-10 sm:mt-16 scroll-mt-[78px]"
    >
      {/* Decorative symbol */}
      <img
        src={faqSymbol}
        alt=""
        aria-hidden="true"
        className="pointer-events-none mt-8 select-none absolute left-1/2 -translate-x-1/2 sm:left-[45rem] sm:translate-x-0 bottom-[2rem] w-[90px] sm:w-[120px] md:w-[160px] lg:w-[200px] h-auto z-0 opacity-90"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Heading */}
          <div className="space-y-5 pt-4 flex justify-center lg:justify-start">
            <div className="flex items-start gap-3 w-full">
              <div className="w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight text-slate-900 text-center lg:text-left flex flex-col lg:flex-col ">
                  <span className="block">✨{t("faq.frequentlyAsked")}</span>
                  <span className="text-[#00B0DF] block pl-0 mt-2 lg:pl-12">
                    {t("faq.questions")}
                  </span>
                </h2>
                <p className="mt-3 text-[#061B2D] text-lg sm:text-xl md:text-lg font-bold text-center lg:text-left">
                  {t("faq.p1")} <br /> {t("faq.p2")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scrollable FAQ list */}
          <div className="w-full min-h-[320px] sm:min-h-[400px] md:min-h-[450px] max-h-[400px] sm:max-h-[520px] overflow-y-auto pr-1 sm:pr-2 space-y-3 sm:space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-400 text-base sm:text-lg">
                {t("common.loading") || "Loading…"}
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-600 text-base sm:text-lg">
                {t("common.failed") || "Failed to load FAQs."}
              </div>
            ) : faqs.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-base sm:text-lg">
                {t("faq.none") || "No FAQs available."}
              </div>
            ) : (
              faqs.map((item, i) => (
                <FaqItem
                  key={item.id ?? i}
                  q={item.q}
                  a={item.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(i)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
