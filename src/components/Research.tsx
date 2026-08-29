"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { portfolio } from '@/lib/portfolio';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

export default function Research() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const papers = portfolio.research;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const cardsRef = useStaggerReveal<HTMLDivElement>({ direction: 'up', distance: 50, staggerMs: 150 });

  return (
    <section 
      id="research" 
      className={`py-6 md:py-8 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / research
          </h2>
        </div>

        {/* Neobrutalist Accordion Cards */}
        <div className="space-y-4" ref={cardsRef}>
          {papers.map((paper, index) => (
            <div 
              key={index}
              className="neo-card overflow-hidden !p-0"
              data-reveal
            >
              {/* Accordion Header — clickable */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer transition-colors"
                aria-expanded={openIndex === index}
              >
                {/* Title + Badges (Both identical size, font, padding, and color) */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  <h3 className="font-bold text-base md:text-lg text-[color:var(--text-primary)] leading-snug pr-2">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[color:var(--accent-lavender)]/15 text-[color:var(--text-primary)] border border-[color:var(--accent-lavender)]/30 font-mono font-bold text-[11px] uppercase tracking-wider">
                      {paper.conference}
                    </span>
                    {paper.badge && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[color:var(--accent-lavender)]/15 text-[color:var(--text-primary)] border border-[color:var(--accent-lavender)]/30 font-mono font-bold text-[11px] uppercase tracking-wider">
                        {paper.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Chevron */}
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 border-[color:var(--text-primary)] bg-[color:var(--surface-3)] shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Accordion Content — expandable */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-5 md:px-6 pb-6 pt-2 space-y-4 border-t border-dashed border-[color:var(--stroke)] bg-[color:var(--surface-3)]/30">
                  {/* Description / Summary */}
                  <p className="text-muted text-sm md:text-base leading-relaxed pt-2">
                    {paper.description}
                  </p>

                  {/* Tech tags */}
                  {paper.tech && (
                    <div className="text-xs font-semibold tracking-wider text-muted font-mono pt-1">
                      {paper.tech}
                    </div>
                  )}

                  {/* Link to paper */}
                  {paper.link && (
                    <div className="pt-2">
                      <a 
                        href={paper.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[color:var(--text-primary)] bg-[color:var(--accent-lavender)] text-[color:var(--background)] font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_var(--text-primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
                      >
                        Read Paper
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
