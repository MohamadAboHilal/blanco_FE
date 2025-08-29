import React from "react";

export default function TipCard({ icon, title, highlight, text }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full w-96">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
          <img src={icon} alt="" className="w-6 h-6 object-contain" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-lg leading-snug">
            {title}{" "}
            {highlight && <span className="text-[#00B0DF]">{highlight}</span>}
          </h4>
          <p className="mt-2 text-slate-500 leading-relaxed text-lg ">{text}</p>
        </div>
      </div>
    </div>
  );
}
