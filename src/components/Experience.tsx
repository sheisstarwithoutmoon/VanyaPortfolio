"use client";
import React, { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';
import { MapPin } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

export default function Experience() {
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

  const experienceData = portfolio.experience;

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const cardsRef = useStaggerReveal<HTMLDivElement>({ direction: 'up', distance: 50, staggerMs: 150 });

  return (
    <section 
      id="experience" 
      className={`scroll-mt-16 md:scroll-mt-24 py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6" ref={cardsRef}>
          {experienceData.map((exp, index) => (
            <div key={exp.slug || index} className="neo-card p-6 md:p-8 space-y-6" data-reveal>
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl text-[color:var(--text-title)] font-extrabold leading-tight">
                    {exp.certificateUrl ? (
                      <a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline decoration-2 transition duration-300 cursor-pointer"
                      >
                        {exp.role} @ {exp.company}
                      </a>
                    ) : (
                      `${exp.role} @ ${exp.company}`
                    )}
                  </h3>
                  {exp.location && (
                    <p className="text-xs text-muted font-medium flex items-center gap-1 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-60" />
                      {exp.location}
                    </p>
                  )}
                </div>

                {/* Duration Badge (No icon, aligned cleanly) */}
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-xs font-semibold text-muted uppercase tracking-wider self-start shrink-0">
                  {exp.duration}
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-3 text-muted text-sm md:text-base leading-relaxed list-none pl-0">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[color:var(--accent-rose)] font-bold select-none text-base mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-dashed border-[color:var(--stroke)]">
                  <span className="text-xs font-medium text-muted mr-1">Technologies:</span>
                  {exp.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
