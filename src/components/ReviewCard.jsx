import React from "react";

export default function ReviewCard({ avatar, name, role, text, rating }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-7 lg:p-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={avatar} alt={name} className="w-14 h-14 rounded-full" />
          <div>
            <h4 className="font-semibold text-slate-900 text-lg">{name}</h4>
            <p className="text-[#00B0DF] text-sm font-semibold">{role}</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
          +{rating} ★
        </span>
      </div>

      {/* Body */}
      <p className="mt-4 text-slate-600 leading-relaxed text-[15px]">{text}</p>
    </div>
  );
}
