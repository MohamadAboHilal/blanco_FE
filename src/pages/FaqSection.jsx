import React, { useMemo, useState } from "react";
import FaqItem from "../components/FaqItem";
import FaqPic from "../assets/FaqPic.png";

export default function FaqSection() {
  const faqs = [
    {
      q: "What Cleaning Product Do We Use ?",
      a: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets. All our products are professionally-grade and EPA approved. We can also accommodate specific product preferences upon request.",
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
  ];

  // start with the one marked `open: true`, otherwise 0
  const initialIndex = useMemo(() => {
    const i = faqs.findIndex((f) => f.open);
    return i >= 0 ? i : 0;
  }, []);
  const [openIndex, setOpenIndex] = useState(initialIndex);

  return (
    <section className="relative overflow-hidden bg-base-100 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: FAQ Image */}
          <div className="space-y-5 pt-6 flex justify-center lg:justify-start">
            <img
              src={FaqPic}
              alt="Frequently Asked Questions"
              className="max-w-md w-full h-auto"
            />
          </div>

          {/* Right: Accordion */}
          <div className="w-full space-y-4 min-h-[450px]">
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
