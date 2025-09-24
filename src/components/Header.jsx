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

  const BRAND = "#00B0DF";

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

  const goToHash = (hash) => {
    const id = hash.replace("#", "");
    const scrollToId = () => {
      const el = document.getElementById(id);
      const header = document.getElementById("main-header");
      if (el) {
        const headerHeight = header ? header.offsetHeight : 70;
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elTop - headerHeight - 8,
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

  // Reusable block: nav items (no language here)
  const NavItems = ({ onItemClick }) => (
    <>
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
            onItemClick?.();
          }}
        >
          {t("header.home")}
        </NavLink>
      </li>

      <li>
        <button
          onClick={() => {
            goToHash("#services");
            onItemClick?.();
          }}
          className={navTap}
        >
          {t("header.services")}
        </button>
      </li>

      <li>
        <button
          onClick={() => {
            goToHash("#faq");
            onItemClick?.();
          }}
          className={navTap}
        >
          {t("header.faq")}
        </button>
      </li>

      <li>
        <button
          onClick={() => {
            goToHash("#contact");
            onItemClick?.();
          }}
          className={navTap}
        >
          {t("header.contact")}
        </button>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${navTap} ${isActive ? activeClass : ""}`
          }
          onClick={() => onItemClick?.()}
        >
          {t("header.about")}
        </NavLink>
      </li>
    </>
  );

  // Reusable block: language dropdown (kept outside hamburger)
  const LanguageDropdown = () => (
    <li>
      <details>
        <summary className={navTap}>{lang === "ar" ? "AR" : "EN"}</summary>
        <ul className="rounded-t-none p-2 w-20 bg-white">
          <li>
            <button
              onClick={() => change("en")}
              className="flex items-center gap-2 bg-white px-2 py-1 rounded active:bg-[#DFF4FF] focus:bg-[#DFF4FF] focus:outline-none"
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
              className="flex items-center gap-2 bg-white px-2 py-1 rounded active:bg-[#DFF4FF] focus:bg-[#DFF4FF] focus:outline-none"
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
  );

  return (
    <div className="w-full sticky top-0 z-50 transition-colors duration-300">
      <div
        id="main-header"
        className="navbar bg-[#EEF5FF] max-w-auto mx-auto px-8 transition-colors duration-300 rounded-[10px] mt-0"
        style={{ ["--brand"]: BRAND }}
      >
        {/* Left: logo */}
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

        {/* Right controls */}
        <div className="flex-none items-center gap-2">
          {/* Mobile/Tablet: Hamburger + Language (outside menu) */}
          <div className="flex md:hidden items-center gap-1">
            {/* Hamburger dropdown with nav items */}
            <div className="dropdown dropdown-end">
              <button
                className={`${navTap} px-3`}
                tabIndex={0}
                aria-label="Open menu"
              >
                {/* Simple hamburger icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="
                  dropdown-content mt-2 p-2 shadow bg-white rounded-box w-60 z-[60]
                  menu
                  [&_li>*:active]:!bg-transparent
                "
              >
                <NavItems
                  onItemClick={() => {
                    /* closes on blur automatically */
                  }}
                />
              </ul>
            </div>

            {/* Language dropdown kept OUTSIDE the hamburger */}
            <ul
              className="
                menu menu-horizontal px-0 items-center
                [&_li>*:active]:!bg-transparent
              "
            >
              <LanguageDropdown />
            </ul>
          </div>

          {/* Desktop: horizontal nav + language */}
          <div className="hidden md:flex items-center">
            <ul
              className="
                menu menu-horizontal px-1 items-center gap-1
                [&_li>*:active]:!bg-transparent
              "
            >
              <NavItems />
              <LanguageDropdown />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
