import logo from "../assets/Blanco_logo.png";
import flag from "../assets/Syrian_Flag.svg";
import enFlag from "../assets/US_Flag.png";
import React, { useEffect } from "react";

function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("main-header");
      if (window.scrollY > 50) {
        container.classList.add("bg-white");
        container.classList.remove("bg-[#EEF5FF]");
      } else {
        container.classList.remove("bg-white");
        container.classList.add("bg-[#EEF5FF]");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 transition-colors duration-300">
      <div
        id="main-header"
        className="navbar bg-[#EEF5FF] max-w-auto mx-auto px-8 transition-colors duration-300 rounded-[10px] mt-0"
      >
        <div className="flex-1">
          <a className=" normal-case text-xl">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-[#00B0DF] text-xl font-semibold">Home</a>
            </li>
            <li>
              <a className="text-xl font-semibold">Services</a>
            </li>
            <li>
              <a className="text-xl font-semibold">Contact Us</a>
            </li>
            <li>
              <a className="text-xl font-semibold">About Us</a>
            </li>
            <li>
              <a className="text-xl font-semibold">FAQ</a>
            </li>
            <li>
              <details>
                <summary className="text-xl gap-2 font-semibold flex items-center">
                  <img
                    src={flag}
                    alt="icon"
                    className="h-4 w-6 object-contain"
                  />
                  AR
                </summary>
                <ul className="rounded-t-none p-2">
                  <li className="flex items-center">
                    <a className="text-xl font-semibold flex items-center gap-2">
                      <img
                        src={enFlag}
                        alt="EN"
                        className="h-4 w-6 object-contain"
                      />
                      EN
                    </a>
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
