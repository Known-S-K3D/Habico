import React, { useEffect, useState } from "react";
import ikat from "../product/IkatProducts/ikat-tapis.jpg";
import inabel from "../product/InabelProducts/inabel-blanket.jpg";
import kalinga from "../product/KalingaProducts/kalinga-bag.jpg";
import "../styles/global.css";
// slides product
const slides = [
  {
    id: 1,
    title: "Ikat Tapis",
    description:
      "Ikat tapis is a traditional handwoven textile known for its intricate patterns and vibrant colors.",
    image: ikat,
  },
  {
    id: 2,
    title: "Inabel blankets",
    description:
      "Inabel blankets are known for their intricate designs and vibrant colors.",
    image: inabel,
  },
  {
    id: 3,
    title: "Kalinga Bag",
    description:
      "bag crafted with intricate designs and vibrant colors, perfect for any occasion.",
    image: kalinga,
  },

// {
//     id: 4,
//     title: "Blankets",
//     description:
//       "AI-generated masterpieces that blur the line between human and machine creativity.",
//     image:
//       "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80",
//   },

];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full hero-section">
      <div className="relative w-full h-[450px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 max-w-4xl p-6 sm:p-12">
              <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="max-w-2xl mb-8 text-lg text-gray-200">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* <a
                  href="/shop"
                  className="px-6 py-3 font-medium text-white transition-colors bg-indigo-600 rounded-button hover:bg-indigo-700 whitespace-nowrap"
                >
                  Shop Now
                </a>
                <a
                  href="/shop"
                  className="px-6 py-3 font-medium text-gray-800 transition-colors bg-white border border-gray-200 rounded-button hover:bg-gray-50 whitespace-nowrap"
                >
                  Explore Collection
                </a> */}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute z-20 p-2 text-white transition -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/40 hover:bg-black/60"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute z-20 p-2 text-white transition -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/40 hover:bg-black/60"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-6 left-1/2">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-10 h-1 rounded-full transition-colors ${
                index === current ? "bg-white/80" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
  