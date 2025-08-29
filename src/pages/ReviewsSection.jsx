import React from "react";
import ReviewsCarousel from "../components/ReviewsCarousel";

export default function ReviewsSection() {
  const reviews = [
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Jennifer Wilson",
      role: "Homeowner",
      rating: 5,
      text: "Blanco transformed my home! Their attention to detail is incredible and the staff is so professional. I wouldn't trust anyone else with my cleaning needs.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "David Miller",
      role: "Homeowner",
      rating: 5,
      text: "Excellent experience! The cleaners were punctual, polite, and left everything spotless.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Sophia Lee",
      role: "Homeowner",
      rating: 5,
      text: "Professional and efficient. Highly recommend Blanco for regular maintenance cleaning.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    {
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      name: "Michael Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Super reliable! Always a pleasure working with this team.",
    },
    // add more...
  ];

  return (
    <section className="w-full py-16 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            ✨ What Our <span className="text-[#00B0DF]">Clients</span> Say
          </h2>
          <p className="mt-4 text-gray-600 font-semibold text-xl">
            Don’t just take our word for it – hear from our satisfied customers
          </p>
        </div>

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
