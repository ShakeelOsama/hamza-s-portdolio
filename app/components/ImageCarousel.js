"use client";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageCarousel({ images = [], title = "" }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;
  const showPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full flex flex-col items-center relative">
      {images.length > 1 && (
        <button
          onClick={showPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-[#6c5ce7] rounded-full p-2 shadow-lg transition"
          aria-label="Previous image"
          type="button"
        >
          <FiChevronLeft className="text-3xl" />
        </button>
      )}
      <img
        src={images[current]}
        alt={title}
        className="w-full max-w-2xl h-[40rem] object-contain rounded-xl bg-white/5"
        style={{ background: "transparent" }}
      />
      {images.length > 1 && (
        <button
          onClick={showNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-[#6c5ce7] rounded-full p-2 shadow-lg transition"
          aria-label="Next image"
          type="button"
        >
          <FiChevronRight className="text-3xl" />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-[#6c5ce7]" : "bg-white/30"} transition`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 