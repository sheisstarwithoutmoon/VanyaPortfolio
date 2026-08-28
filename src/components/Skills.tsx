"use client";
import { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';

export default function Skills() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for theme changes
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

  const rows = portfolio.skills.rows;
  const marquee1 = rows[0] || [];
  const marquee2 = rows[1] || [];

  // Double arrays for seamless marquee looping
  const scrollRow1 = [...marquee1, ...marquee1, ...marquee1];
  const scrollRow2 = [...marquee2, ...marquee2, ...marquee2];

  return (
    <section 
      id="skills" 
      className={`py-16 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl mb-12">
        {/* Editorial Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / skills
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>
      </div>

      {/* Dynamic Marquee Wrapper */}
      <div className="space-y-6 w-full">
        
        {/* Track 1: Left to Right */}
        <div className="marquee-container w-full">
          <div className="marquee-content-right">
            {scrollRow1.map((skill, index) => (
              <div 
                key={`r1-${index}`} 
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface)] text-[color:var(--text-primary)] font-semibold text-sm shadow-[0_4px_12px_rgba(27,19,26,0.02)] transition duration-300 hover:border-[color:var(--accent-rose)]"
              >
                {skill.logo ? (
                  <img src={skill.logo} alt={skill.name} className="h-5 w-5 object-contain" />
                ) : (
                  <span className="text-accent">✦</span>
                )}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right to Left */}
        <div className="marquee-container w-full">
          <div className="marquee-content-left">
            {scrollRow2.map((skill, index) => (
              <div 
                key={`r2-${index}`} 
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface)] text-[color:var(--text-primary)] font-semibold text-sm shadow-[0_4px_12px_rgba(27,19,26,0.02)] transition duration-300 hover:border-[color:var(--accent-lavender)]"
              >
                {skill.logo ? (
                  <img src={skill.logo} alt={skill.name} className="h-5 w-5 object-contain" />
                ) : (
                  <span className="text-accent">✦</span>
                )}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}