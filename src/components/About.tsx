"use client";
import { useEffect, useState } from 'react';
import Sticker from './Sticker';

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
      className={`py-16 overflow-hidden transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl relative">
        <Sticker
          src="/stickers/stars.png"
          alt="stars sticker"
          className="hidden md:block -left-12 top-2 lg:-left-50"
          initialRotation={6}
          width="w-56 md:w-50"
          animate="none"
          withFrame={false}
        />
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Bio text */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
                / about
              </h2>
              <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
            </div>
            
            <p className="section-lead text-muted text-lg leading-relaxed">
              I'm a third year CSE undergrad at IIIT Sri City who enjoys building things and understanding how systems work behind the scenes. I like stepping into new domains and figuring things out as I go. I'd say I'm a curious learner and fairly adaptable. I enjoy taking on problems that are new to me and learning whatever is needed to solve them.
            </p>
          </div>

          {/* Minimalist Editorial Education block (Matches the theme of other sections) */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
                / education
              </h2>
              <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="section-title text-xl md:text-2xl text-[color:var(--text-title)] font-bold leading-tight">
                  <a 
                    href="https://www.iiits.ac.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[color:var(--accent-rose)] hover:underline hover:underline-offset-4 transition duration-300"
                  >
                    Indian Institute of Information Technology, Sri City
                  </a>
                </h3>
                <p className="text-muted text-base font-semibold mt-2">
                  B.Tech in Computer Science & Engineering (Honors)
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <span className="text-[color:var(--text-primary)] font-medium text-sm">
                  Aug. 2023 - June 2027
                </span>
                
                <div className="flex items-center gap-1 text-sm font-medium text-[color:var(--text-primary)]">
                  <span>CGPA:</span>
                  <span className="font-bold text-[color:var(--accent-rose)]">9.38</span>
                  <span>/ 10.0</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}