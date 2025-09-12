// src/useLocale.js
import { useEffect, useState, useCallback } from "react";
import i18n from "./i18n";

export function useLocale() {
  const [lang, setLang] = useState(
    () => i18n.language || localStorage.getItem("lang") || "en"
  );

  // Keep React in sync with i18next
  useEffect(() => {
    const onChange = (lng) => setLang(lng || "en");
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  // Mirror the document and persist
  useEffect(() => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      html.setAttribute("lang", lang);
      html.setAttribute("dir", dir);
      // optional: utility classes for Tailwind conditions
      html.classList.toggle("rtl", dir === "rtl");
      html.classList.toggle("ltr", dir === "ltr");
    }
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  // Change language (await-able)
  const change = useCallback(async (lng) => {
    await i18n.changeLanguage(lng);
    window.location.reload();
    // setLang is invoked by languageChanged listener above
  }, []);

  // Convenience t()
  const t = useCallback((...args) => i18n.t(...args), []);

  return { lang, dir, t, change };
}
