// FloatingWhatsApp.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocale } from "../useLocale";
import { useTranslation } from "react-i18next";
import wsIcon from "../assets/whatsapp.png";

export default function FloatingWhatsApp() {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("https://api.blancoone.com/api/contact_data", {
          headers: { Accept: "application/json" },
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setContact(data);
      } catch (e) {
        if (e.name !== "AbortError") console.error("contact_data fetch:", e);
      }
    })();

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  const waNumber = contact?.whatsapp_number || "";
  const waDigits = useMemo(() => waNumber.replace(/[^\d]/g, ""), [waNumber]);
  const waHref = waDigits ? `https://wa.me/${waDigits}` : "https://wa.me";

  return (
    <div
      className="hidden md:block"
      style={{
        position: "sticky",
        bottom: "24px",
        zIndex: 1000,
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        pointerEvents: "none",
        textAlign: "right",
      }}
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          display: "inline-block",
          pointerEvents: "auto",
          marginRight: "75px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={wsIcon}
            alt="WhatsApp"
            style={{
              width: 54,
              height: 54,
              boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
              borderRadius: "50%",
              // border: "2px solid #25D366",
              background: "white",
              transition: "transform 0.2s",
            }}
            draggable="false"
          />
          <span
            style={{
              marginTop: 6,
              padding: "2px 12px",
              fontSize: "0.95rem",
              background: "#65d690",
              color: "white",
              borderRadius: "999px",
              fontWeight: 500,
              boxShadow: "0 2px 8px rgba(37, 211, 102, 0.15)",
              letterSpacing: "0.02em",
              userSelect: "none",
            }}
          >
            {t("footer.contact")}
          </span>
        </div>
      </a>
    </div>
  );
}
