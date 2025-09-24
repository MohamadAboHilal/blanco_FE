import React from "react";

export default function TipCard({ icon, title, highlight, text }) {
  return (
    <div
      className="
        w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
        h-[160px] sm:h-[179px] rounded-[15px]
        bg-white border border-slate-200/70
        p-3 flex
      "
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
          <img src={icon} alt="" className="w-6 h-6 object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 text-lg leading-snug">
            {title}{" "}
            {highlight && <span className="text-[#00B0DF]">{highlight}</span>}
          </h4>
          <p className="mt-2 text-slate-500 leading-relaxed text-[15px]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
