import ReactCountryFlag from "react-country-flag";

export default function PhonePrefixDropdown({
  value,
  onChange,
  options,
  rtl = false,
}) {
  const current = options.find((o) => o.dial === value) || options[0];

  return (
    <div
      className={`dropdown ${rtl ? "dropdown-end" : ""}`}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Trigger */}
      <div
        tabIndex={0}
        role="button"
        className={`btn h-10 min-h-10 rounded-xl bg-[#F9FBFF] text-slate-700
                    border border-slate-200 px-3 gap-2`}
      >
        <ReactCountryFlag
          countryCode={current.cc}
          svg
          style={{ width: "1.15rem", height: "1.15rem", borderRadius: "2px" }}
          aria-label={`${current.label} flag`}
        />
        {/* keep the dial LTR even in Arabic */}
        <bdi dir="ltr" className="font-medium">
          {current.dial}
        </bdi>

        {/* mirror the chevron in RTL */}
        <svg
          className="w-4 h-4 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          style={rtl ? { transform: "scaleX(-1)" } : undefined}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Menu */}
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 z-50 ${
          rtl ? "text-right" : "text-left"
        }`}
      >
        {options.map((opt) => (
          <li key={opt.dial}>
            <button
              type="button"
              onClick={() => onChange(opt.dial)}
              className={`flex items-center ${
                rtl ? "justify-between" : "justify-between"
              }`}
            >
              <span className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={opt.cc}
                  svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "2px",
                  }}
                />
                <span>{opt.label}</span>
              </span>
              {/* dial should always be LTR */}
              <bdi dir="ltr" className="font-medium">
                {opt.dial}
              </bdi>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
