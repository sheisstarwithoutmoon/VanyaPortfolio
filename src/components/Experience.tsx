"use client";
import React, { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';

export default function Experience() {
  const [activeTab, setActiveTab] = useState(portfolio.experience[0]?.slug || '');
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
  const activeExperience = experienceData.find((entry) => entry.slug === activeTab) ?? experienceData[0];

  return (
    <section 
      id="experience" 
      className={`py-16 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Editorial Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / experience
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>

        {/* Tabbed Layout Container */}
        <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start mt-8">
          
          {/* Tabs Menu (Left side) */}
          <div className="flex md:flex-col border-b md:border-b-0 md:border-l border-[color:var(--stroke)] overflow-x-auto md:overflow-x-visible">
            {experienceData.map((entry) => (
              <button
                key={entry.slug}
                onClick={() => setActiveTab(entry.slug)}
                className={`px-5 py-3 text-left font-bold text-sm tracking-wider uppercase transition-all duration-300 md:border-l-2 -ml-[1px] shrink-0 ${
                  activeTab === entry.slug
                    ? 'text-[color:var(--accent-rose)] border-[color:var(--accent-rose)] bg-[color:var(--accent-rose)]/5 md:bg-transparent'
                    : 'text-muted border-transparent hover:text-[color:var(--text-primary)]'
                }`}
              >
                {entry.company}
              </button>
            ))}
          </div>

          {/* Details Content (Right side) */}
          <div className="space-y-6 pt-4 md:pt-0">
            <div>
              <h3 className="section-title text-2xl md:text-3xl text-[color:var(--text-title)] font-bold">
                <a 
                  href={portfolio.hero.resumeHref} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline"
                >
                  {activeExperience?.role}
                </a>{" "}
                <span className="text-[color:var(--accent-rose)]">
                  @ <a 
                    href="https://hoffero.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline"
                  >
                    {activeExperience?.company}
                  </a>
                </span>
              </h3>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase mt-2">
                {activeExperience?.duration}
              </p>
            </div>

            {/* Bullets */}
            <ul className="space-y-4 text-muted text-sm md:text-base leading-relaxed list-disc pl-5">
              {activeExperience?.bullets.map((bullet, idx) => (
                <li key={idx}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
