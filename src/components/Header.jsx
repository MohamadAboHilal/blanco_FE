import logo from "../assets/Blanco_logo.png";
import flag from "../assets/Syrian_Flag.svg";
import enFlag from "../assets/US_Flag.png";
import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { lang, change } = useLocale();

  // Sticky header color on scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("main-header");
      if (!container) return;
      if (window.scrollY > 50) {
        container.classList.add("bg-white");
        container.classList.remove("bg-[#EEF5FF]");
      } else {
        container.classList.remove("bg-white");
        container.classList.add("bg-[#EEF5FF]");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smoothly go to a hash on the home page
  const goToHash = (hash) => {
    const id = hash.replace("#", "");
    const scrollToId = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/") {
      // navigate to home with hash, then scroll after render
      navigate({ pathname: "/", hash });
      // small delay to wait for Home to mount
      setTimeout(scrollToId, 0);
    } else {
      // already on home
      if (location.hash !== hash) {
        navigate({ hash }, { replace: true });
      }
      scrollToId();
    }
  };

  const linkBase =
    "text-xl font-semibold transition-colors hover:text-[#00B0DF]";
  const activeClass = "text-[#00B0DF]";

  return (
    <div className="w-full sticky top-0 z-50 transition-colors duration-300">
      <div
        id="main-header"
        className="navbar bg-[#EEF5FF] max-w-auto mx-auto px-8 transition-colors duration-300 rounded-[10px] mt-0"
      >
        <div className="flex-1">
          <Link to="/" className="normal-case text-xl">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 items-center gap-1">
            <li>
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : ""}`
                }
              >
                {t("header.home")}
              </NavLink>
            </li>

            <li>
              <button
                onClick={() => goToHash("#services")}
                className={linkBase}
              >
                {t("header.services")}
              </button>
            </li>

            <li>
              <button onClick={() => goToHash("#contact")} className={linkBase}>
                {t("header.contact")}
              </button>
            </li>

            <li>
              <button onClick={() => goToHash("#faq")} className={linkBase}>
                {t("header.faq")}
              </button>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : ""}`
                }
              >
                {t("header.about")}
              </NavLink>
            </li>

            <li>
              <details>
                <summary className="text-xl font-semibold">
                  {lang === "ar" ? "AR" : "EN"}
                </summary>
                <ul className="rounded-t-none p-2">
                  <li>
                    <button onClick={() => change("en")}>EN</button>
                  </li>
                  <li>
                    <button onClick={() => change("ar")}>AR</button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
