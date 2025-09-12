// FloatingWhatsApp.jsx
import React, { useEffect, useMemo, useState } from "react";
import wsIcon from "../assets/whatsapp.png";

export default function FloatingWhatsApp() {
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
      style={{
        position: "sticky",
        bottom: "24px",
        zIndex: 1000,
        // Break out of any centered max-width container to use full viewport width:
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
        }}
      >
        <img
          src={wsIcon}
          alt="WhatsApp"
          style={{ width: 40, height: 40 }}
          draggable="false"
        />
      </a>
    </div>
  );
}
