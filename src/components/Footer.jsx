import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/Blanco_logo.png";
import xIcon from "../assets/twitter.svg";
import fbIcon from "../assets/facebook.svg";
import tgIcon from "../assets/telegram.svg";
import igIcon from "../assets/instagram.svg";
import phoneIcon from "../assets/call-calling.svg";
import emailIcon from "../assets/sms-tracking.svg";
import wsIcon from "../assets/Group 1000003034.svg";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

const LtrNum = ({ children }) => (
  <bdi dir="ltr" className="inline-block tabular-nums">
    {children}
  </bdi>
);

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    let mounted = true;

    (async () => {
      try {
        if (mounted) setLoading(true);
        const res = await fetch("https://api.blancoone.com/api/contact_data", {
          headers: { Accept: "application/json" },
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setContact(data);
      } catch (e) {
        // Ignore aborts (happen in Strict Mode or on unmount)
        if (e.name !== "AbortError") {
          console.error("contact_data fetch failed:", e);
          if (mounted) setContact(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  // Build links safely
  const callNumber = contact?.call_number || "(+963) 666 333";
  const mail = contact?.contact_mail || "info@example.com";
  const waNumber = contact?.whatsapp_number || "(+964) 3324 033";

  const telHref = useMemo(
    () => `tel:${callNumber.replace(/[^\d+]/g, "")}`,
    [callNumber]
  );
  const waDigits = useMemo(() => waNumber.replace(/[^\d]/g, ""), [waNumber]);
  const waHref = waDigits ? `https://wa.me/${waDigits}` : "#";

  const socials = [
    { icon: xIcon, href: contact?.twitter_link || "#", label: "Twitter/X" },
    { icon: fbIcon, href: contact?.facebook_link || "#", label: "Facebook" },
    { icon: tgIcon, href: contact?.telegram_link || "#", label: "Telegram" },
    { icon: igIcon, href: contact?.instagram_link || "#", label: "Instagram" },
  ];

  // Helper to navigate to hash on home page
  const goToHash = (hash) => {
    const id = hash.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      if (location.hash !== hash) navigate({ hash }, { replace: true });
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="w-auto bg-[#F4F6FB] pt-12">
      <div className="max-w-full max-auto mx-auto px-6 lg:px-10">
        <div className="bg-white rounded-3xl px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* LEFT */}
          <div className="justify-self-start flex flex-col gap-5">
            <img src={logo} alt="Blanco Logo" className="h-12 w-auto" />
            <div>
              <p className="text-[#00B0DF] font-semibold">{t("footer.make")}</p>
              <p className="text-gray-500 text-sm">{t("footer.cleaning")}</p>
            </div>
            <div className="flex gap-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F9FBFF] shadow hover:scale-110 transition"
                  aria-label={s.label}
                >
                  <img src={s.icon} alt={s.label} className="w-10 h-10" />
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE */}
          <div className="justify-self-center text-left">
            <h4 className="text-[#00B0DF] font-semibold mb-4">
              {t("footer.useful")}
            </h4>
            <ul className="space-y-3 text-slate-800 font-medium list-none p-0 m-0">
              <li>
                <button
                  type="button"
                  className="bg-transparent p-0 m-0 text-inherit hover:underline cursor-pointer"
                  onClick={() => goToHash("#services")}
                >
                  {t("footer.service")}
                </button>
              </li>
              <li>
                <NavLink to="/about">{t("header.about")}</NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className="bg-transparent p-0 m-0 text-inherit hover:underline cursor-pointer"
                  onClick={() => goToHash("#contact")}
                >
                  {t("footer.contact")}
                </button>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="justify-self-end">
            <h4 className="text-[#00B0DF] font-semibold mb-4">
              {t("footer.find")}
            </h4>
            <ul className="space-y-4 text-slate-800 font-medium list-none p-0 m-0 w-max">
              <li className="flex items-center gap-3">
                <img src={phoneIcon} alt="phone" className="w-5 h-5" />
                <a href={telHref} className="hover:underline">
                  <LtrNum>{callNumber}</LtrNum>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <img src={emailIcon} alt="email" className="w-5 h-5" />
                <a href={`mailto:${mail}`} className="hover:underline">
                  {mail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <img src={wsIcon} alt="whatsapp" className="w-5 h-5" />
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <LtrNum>{waNumber}</LtrNum>
                </a>
              </li>
            </ul>

            {loading && (
              <div className="mt-3 text-xs text-slate-400">
                {t("common.loading") || "Loading…"}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
