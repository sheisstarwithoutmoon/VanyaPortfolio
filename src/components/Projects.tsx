"use client";
import React, { useState, useEffect } from 'react';
import Sticker from './Sticker';
import { Github, ExternalLink, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolio } from '@/lib/portfolio';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

export default function Projects() {
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

  const projects = portfolio.projects;
  const [activeIndex, setActiveIndex] = useState(0);

  const headerRef = useScrollReveal<HTMLDivElement>({ direction: 'left', distance: 30, duration: 600 });
  const featuredRef = useScrollReveal<HTMLDivElement>({ direction: 'scale', duration: 900, delay: 100 });
  const gridRef = useStaggerReveal<HTMLDivElement>({ direction: 'up', distance: 40, staggerMs: 120 });

  return (
    <section 
      id="projects" 
      className={`scroll-mt-16 md:scroll-mt-24 py-8 md:py-10 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative">
        <Sticker
          src="/stickers/bow_pixel.png"
          alt="pixel bow sticker"
          className="-right-2 -top-4 sm:-right-4 sm:-top-6 lg:-right-10"
          initialRotation={-10}
          width="w-24 md:w-28"
          animate="none"
          withFrame={false}
        />

        {/* Clean Header */}
        <div className="mb-6" ref={headerRef}>
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-extrabold lowercase">
            / projects
          </h2>
        </div>

        {/* Featured Big Project Card (Autoplay / Manual Slideshow) */}
        <div className="mb-10" ref={featuredRef}>
          <div className="panel rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(91,42,61,0.06)] border border-[color:var(--stroke)] bg-[#1b131a]/85 group">
            {/* Backdrop Image with fade transitions */}
            <div className="relative h-[320px] md:h-[450px] overflow-hidden bg-[#241821] flex items-center justify-center p-6 border-b border-[color:var(--stroke)]">
              <img 
                src={projects[activeIndex].image} 
                alt={projects[activeIndex].title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition duration-1000 ease-in-out group-hover:scale-[1.01]"
              />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/40 hover:bg-black/70 border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/40 hover:bg-black/70 border border-white/20 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6" />
              </button>
              
              {/* Overlay text content centered */}
              <div className="absolute inset-0 bg-black/65 md:bg-gradient-to-t md:from-black/90 md:via-black/55 md:to-black/30 backdrop-blur-[2px] md:backdrop-blur-none flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 text-center">
                
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display transition duration-500">
                  {projects[activeIndex].title}
                </h3>
                
                {/* Description: hidden on phone, visible on tablet/desktop */}
                <p className="hidden md:block text-white/90 text-sm md:text-base max-w-2xl leading-relaxed mb-4 min-h-[48px] transition duration-500">
                  {projects[activeIndex].description}
                </p>
                
                <p className="text-[#e89ab4] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 md:mb-6 transition duration-500 px-4 max-w-md">
                  {projects[activeIndex].tech}
                </p>

                {/* Project Links */}
                <div className="flex gap-3.5 sm:gap-4 mb-2 md:mb-0">
                  <a 
                    href={projects[activeIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/15 hover:bg-white/30 text-white rounded-full transition duration-300 backdrop-blur-sm shadow-md cursor-pointer"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {projects[activeIndex].live && (
                    <a 
                      href={projects[activeIndex].live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/15 hover:bg-white/30 text-white rounded-full transition duration-300 backdrop-blur-sm shadow-md cursor-pointer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Bullet Indicators pinned cleanly at bottom */}
                <div className="absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx ? 'w-6 bg-[color:var(--accent-rose)]' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Grid of Spacious Folder Cards (Full Description, No Truncation) */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6" ref={gridRef}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`panel panel-muted rounded-3xl overflow-hidden flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${
                activeIndex === index
                  ? 'border-[color:var(--accent-rose)] bg-[color:var(--accent-rose)]/5 shadow-[0_12px_40px_rgba(211,59,101,0.04)]'
                  : 'border-[color:var(--card-border)] bg-[color:var(--surface-2)] shadow-[0_8px_30px_rgba(27,19,26,0.01)] hover:border-[color:var(--accent-rose)]'
              }`}
              onClick={() => setActiveIndex(index)}
              data-reveal
            >
              <div className="p-7 md:p-8">
                {/* Folder card header: folder icon & links */}
                <div className="flex items-center justify-between mb-5">
                  <Folder className={`w-8 h-8 opacity-85 transition duration-300 ${
                    activeIndex === index ? 'text-[color:var(--accent-rose)] scale-105' : 'text-[color:var(--accent-rose)]'
                  }`} />
                  
                  <div className="flex items-center gap-3.5 text-muted">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[color:var(--accent-rose)] transition duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[color:var(--accent-lavender)] transition duration-300"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title and Full Description */}
                <h4 className="section-title text-xl font-bold text-[color:var(--text-title)] mb-3 leading-tight transition duration-300">
                  {project.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack list at bottom */}
              <div className="text-xs font-semibold tracking-wider text-muted px-7 md:px-8 pb-7 md:pb-8 pt-4 border-t border-[color:var(--stroke)] mt-auto font-mono">
                {project.tech}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}