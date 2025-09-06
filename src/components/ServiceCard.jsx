import React from "react";

export default function ServiceCard({
  badgeText,
  badgeClass = "bg-blue-100 text-blue-700",
  title,
  description,
  features = [],
}) {
  return (
    <div
      className="
        w-[291px] h-[400px]
        bg-white rounded-3xl border border-white/60
        shadow-2xl shadow-black/5
        p-6 lg:p-8
        flex flex-col
      "
      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.1)", opacity: 1 }}
    >
      <div>
        {badgeText && (
          <span
            className={`inline-block text-sm font-semibold px-3 py-1 rounded-md ${badgeClass}`}
          >
            {badgeText}
          </span>
        )}

        <h3
          className="mt-4 text-2xl font-bold text-slate-900"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </h3>

        <p
          className="mt-3 text-slate-500 leading-relaxed text-lg"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>

      {features.length > 0 && (
        <ul className="mt-auto pt-4 space-y-1 list-disc list-inside">
          {features.map((f, i) => (
            <li key={i} className="font-semibold text-slate-900">
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
