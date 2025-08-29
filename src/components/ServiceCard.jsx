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
      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-3xl shadow-2xl shadow-black/5 p-6 lg:p-8 border border-white/60"
    >
      {/* Badge */}
      {badgeText && (
        <span
          className={`inline-block text-sm font-semibold px-3 py-1 rounded-md ${badgeClass}`}
        >
          {badgeText}
        </span>
      )}

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>

      {/* Description */}
      <p className="mt-3 text-slate-500 leading-relaxed text-lg">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="mt-5 space-y-1 list-disc list-inside">
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
