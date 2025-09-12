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
      className="relative isolate overflow-hidden mt-20 scroll-mt-[78px]"
    >
      {/* Decorative symbol */}
      <img
        src={faqSymbol}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[45rem] bottom-[2rem] w-[120px] md:w-[160px] lg:w-[200px] h-auto z-0 opacity-90"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Heading */}
          <div className="space-y-5 pt-6 flex justify-center lg:justify-start">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="text-4xl md:text-4xl font-semibold leading-tight text-slate-900">
                  <span>✨{t("faq.frequentlyAsked")} </span>
                  <span className="text-[#00B0DF]">{t("faq.questions")}</span>
                </h2>
                <p className="mt-4 text-[#061B2D] text-xl md:text-lg font-bold">
                  {t("faq.p1")} <br /> {t("faq.p2")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scrollable FAQ list */}
          <div className="w-full min-h-[450px] max-h-[520px] overflow-y-auto pr-2 space-y-4">
            {loading ? (
              <div className="py-8 text-center text-slate-400">
                {t("common.loading") || "Loading…"}
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-600">
                {t("common.failed") || "Failed to load FAQs."}
              </div>
            ) : faqs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
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
