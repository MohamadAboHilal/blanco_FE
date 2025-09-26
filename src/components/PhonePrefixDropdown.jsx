import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  FloatingPortal,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

/**
 * Props:
 * - value: string (e.g. "+49")
 * - onChange: (dialCode: string) => void
 * - options: Array<{ cc: string; dial: string; label: string }>
 * - rtl?: boolean
 */
export default function PhonePrefixDropdown({
  value,
  onChange,
  options,
  rtl = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const current = options.find((o) => o.dial === value) || options[0];

  // Switch to bottom sheet on small screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Floating UI (desktop/tablet)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen && !isMobile,
    onOpenChange: setIsOpen,
    placement: rtl ? "bottom-end" : "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ fallbackPlacements: [rtl ? "top-end" : "top-start"] }),
      shift({ padding: 8 }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: Math.min(availableHeight, 400) + "px",
            width: Math.max(elements.reference?.clientWidth || 0, 224) + "px",
          });
        },
      }),
    ],
  });

  // Dismiss outside / Escape + dialog role
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  // Keyboard nav on trigger
  const onTriggerKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen((v) => !v);
        break;
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (dial) => {
    onChange(dial);
    setIsOpen(false);
  };

  const MenuList = (
    <ul
      role="listbox"
      aria-label="Country calling codes"
      className="w-full max-h-[60vh] overflow-auto p-1"
      dir={rtl ? "rtl" : "ltr"}
    >
      {options.map((opt, index) => {
        return (
          <li key={opt.dial} role="option" aria-selected={opt.dial === value}>
            <button
              type="button"
              onClick={() => handleSelect(opt.dial)}
              className="w-full flex items-center justify-between p-3 rounded text-left hover:bg-slate-50"
              aria-label={`Select ${opt.label}, ${opt.dial}`}
            >
              <span className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={opt.cc}
                  svg
                  style={{ width: "1rem", height: "1rem", borderRadius: "2px" }}
                />
                <span className="text-sm sm:text-base">{opt.label}</span>
              </span>
              <bdi dir="ltr" className="text-sm sm:text-base text-slate-500">
                {opt.dial}
              </bdi>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`inline-block ${
        rtl ? "text-right" : "text-left"
      } w-full sm:w-auto`}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Trigger (full-width on mobile) */}
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => {
            setIsOpen((v) => !v);
          },
          onKeyDown: onTriggerKeyDown,
          "aria-haspopup": "listbox",
          "aria-expanded": isOpen,
          className:
            "inline-flex items-center justify-between h-11 w-full sm:w-36 md:w-40 lg:w-44 " +
            "px-3 gap-2 rounded-xl bg-[#F9FBFF] text-slate-700 border border-slate-200 " +
            "hover:bg-slate-50 focus:outline-none",
          "aria-label": `Selected country: ${current.label}, ${current.dial}`,
        })}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ReactCountryFlag
            countryCode={current.cc}
            svg
            style={{ width: "1.15rem", height: "1.15rem", borderRadius: "2px" }}
            aria-label={`${current.label} flag`}
          />
          <bdi dir="ltr" className="font-medium text-sm truncate">
            {current.dial}
          </bdi>
        </div>
        <svg
          className="w-4 h-4 opacity-50 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          style={rtl ? { transform: "scaleX(-1)" } : undefined}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {/* Desktop/Tablet Popover (Portal prevents clipping) */}
      {isOpen && !isMobile && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps({
              className:
                "bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] overflow-hidden",
            })}
          >
            {/* Header WITH working close button (mousedown) */}
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm font-medium">Choose country / code</span>
              <button
                type="button"
                onMouseDown={() => context.onOpenChange(false)}
                aria-label="Close"
                className="p-2 rounded hover:bg-slate-50"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            {MenuList}
          </div>
        </FloatingPortal>
      )}

      {/* Mobile Bottom Sheet (never cut off) */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          {/* Sheet */}
          <div
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl border-t border-slate-200 shadow-xl max-h-[75vh]"
            style={{ [rtl ? "right" : "left"]: 0 }}
          >
            <div className="flex items-center justify-between p-3">
              <div className="font-medium text-slate-700 text-base">
                {current?.label || "Select"}
              </div>
              <button
                // mousedown prevents outsidePress from ‘winning the race’
                type="button"
                onMouseDown={() => setIsOpen(false)}
                aria-label="Close"
                className="p-2 rounded hover:bg-slate-50"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm text-slate-500 mb-2">
                Choose country / calling code
              </div>
              <div className="border border-slate-200 rounded-lg">
                {MenuList}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
