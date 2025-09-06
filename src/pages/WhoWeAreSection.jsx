import React from "react";
import offices from "../assets/offices.png";
import schools from "../assets/schools.png";
import healthcare from "../assets/healthcare.png";
import retail from "../assets/retail.png";
import government from "../assets/government.png";

import { useTranslation, Trans } from "react-i18next";
import { useLocale } from "../useLocale";

function SpecializationCard({ img, title }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[15px]">
        <div className="w-[218px] h-[265px] overflow-hidden rounded-[15px] shrink-0">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <p className="mt-6 text-xl text-[#00B0DF] text-center max-w-[218px]">
        {title}
      </p>
    </div>
  );
}

export default function WhoWeAreSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  const specializations = [
    { title: t("specializations.offices"), img: offices },
    { title: t("specializations.schools"), img: schools },
    { title: t("specializations.healthcare"), img: healthcare },
    { title: t("specializations.retail"), img: retail },
    { title: t("specializations.government"), img: government },
  ];

  return (
    <section className="relative isolate w-full py-14 bg-[#F9FBFF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-[28px] bg-white/90 backdrop-blur-sm ring-1 ring-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] px-6 md:px-10 py-10">
          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              ✨ {t("about.who")}{" "}
              <span className="text-[#00B0DF]">{t("about.weAre")}</span>
            </h2>
            <p className="mt-5 text-black text-lg md:text-xl leading-relaxed">
              <span className="font-bold text-[#00B0DF]">
                {t("about.blanco")}
              </span>{" "}
              {t("about.is")}{" "}
              <span className="font-semibold text-[#00B0DF]">
                {t("about.b2b")}
              </span>{" "}
              {t("about.cleaning")}
            </p>
          </div>

          {/* Our Specializations */}
          <h3 className="mt-10 text-center text-xl md:text-2xl font-bold text-amber-500">
            {t("about.ourSpecializations")}
          </h3>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center items-start">
            {specializations.map((s, i) => (
              <SpecializationCard key={i} img={s.img} title={s.title} />
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white ring-1 ring-slate-200/70  p-8">
              <h4 className="text-[#00B0DF] text-xl font-bold text-center">
                {t("about.ourMission")}
              </h4>
              <p className="mt-4 text-black text-lg text-center font-normal leading-relaxed">
                {t("about.missionText")}
              </p>
            </div>

            <div className="rounded-3xl bg-white ring-1 ring-slate-200/70  p-8">
              <h4 className="text-[#00B0DF] text-xl font-bold text-center">
                {t("about.ourVision")}
              </h4>
              <p className="mt-4 text-black text-center font-normal leading-relaxed">
                {t("about.visionText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
