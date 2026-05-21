"use client";
import React, { useState } from "react";

interface StickerProps {
  src: string;
  alt: string;
  className?: string;
  initialRotation?: number; // Initial degree rotation (e.g. -6, 8)
  width?: string; // Tailwind width class (e.g. "w-28 md:w-36")
  animate?: 'slow' | 'delayed' | 'none';
  withFrame?: boolean;
  loadAnimation?: boolean;
  position?: 'absolute' | 'inline';
}

export default function Sticker({
  src,
  alt,
  className = "",
  initialRotation = 0,
  width = "w-28 md:w-36",
  animate = "slow",
  withFrame = true,
  loadAnimation = true,
  position = 'absolute',
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
      className={`${position === 'absolute' ? 'absolute' : 'relative'} select-none transition-shadow duration-200 cursor-pointer z-30 ${
        withFrame ? 'shadow-md hover:shadow-xl' : ''
      } ${loadAnimation ? 'sticker-load-in' : ''} ${className}`}
    >
      {/* Nested container for rotation and floating animations */}
      <div
        className="transition-transform duration-300"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div
          className={`${floatClass} ${
            withFrame
              ? 'bg-white p-2 rounded-xl border border-neutral-200/80 shadow-sm'
              : ''
          } flex flex-col items-center`}
        >
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