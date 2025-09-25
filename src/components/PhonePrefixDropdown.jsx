import React, { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

export default function PhonePrefixDropdown({
  value,
  onChange,
  options,
  rtl = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const current = options.find((o) => o.dial === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex].dial);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        }
        break;
      case "Tab":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Handle option selection
  const handleSelect = (dialCode) => {
    onChange(dialCode);
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${rtl ? "text-right" : "text-left"}`}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="inline-flex items-center justify-between h-10 min-h-10 w-28 px-3 gap-2 rounded-xl bg-[#F9FBFF] text-slate-700 border border-slate-200 hover:bg-slate-50 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Selected country: ${current.label}, ${current.dial}`}
      >
        <div className="flex items-center gap-2">
          <ReactCountryFlag
            countryCode={current.cc}
            svg
            style={{ width: "1.15rem", height: "1.15rem", borderRadius: "2px" }}
            aria-label={`${current.label} flag`}
          />
          {/* keep the dial LTR even in Arabic */}
          <bdi dir="ltr" className="font-medium text-sm">
            {current.dial}
          </bdi>
        </div>

        {/* Chevron */}
        <svg
          className="w-4 h-4 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
          style={rtl ? { transform: "scaleX(-1)" } : undefined}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          className={`absolute top-full mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-sm z-50 max-h-60 overflow-auto p-1 ${
            rtl ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt, index) => (
            <li key={opt.dial} role="option" aria-selected={opt.dial === value}>
              <button
                type="button"
                onClick={() => handleSelect(opt.dial)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`w-full flex items-center justify-between p-2 rounded text-left ${
                  index === focusedIndex || opt.dial === value
                    ? "bg-slate-50"
                    : "hover:bg-slate-50"
                }`}
                aria-label={`Select ${opt.label}, ${opt.dial}`}
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
                  <span className="text-sm">{opt.label}</span>
                </span>
                {/* dial should always be LTR */}
                <bdi dir="ltr" className="text-sm text-slate-500">
                  {opt.dial}
                </bdi>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
