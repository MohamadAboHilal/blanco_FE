import React from "react";
import ServiceCard from "../components/ServiceCard";
import ServicesCarousel from "../components/ServicesCarousel";
import servicesBg from "../assets/servicesBg.svg";

export default function ServicesSection() {
  // Add/edit items here – the UI updates automatically.
  const services = [
    {
      badgeText: "Popular",
      badgeClass: "bg-cyan-100 text-cyan-700",
      title: "Basic Package",
      description:
        "Ideal for offices, retail spaces, and institutions that need regular, day-to-day cleaning.",
      features: [
        "Dusting",
        "Floor Cleaning",
        "Trash Collection",
        "Toilet Cleaning",
      ],
    },
    {
      badgeText: "Recommended",
      badgeClass: "bg-amber-100 text-amber-700",
      title: "Standard Package",
      description:
        "Designed for businesses that require deeper, more detailed cleaning on a regular basis.",
      features: [
        "Everything in Basic",
        "Deep Cleaning",
        "Glass & Window Cleaning",
        "Sanitizing Services",
      ],
    },
    {
      badgeText: "Premium",
      badgeClass: "bg-emerald-100 text-emerald-700",
      title: "Premium Package",
      description:
        "Perfect for facilities that need specialized care and advanced cleaning solutions.",
      features: [
        "Everything in Standard",
        "Marble Polishing",
        "Crystallization",
        "Post-Construction Cleaning",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
    {
      badgeText: "Flexible",
      badgeClass: "bg-violet-100 text-violet-700",
      title: "Customized Plans",
      description:
        "Every business is different. We build the right plan for you. Contact us for a quote!",
      features: [
        "Tailored Solutions",
        "Flexible Scheduling",
        "Custom Service Mix",
        "Budget-Friendly Options",
      ],
    },
  ];

  return (
    <section className="relative w-full z-0 mt-20">
      <div
        aria-hidden="true"
        className="
      absolute left-1/2 -translate-x-1/2
       top-[50px] md:top-[50px] 
      w-[min(95vw,1200px)]              
      aspect-[1209/492]                 
      bg-no-repeat bg-contain bg-center
      -z-10 pointer-events-none
      bg-[url('/assets/servicesBg.svg')] 
    "
        style={{ backgroundImage: `url(${servicesBg})` }}
      />

      <div
        aria-hidden="true"
        className="absolute -left-32 top-36 w-[400px] h-[400px] -z-10 
               bg-[#E5F9FF] rounded-full blur-[80px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ Our <span className="text-[#00B0DF]">Cleaning</span> Services
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed text-xl font-semibold">
            ✨ Blanco offers a range of service packages to suit different needs
            and environments. Whether you require basic maintenance or
            specialized cleaning, we have the right solution for your business
            ✨.
          </p>
        </div>

        <div className="mt-8 bg-slate-50">
          <ServicesCarousel services={services} />
        </div>
      </div>
    </section>
  );
}
