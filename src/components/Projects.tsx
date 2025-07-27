"use client";
import { useState, useEffect } from 'react';
// import Image from 'next/image';

export default function Projects() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    updateTheme();

    // Listen for class changes on documentElement
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
      title: "Quickart",
      description: "Developed a full-stack essentials delivery website with real-time tracking, OTP-verified handoffs and AI-assisted shopping. Integrated Gemini AI for visual search, prescription reading, and chat-based shopping assistance. Designed responsive, role-based dashboards with a community-first, zero-profit model for areas underserved by Blinkit, Zepto or PharmEasy.",
      image: "/quickart.png",
      tech: ["NextJs", "ReactJS", "Tailwind CSS", "Firebase", "Gen AI"],
      github: "https://github.com/sheisstarwithoutmoon/Quic-kart",
      live: "https://quic-kart-dof1gt79p-vanyas-projects-ed11fcee.vercel.app/"
    },
    {
      title: "Harvest Hub",
      description: "Built a cross-platform mobile app to support farmers with crop inventory tracking, equipment requests, and 24/7 AI consultation. Designed for rural accessibility with multilingual support and a simple UI.",
      image: "/harvesthub.png",
      tech: ["Flutter", "Firebase", "OpenStreetMap", "Dart"],
      github: "https://github.com/sheisstarwithoutmoon/Harvest-Hub",
      live: "https://github.com/sheisstarwithoutmoon/Harvest-Hub/blob/main/app-release.apk"
    },
    {
      title: "Othello Player",
      description: "Implemented a lightweight, AlphaZero-inspired Othello agent using TD(λ) n-tuple learning, enabling fast and efficient self-play training without GPU acceleration. Applied Monte Carlo Tree Search (MCTS) only during test time to significantly enhance move quality and playing strength without increasing training complexity. Achieved competitive gameplay performance and benchmarking against Edax Othello engine (up to level 5).",
      image: "/othello.png",
      tech: ["Python", "NumPy", "MCTS", "TD Learning", "Edax", "Reinforcement Learning"],
      github: "https://github.com/sheisstarwithoutmoon/ResearchOnOthello",
    }
  ];

  return (
    <section className={`min-h-screen py-16 px-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purpl-400 to-purple-500 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } px-8 py-2 rounded-full text-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 cursor-default">
            My Projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden backdrop-blur-sm border rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/80 border-gray-200/50 hover:bg-white hover:border-gray-300/50 shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Shine Effect */}
              <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent to-transparent ${
                isDarkMode ? 'via-white/10' : 'via-black/5'
              }`} />
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                  isDarkMode ? 'from-black/50' : 'from-white/30'
                }`} />
              </div>
              
              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 
                  className={`text-xl font-bold transition-colors duration-300 group-hover:text-cyan-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {project.title}
                </h3>
                
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 border rounded-full text-xs font-medium text-cyan-300 transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-white/10 border-white/20 hover:bg-cyan-500/20'
                          : 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100 text-cyan-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project Links */}
                <div className="flex gap-4 pt-2">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-cyan-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <span>🔗</span> GitHub
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-cyan-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <span>🚀</span> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      {/* <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
        }`} />
        <div className={`absolute top-3/4 left-3/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />
      </div> */}
    </section>
  );
}