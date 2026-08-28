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
      className={`py-16 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / leadership
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>

        {/* GDG Lead panel */}
              <div className="relative max-w-4xl">
          <div className="relative group">
            
            <div className="panel panel-muted rounded-3xl p-8 transition duration-300 hover:border-[color:var(--accent-lavender)]/30 shadow-[0_8px_30px_rgba(27,19,26,0.01)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="section-title text-2xl md:text-3xl text-[color:var(--text-title)] font-bold">
                    {portfolio.leadership[0]?.title}
                  </h3>
                  <p className="text-muted text-base font-semibold mt-1">
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
                
                <div className="flex flex-col md:items-end gap-2">
                  <span className="text-sm font-semibold text-muted">
                    {portfolio.leadership[0]?.duration}
                  </span>
                </div>
              </div>
 
              <ul className="space-y-4 text-muted text-sm md:text-base leading-relaxed list-disc pl-5">
                {portfolio.leadership[0]?.bullets.map((bullet, index) => (
                  <li key={index}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
 
          </div>
        </div>

      </div>
    </section>
  );
}
