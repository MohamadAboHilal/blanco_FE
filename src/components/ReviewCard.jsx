import React from "react";

export default function ReviewCard({ avatar, name, role, text, rating }) {
  return (
    <div
      className="
        w-full max-w-[422px] min-h-[180px] max-h-[220px]
        sm:max-w-full
        rounded-[20px] bg-white
        shadow-2xl shadow-black/5
        p-4 sm:p-6
        flex flex-col
      "
      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.1)", opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 min-w-0">
          <img src={avatar} alt={name} className="w-14 h-14 rounded-full" />
          <div className="min-w-0">
            <h4 className="font-semibold text-slate-900 text-lg truncate">
              {name}
            </h4>
            <p className="text-[#00B0DF] text-sm font-semibold truncate">
              {role}
            </p>
          </div>
        </div>
        <span
          className="flex items-center text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg"
          style={{ minWidth: 60, justifyContent: "center" }}
        >
          +{rating} <span style={{ fontSize: 18, marginLeft: 2 }}>★</span>
        </span>
      </div>

      {/* Body (3-line clamp to keep height tight) */}
      <p
        className="mt-3 text-slate-600 leading-relaxed text-[15px]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </p>
    </div>
  );
}
