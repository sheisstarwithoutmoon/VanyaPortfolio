"use client";
import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

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

  const achievements = [
    {
      title: "Flipkart GRiD 7.0 Semifinalist",
      description: "Qualified as National Semifinalist in Flipkart GRiD 7.0"
    },
    {
      title: "Academic Excellence Award",
      description: "Received twice in recognition of outstanding academic performance and maintaining an exceptional GPA."
    }
  ];

  return (
    <section 
      id="achievements" 
      className={`py-16 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / achievements
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>

        {/* Achievements Full-Width Vertical Cards */}
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="panel panel-muted rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-[color:var(--stroke)] bg-[color:var(--surface-2)] shadow-[0_8px_30px_rgba(27,19,26,0.01)] transition-all duration-300 hover:border-[color:var(--accent-rose)]/35 group"
            >
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-[color:var(--accent-rose)] opacity-85 shrink-0 mt-1" />
                
                <div className="space-y-4 w-full">
                  <div className="flex flex-col gap-2">
                    {/* Header: Title */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="section-title text-lg md:text-xl text-[color:var(--text-title)] font-bold leading-snug group-hover:text-[color:var(--accent-rose)] transition duration-300">
                        {achievement.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted text-sm md:text-base leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}