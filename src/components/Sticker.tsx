"use client";
import React, { useState } from "react";

interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  initialRotation?: number; // Initial degree rotation (e.g. -6, 8)
  width?: string; // Tailwind width class (e.g. "w-28 md:w-36")
  animate?: 'slow' | 'delayed' | 'none';
}

export default function Sticker({
  src,
  alt,
  className = "",
  initialRotation = 0,
  width = "w-28 md:w-36",
  animate = "slow",
}: StickerProps) {
  const [rotation, setRotation] = useState(initialRotation);
  const [direction, setDirection] = useState(-1);

  // Rotate on tap/click
  const handleTap = () => {
    // Alternates -45 then +45 on each tap
    setRotation(prev => prev + direction * 45);
    setDirection(prev => prev * -1);
  };

  // Float animation class logic
  let floatClass = "";
  if (animate !== "none") {
    floatClass = animate === "delayed" ? "animate-float-delayed" : "animate-float-slow";
  }

  return (
    <div
      onClick={handleTap}
      className={`absolute select-none transition-shadow duration-200 shadow-md hover:shadow-xl cursor-pointer z-30 ${className}`}
    >
      {/* Nested container for rotation and floating animations */}
      <div
        className="transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className={`${floatClass} bg-white p-2 rounded-xl border border-neutral-200/80 flex flex-col items-center shadow-sm`}>
          <img
            src={src}
            alt={alt}
            draggable="false"
            className={`${width} h-auto object-contain pointer-events-none select-none`}
          />
        </div>
      </div>
    </div>
  );
}