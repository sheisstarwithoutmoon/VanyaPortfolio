"use client";
import { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

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

  const skillCategories = portfolio.skillCategories;

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const gridRef = useStaggerReveal<HTMLDivElement>({ direction: 'up', distance: 40, staggerMs: 90 });

  return (
    <section 
      id="skills" 
      className={`scroll-mt-16 md:scroll-mt-24 py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / skills
          </h2>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch" ref={gridRef}>
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="neo-card p-5 md:p-6 flex flex-col justify-start h-full"
              data-reveal
            >
              {/* Category Title */}
              <h3 className="text-base md:text-lg text-[color:var(--text-title)] font-extrabold leading-snug mb-3.5 capitalize">
                {category.title}
              </h3>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] text-xs md:text-sm font-medium transition duration-200"
                  >
                    {skill.logo && (
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-4 h-4 object-contain shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}