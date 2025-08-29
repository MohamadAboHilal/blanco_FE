import React from "react";
import TipsCarousel from "../components/TipsCarousel";

import iconLeaf from "../assets/leaf.svg";
import iconSparkle from "../assets/sparkle.svg";
import iconClock from "../assets/clock.svg";
import iconDrop from "../assets/drop.svg";
import iconShield from "../assets/shield.svg";
import iconBulb from "../assets/bulb.svg";

export default function TipsSection() {
  const tips = [
    {
      icon: iconLeaf,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot, don't rub, to prevent spreading.",
    },
    {
      icon: iconSparkle,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot to avoid spreading.",
    },
    {
      icon: iconClock,
      title: "Clean ",
      highlight: "Top To Bottom",
      text: "Always clean from top to bottom so dust falls to areas you haven’t cleaned yet—preventing rework.",
    },
    {
      icon: iconDrop,
      title: "Natural ",
      highlight: "Cleaning Solutions",
      text: "Vinegar and baking soda are powerful, eco-friendly cleaners. Mix with water for non-toxic cleaning.",
    },
    {
      icon: iconShield,
      title: "Disinfect ",
      highlight: "High-Touch",
      text: "Door handles, light switches, and remote controls need frequent disinfecting for best results.",
    },
    {
      icon: iconBulb,
      title: "Ventilation ",
      highlight: "Is Key",
      text: "Good air circulation dries surfaces faster and reduces humidity that can cause mold and mildew.",
    },
    {
      icon: iconLeaf,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot, don't rub, to prevent spreading.",
    },
    {
      icon: iconSparkle,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot to avoid spreading.",
    },
    {
      icon: iconClock,
      title: "Clean ",
      highlight: "Top To Bottom",
      text: "Always clean from top to bottom so dust falls to areas you haven’t cleaned yet—preventing rework.",
    },
    {
      icon: iconDrop,
      title: "Natural ",
      highlight: "Cleaning Solutions",
      text: "Vinegar and baking soda are powerful, eco-friendly cleaners. Mix with water for non-toxic cleaning.",
    },
    {
      icon: iconShield,
      title: "Disinfect ",
      highlight: "High-Touch",
      text: "Door handles, light switches, and remote controls need frequent disinfecting for best results.",
    },
    {
      icon: iconBulb,
      title: "Ventilation ",
      highlight: "Is Key",
      text: "Good air circulation dries surfaces faster and reduces humidity that can cause mold and mildew.",
    },
    {
      icon: iconLeaf,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot, don't rub, to prevent spreading.",
    },
    {
      icon: iconSparkle,
      title: "Clean Spills ",
      highlight: "Immediately",
      text: "The faster you clean up spills, the less likely they are to stain. Blot to avoid spreading.",
    },
    {
      icon: iconClock,
      title: "Clean ",
      highlight: "Top To Bottom",
      text: "Always clean from top to bottom so dust falls to areas you haven’t cleaned yet—preventing rework.",
    },
    {
      icon: iconDrop,
      title: "Natural ",
      highlight: "Cleaning Solutions",
      text: "Vinegar and baking soda are powerful, eco-friendly cleaners. Mix with water for non-toxic cleaning.",
    },
    {
      icon: iconShield,
      title: "Disinfect ",
      highlight: "High-Touch",
      text: "Door handles, light switches, and remote controls need frequent disinfecting for best results.",
    },
    {
      icon: iconBulb,
      title: "Ventilation ",
      highlight: "Is Key",
      text: "Good air circulation dries surfaces faster and reduces humidity that can cause mold and mildew.",
    },

    // add more items freely; carousel pages by 9
  ];

  return (
    <section className="w-full bg-[#FBF4ED] py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ Professional <span className="text-[#00B0DF]">Cleaning</span>{" "}
            Tips
          </h2>
          <p className="mt-3 text-slate-700 text-2xl font-semibold pt-6">
            Expert advice from our professional cleaning team
          </p>
        </div>

        {/* 3×3 carousel */}
        <TipsCarousel tips={tips} />
      </div>
    </section>
  );
}
