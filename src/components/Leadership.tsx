"use client";
import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { portfolio } from '@/lib/portfolio';

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

  return (
    <section 
      id="leadership" 
      className={`py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / leadership
          </h2>
        </div>

        {/* Leadership Card */}
        <div className="neo-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start md:items-center gap-3.5">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-lavender)] text-[color:var(--background)] shadow-[2px_2px_0px_0px_var(--text-primary)] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl text-[color:var(--text-title)] font-extrabold">
                  {portfolio.leadership[0]?.title}
                </h3>
                <p className="text-muted text-sm md:text-base font-semibold mt-0.5">
                  <a 
                    href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-information-technology-sri-city-india/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[color:var(--accent-rose)] transition duration-300 underline underline-offset-4"
                  >
                    {portfolio.leadership[0]?.organization}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-xs font-semibold text-muted uppercase tracking-wider self-start md:self-auto">
              {portfolio.leadership[0]?.duration}
            </div>
          </div>

          <ul className="space-y-3 text-muted text-sm md:text-base leading-relaxed list-none pl-0">
            {portfolio.leadership[0]?.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-[color:var(--accent-rose)] font-bold select-none text-base mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
