"use client";
import { useEffect, useState } from 'react';
import Sticker from './Sticker';
import { portfolio } from '@/lib/portfolio';
import { MapPin, GraduationCap } from 'lucide-react';

export default function About() {
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

  return (
    <section 
      id="about" 
      className={`py-6 md:py-8 overflow-hidden transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative">
        <Sticker
          src="/stickers/stars.png"
          alt="stars sticker"
          className="hidden md:block -left-12 top-2 lg:-left-50"
          initialRotation={6}
          width="w-56 md:w-50"
          animate="none"
          withFrame={false}
        />

        {/* Clean Header */}
        <div className="mb-6">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / about & education
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          
          {/* Biography Box */}
          <div className="neo-card p-6 md:p-8 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-rose)] text-[color:var(--background)] shadow-[2px_2px_0px_0px_var(--text-primary)] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[color:var(--text-title)] lowercase">about me</h3>
              </div>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {portfolio.profile.summary}
              </p>
            </div>
          </div>

          {/* Education Box */}
          <div className="neo-card p-6 md:p-8 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-lavender)] text-[color:var(--background)] shadow-[2px_2px_0px_0px_var(--text-primary)] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[color:var(--text-title)] lowercase">education</h3>
              </div>
              
              {portfolio.education.map((edu, idx) => (
                <div key={edu.slug || idx} className="space-y-3 pt-2">
                  <div>
                    <h4 className="font-bold text-base md:text-lg">
                      {edu.url ? (
                        <a 
                          href={edu.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-[color:var(--accent-rose)] hover:underline decoration-2 transition duration-300"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </h4>
                    <p className="text-muted text-sm md:text-base mt-1">
                      {edu.degree}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-dashed border-[color:var(--stroke)] text-sm">
                    <span className="text-muted font-medium text-xs">
                      {edu.period}
                    </span>
                    
                    {edu.gpa && (
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted">CGPA:</span>
                        <span className="font-semibold text-[color:var(--text-primary)]">
                          {edu.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}