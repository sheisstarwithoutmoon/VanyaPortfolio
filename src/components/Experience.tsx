"use client";
import React, { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

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

  return (
    <section 
      id="experience" 
      className={`py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <div key={exp.slug || index} className="neo-card p-6 md:p-8 space-y-6">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-rose)] text-[color:var(--background)] shadow-[2px_2px_0px_0px_var(--text-primary)] shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl text-[color:var(--text-title)] font-extrabold">
                      {exp.role}{" "}
                      <span className="text-[color:var(--accent-rose)]">
                        @ {exp.company}
                      </span>
                    </h3>
                    {exp.location && (
                      <p className="text-xs text-muted font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 opacity-60" />
                        {exp.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-xs font-semibold text-muted uppercase tracking-wider self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 opacity-60" />
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
