import React from "react";

export default function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`collapse collapse-arrow transition-colors bg-base-200 ${
        isOpen ? "!bg-[#E5F9FF] !border !border-[#10AFDE]" : ""
      }`}
    >
      <input
        type="radio"
        name="faq-accordion"
        checked={isOpen}
        onChange={onToggle}
      />
      <div className="collapse-title text-lg sm:text-xl font-medium">{q}</div>
      <div className="collapse-content">
        <p className="leading-relaxed text-base-content/80">{a}</p>
      </div>
    </div>
  );
}
