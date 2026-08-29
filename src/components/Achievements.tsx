"use client";
import React, { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

type AchievementItem = {
  title: string;
  description: string;
  link?: string;
};

export default function Achievements() {
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

  const achievements = portfolio.achievements as AchievementItem[];

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const cardsRef = useStaggerReveal<HTMLDivElement>({ direction: 'up', distance: 40, staggerMs: 100 });

  return (
    <section 
      id="achievements" 
      className={`pt-4 pb-2 md:pt-6 md:pb-3 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / achievements
          </h2>
        </div>

        {/* Balanced 2x2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch" ref={cardsRef}>
          {achievements.map((achievement, index) => {
            const cardContent = (
              <>
                <h3 className="text-base md:text-lg text-[color:var(--text-title)] font-extrabold leading-snug mb-2 group-hover:text-[color:var(--accent-rose)] transition duration-200">
                  {achievement.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </>
            );

            if (achievement.link) {
              return (
                <a
                  key={index}
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-card p-5 md:p-6 flex flex-col justify-start h-full group cursor-pointer block no-underline transition-all duration-300"
                  data-reveal
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div 
                key={index}
                className="neo-card p-5 md:p-6 flex flex-col justify-start h-full group"
                data-reveal
              >
                {cardContent}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}