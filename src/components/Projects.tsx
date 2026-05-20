"use client";
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Folder, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const projects = [
    {
      title: "Milestone",
      description: "Digital talent marketplace designed to help organizations hire qualified freelance professionals faster with greater transparency and streamlined collaboration. The platform supports the complete engagement lifecycle including job posting, candidate discovery, structured application screening, milestone-based project management, secure payments, and post-engagement feedback.",
      image: "/images/portfolio/milestone.png",
      tech: "React.js • Node.js • Redis • MongoDB • Jest • Docker • Nginx",
      github: "https://github.com/amanraj069/Milestone-frontend",
      live: "https://milestone-aman-raj.vercel.app"
    },
    {
      title: "Cove",
      description: "Research platform designed for students, researchers, and builders who need trustworthy academic references without wasting hours filtering noisy AI-generated results. Cove focuses on delivering relevant citations, verified sources, and concise research workflows while avoiding hallucinated references and unnecessary deep-research clutter common in modern AI tools.",
      image: "/images/portfolio/cove.png",
      tech: "React.js • Node.js • Firebase • Groq • Travily",
      github: "https://github.com/sheisstarwithoutmoon/cove",
      live: "https://cove-azure.vercel.app"
    },
    {
      title: "Quickart",
      description: "Full-stack essentials delivery platform integrated with AI-powered prescription reading, visual product search, and conversational shopping assistance. Built with a strong focus on seamless UX, real-time inventory management, and smart recommendation workflows.",
      image: "/images/portfolio/quickart1.png",
      tech: "Next.js • TypeScript • Tailwind CSS • Firebase • Genkit • Groq API",
      github: "https://github.com/sheisstarwithoutmoon/Quic-kart",
      live: "https://quic-kart-five.vercel.app/"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      id="projects" 
      className={`py-16 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Editorial Header */}
        <div className="flex items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6 w-full">
            <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
              / projects
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
          </div>
        </div>

        {/* Featured Big Project Card (Autoplay Slideshow) */}
        <div className="mb-16">
          <div className="panel rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(91,42,61,0.06)] border border-[color:var(--stroke)] bg-[#1b131a]/85 group">
            {/* Backdrop Image with fade transitions */}
            <div className="relative h-[320px] md:h-[450px] overflow-hidden bg-[#241821] flex items-center justify-center p-6 border-b border-[color:var(--stroke)]">
              <img 
                src={projects[activeIndex].image} 
                alt={projects[activeIndex].title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition duration-1000 ease-in-out group-hover:scale-[1.01]"
              />

              {/* Navigation Arrows: Subtle/invisible initially, glows on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/30 hover:bg-black/60 border border-white/10 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-40 hover:!opacity-100 cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/30 hover:bg-black/60 border border-white/10 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-40 hover:!opacity-100 cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6" />
              </button>
              
              {/* Glass overlay text content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10 text-center items-center">
                
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-display transition duration-500">
                  {projects[activeIndex].title}
                </h3>
                
                <p className="text-white/90 text-sm md:text-base max-w-2xl leading-relaxed mb-4 min-h-[48px] transition duration-500">
                  {projects[activeIndex].description}
                </p>
                
                <p className="text-[#e89ab4] text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 transition duration-500">
                  {projects[activeIndex].tech}
                </p>

                {/* Project Links & Pagination Bullets */}
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="flex gap-4">
                    <a 
                      href={projects[activeIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {projects[activeIndex].live && (
                      <a 
                        href={projects[activeIndex].live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition duration-300"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Bullet Indicators */}
                  <div className="flex gap-2">
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
        </div>

        {/* 3-Column Grid of Text-Only Folder Cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`panel panel-muted rounded-3xl overflow-hidden flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1 group cursor-pointer ${
                activeIndex === index
                  ? 'border-[color:var(--accent-rose)] bg-[color:var(--accent-rose)]/5 shadow-[0_12px_40px_rgba(211,59,101,0.04)]'
                  : 'border-[color:var(--stroke)] bg-[color:var(--surface-2)] shadow-[0_8px_30px_rgba(27,19,26,0.01)] hover:border-[color:var(--accent-rose)]/30'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="p-8">
                {/* Folder card header: folder icon & links */}
                <div className="flex items-center justify-between mb-6">
                  <Folder className={`w-9 h-9 opacity-80 transition duration-300 ${
                    activeIndex === index ? 'text-[color:var(--accent-rose)] scale-110' : 'text-[color:var(--accent-rose)]'
                  }`} />
                  
                  <div className="flex items-center gap-4 text-muted">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[color:var(--accent-rose)] transition duration-300"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
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
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h4 className="section-title text-xl font-bold text-[color:var(--text-title)] mb-3 leading-tight transition duration-300 group-hover:text-[color:var(--accent-rose)]">
                  {project.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack list at bottom */}
              <div className="text-xs font-semibold tracking-wider text-muted px-8 pb-8 pt-4 border-t border-[color:var(--stroke)] mt-auto font-mono">
                {project.tech}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}