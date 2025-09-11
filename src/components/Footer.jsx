import React from "react";
import logo from "../assets/Blanco_logo.png";
import xIcon from "../assets/twitter.svg";
import fbIcon from "../assets/facebook.svg";
import tgIcon from "../assets/telegram.svg";
import igIcon from "../assets/instagram.svg";
import phoneIcon from "../assets/call-calling.svg";
import emailIcon from "../assets/sms-tracking.svg";
import wsIcon from "../assets/Group 1000003034.svg";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

export default function Footer() {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <footer className="w-auto bg-[#F4F6FB] pt-12">
      <div className="max-w-full max-auto mx-auto px-6 lg:px-10">
        <div
          className="bg-white rounded-3xl px-6 md:px-10 py-10
                        grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
        >
          {/* LEFT */}
          <div className="justify-self-start flex flex-col gap-5">
            <img src={logo} alt="Blanco Logo" className="h-12 w-auto" />
            <div>
              <p className="text-[#00B0DF] font-semibold">{t("footer.make")}</p>
              <p className="text-gray-500 text-sm">{t("footer.cleaning")}</p>
            </div>
            <div className="flex gap-4">
              {[xIcon, fbIcon, tgIcon, igIcon].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full
                              bg-[#F9FBFF] shadow hover:scale-110 transition"
                >
                  <img src={icon} alt="social" className="w-10 h-10" />
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
                <a href="services">{t("footer.service")}</a>
              </li>
              <li>
                <a href="about">{t("footer.about")}</a>
              </li>
              <li>
                <a href="contact">{t("footer.contact")}</a>
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
                <span>+963 666 333</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={emailIcon} alt="email" className="w-5 h-5" />
                <span>{t("footer.email")}</span>
              </li>
              <li className="flex items-center gap-3">
                <img src={wsIcon} alt="whatsapp" className="w-5 h-5" />
                <span>+964 3324 033</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
