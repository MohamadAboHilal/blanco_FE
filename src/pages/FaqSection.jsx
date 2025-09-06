import React, { useMemo, useState } from "react";
import FaqItem from "../components/FaqItem";
import faqSymbol from "../assets/faqSymbol.svg";

export default function FaqSection() {
  const faqs = [
    {
      q: "What Cleaning Product Do We Use ?",
      a: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets...",
      open: true,
    },
    {
      q: "Do you bring your own supplies?",
      a: "We bring all supplies, but we can use yours if you prefer.",
    },
    {
      q: "Do you offer green cleaning?",
      a: "Yes, we offer green cleaning upon request at no extra cost.",
    },
    {
      q: "Can I request a specific product?",
      a: "Absolutely. Let us know your preferred brand or fragrance.",
    },
    {
      q: "How often should I schedule cleaning?",
      a: "We recommend weekly or bi-weekly service for most households.",
    },
    {
      q: "What Cleaning Product Do We Use ?",
      a: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets...",
      open: true,
    },
    {
      q: "Do you bring your own supplies?",
      a: "We bring all supplies, but we can use yours if you prefer.",
    },
    {
      q: "Do you offer green cleaning?",
      a: "Yes, we offer green cleaning upon request at no extra cost.",
    },
    {
      q: "Can I request a specific product?",
      a: "Absolutely. Let us know your preferred brand or fragrance.",
    },
    {
      q: "How often should I schedule cleaning?",
      a: "We recommend weekly or bi-weekly service for most households.",
    },
    {
      q: "What Cleaning Product Do We Use ?",
      a: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets...",
      open: true,
    },
    {
      q: "Do you bring your own supplies?",
      a: "We bring all supplies, but we can use yours if you prefer.",
    },
    {
      q: "Do you offer green cleaning?",
      a: "Yes, we offer green cleaning upon request at no extra cost.",
    },
    {
      q: "Can I request a specific product?",
      a: "Absolutely. Let us know your preferred brand or fragrance.",
    },
    {
      q: "How often should I schedule cleaning?",
      a: "We recommend weekly or bi-weekly service for most households.",
    },
    {
      q: "What Cleaning Product Do We Use ?",
      a: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets...",
      open: true,
    },
    {
      q: "Do you bring your own supplies?",
      a: "We bring all supplies, but we can use yours if you prefer.",
    },
    {
      q: "Do you offer green cleaning?",
      a: "Yes, we offer green cleaning upon request at no extra cost.",
    },
    {
      q: "Can I request a specific product?",
      a: "Absolutely. Let us know your preferred brand or fragrance.",
    },
    {
      q: "How often should I schedule cleaning?",
      a: "We recommend weekly or bi-weekly service for most households.",
    },
  ];

  const initialIndex = useMemo(() => {
    const i = faqs.findIndex((f) => f.open);
    return i >= 0 ? i : 0;
  }, []);
  const [openIndex, setOpenIndex] = useState(initialIndex);

  return (
    <section className="relative isolate overflow-hidden mt-20">
      {/* Decorative symbol */}
      <img
        src={faqSymbol} // import faqSymbol from "../assets/faqSymbol.svg";
        alt=""
        aria-hidden="true"
        className="
        pointer-events-none select-none
        absolute left-[45rem] bottom-[2rem]
        w-[120px] md:w-[160px] lg:w-[200px] h-auto
        z-0 opacity-90
      "
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Heading */}
          <div className="space-y-5 pt-6 flex justify-center lg:justify-start">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="text-4xl md:text-4xl font-semibold leading-tight text-slate-900">
                  <span>✨Frequently Asked </span>
                  <span className="text-[#00B0DF]">Questions</span>
                </h2>
                <p className="mt-4 text-[#061B2D] text-xl md:text-lg font-bold">
                  Find Answers To Common Questions About <br /> Our Cleaning
                  Services.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scrollable FAQ list */}
          <div className="w-full min-h-[450px] max-h-[520px] overflow-y-auto pr-2 space-y-4">
            {faqs.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
