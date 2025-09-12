// Header.jsx (drop-in)
import logo from "../assets/Blanco_logo.png";
import flag from "../assets/Syrian_Flag.svg";
import enFlag from "../assets/US_Flag.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../useLocale";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { dir } = useLocale();
  const { lang, change } = useLocale();

  // Tap/click style used by all header controls (removes black/gray active flash)
  // Brand color once
  const BRAND = "#00B0DF";

  // Reusable nav button style (pretty pill + underline micro-animation)
  const navTap = [
    "relative",
    "px-4 py-2 rounded-xl",
    "text-lg font-semibold text-slate-700/90",
    "transition-all duration-200",
    "hover:text-[var(--brand)]",
    "hover:bg-[#EAF9FF]",
    "active:bg-[#DFF4FF] active:scale-[0.98]",
    "focus:outline-none",
    "shadow-none hover:shadow-[0_6px_18px_rgba(0,176,223,0.12)]",
    "[-webkit-tap-highlight-color:transparent]",
  ].join(" ");

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
      const header = document.getElementById("main-header");
      if (el) {
        const headerHeight = header ? header.offsetHeight : 70;
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elTop - headerHeight - 8, // 8px extra spacing
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash });
      setTimeout(scrollToId, 100);
    } else {
      if (location.hash !== hash) navigate({ hash }, { replace: true });
      scrollToId();
    }
  };

  const activeClass = "text-[#00B0DF]";

  return (
    <div className="w-full sticky top-0 z-50 transition-colors duration-300">
      <div
        id="main-header"
        className="navbar bg-[#EEF5FF] max-w-auto mx-auto px-8 transition-colors duration-300 rounded-[10px] mt-0"
      >
        <div className="flex-1">
          <Link
            to="/"
            className="normal-case text-xl"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
          >
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex-none">
          <ul
            className="
              menu menu-horizontal px-1 items-center gap-1
              [&_li>*:active]:!bg-transparent  /* neutralize DaisyUI default dark active */
            "
          >
            <li>
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `${navTap} ${isActive ? activeClass : ""}`
                }
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 100);
                }}
              >
                {t("header.home")}
              </NavLink>
            </li>

            <li>
              <button onClick={() => goToHash("#services")} className={navTap}>
                {t("header.services")}
              </button>
            </li>

            <li>
              <button onClick={() => goToHash("#faq")} className={navTap}>
                {t("header.faq")}
              </button>
            </li>

            <li>
              <button onClick={() => goToHash("#contact")} className={navTap}>
                {t("header.contact")}
              </button>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${navTap} ${isActive ? activeClass : ""}`
                }
              >
                {t("header.about")}
              </NavLink>
            </li>

            <li>
              <details>
                <summary className={navTap}>
                  {lang === "ar" ? "AR" : "EN"}
                </summary>
                <ul className="languages-list rounded-t-none p-2 w-20">
                  <li>
                    <button
                      onClick={() => change("en")}
                      className="language-item flex items-center gap-2 px-2 py-1 rounded active:bg-white focus:bg-white focus:outline-none"
                    >
                      <img
                        src={enFlag}
                        alt="EN"
                        className="h-4 w-6 object-cover rounded"
                      />
                      EN
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => change("ar")}
                      className="language-item flex items-center gap-2  px-2 py-1 rounded active:bg-white focus:bg-white focus:outline-none"
                    >
                      <img
                        src={flag}
                        alt="AR"
                        className="h-4 w-6 object-cover rounded"
                      />
                      AR
                    </button>
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
