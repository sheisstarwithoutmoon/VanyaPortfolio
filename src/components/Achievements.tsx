"use client";
import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { portfolio } from '@/lib/portfolio';

type AchievementItem = {
  title: string;
  description: string;
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

  return (
    <section 
      id="achievements" 
      className={`py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / achievements
          </h2>
        </div>

        {/* Achievement Cards */}
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="neo-card p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-rose)] text-[color:var(--background)] shadow-[2px_2px_0px_0px_var(--text-primary)] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 w-full">
                <h3 className="text-lg md:text-xl text-[color:var(--text-title)] font-bold">
                  {achievement.title}
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}