import React from "react";

export default function TipCard({ icon, title, highlight, text }) {
  return (
    <div
      className="
        w-[404px] h-[179px] rounded-[15px]
        bg-white border border-slate-200/70

        p-[13px] flex
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
