"use client";
import React, { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Leadership() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const textRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 50, duration: 700, delay: 100 });
  const photosRef = useScrollReveal<HTMLDivElement>({ direction: 'right', distance: 50, duration: 700, delay: 200 });

  const leadership = portfolio.leadership[0];
  const images = (leadership as Record<string, unknown>)?.images as string[] | undefined;

  return (
    <section 
      id="leadership" 
      className={`py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / leadership
          </h2>
        </div>

        {/* Two-column layout: text + photo gallery */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* Left: Leadership Content Card */}
          <div ref={textRef} className="neo-card p-6 md:p-8 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl text-[color:var(--text-title)] font-extrabold">
                  {leadership?.title}
                </h3>
                <p className="text-muted text-sm md:text-base font-semibold mt-0.5">
                  <a 
                    href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-sri-city-india/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[color:var(--accent-rose)] transition duration-300 underline underline-offset-4"
                  >
                    {leadership?.organization}
                  </a>
                </p>
              </div>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-xs font-semibold text-muted uppercase tracking-wider self-start md:self-auto">
                {leadership?.duration}
              </div>
            </div>

            <ul className="space-y-3 text-muted text-sm md:text-base leading-relaxed list-none pl-0">
              {leadership?.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-[color:var(--accent-rose)] font-bold select-none text-base mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Photo Gallery (Straight, Clean, Non-moving) */}
          {images && images.length > 0 && (
            <div 
              ref={photosRef}
              className="lg:w-[320px] shrink-0 flex flex-row lg:flex-col gap-4 items-center justify-center"
            >
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="leadership-photo relative w-full max-w-[280px]"
                >
                  <img
                    src={src}
                    alt={`Leadership moment ${idx + 1}`}
                    className="aspect-[4/3] object-cover w-full h-full"
                  />
                  {/* Caption strip */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium handwritten text-center">
                      {idx === 0 ? 'leading the team ✦' : 'workshop vibes 🎯'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
