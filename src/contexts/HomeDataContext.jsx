// src/contexts/HomeDataContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import i18n from "../i18n";

const HomeDataContext = createContext(null);
const API_URL = "https://api.blancoone.com/api/home";
const normalize = (v) => (v === "ar" ? "ar" : "en");

// Axios instance (optional, but tidy)
const api = axios.create({
  baseURL: "https://api.blancoone.com",
  headers: { Accept: "application/json" },
});

export function HomeDataProvider({ children }) {
  // initial language: localStorage -> i18n -> 'en'
  const [lang, setLang] = useState(() =>
    normalize(localStorage.getItem("lang") || i18n.language || "en")
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch helper
  const fetchHome = useCallback(async (lng, signal) => {
    const res = await api.get("/api/home", {
      params: { _: Date.now() }, // cache-buster
      signal, // axios >= 1.x supports AbortController
      headers: { language: normalize(lng) },
    });
    return res.data;
  }, []);

  // fetch on mount and whenever lang changes
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const json = await fetchHome(lang, ctrl.signal);
        setData(json);
      } catch (err) {
        if (!axios.isCancel?.(err) && err?.code !== "ERR_CANCELED") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [lang, fetchHome]);

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("lang", normalize(lang));
  }, [lang]);

  // react to i18n changes (e.g., useLocale().change(...))
  useEffect(() => {
    const onI18nChange = (lng) => {
      const nl = normalize(lng || "en");
      setLang(nl);
      localStorage.setItem("lang", nl); // <-- update localStorage here
    };
    i18n.on("languageChanged", onI18nChange);
    return () => i18n.off("languageChanged", onI18nChange);
  }, []);

  // react to cross-tab language changes
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "lang" && e.newValue) {
        const nl = normalize(e.newValue);
        if (nl !== lang) setLang(nl);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [lang]);

  // public API
  const changeLanguage = useCallback((lng) => {
    const nl = normalize(lng);
    // keep i18n + localStorage + state in sync
    localStorage.setItem("lang", nl);
    setLang(nl);
    // if you use i18n elsewhere, also update it:
    if (i18n.language !== nl) i18n.changeLanguage(nl);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang: changeLanguage, // call setLang('ar'|'en') to switch & refetch
      data,
      services: data?.services ?? [],
      galleries: data?.galleries ?? [],
      testimonials: data?.testimonials ?? [],
      clients: data?.our_clients ?? [],
      cleaningTips: data?.cleaning_tips ?? [],
      faqs: data?.faqs ?? [],
      loading,
      error,
      refetch: async () => changeLanguage(lang), // force-refetch with current lang
    }),
    [lang, data, loading, error, changeLanguage]
  );

  console.log("HomeDataContext", { lang, data, loading, error });

  return (
    <HomeDataContext.Provider value={value}>
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  const ctx = useContext(HomeDataContext);
  if (!ctx) throw new Error("useHomeData must be used within HomeDataProvider");
  return ctx;
}
