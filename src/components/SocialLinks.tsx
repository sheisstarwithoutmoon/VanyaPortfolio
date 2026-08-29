"use client";

import { Github, Linkedin, Mail, FileText, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { portfolio } from '@/lib/portfolio';

const SocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Initialize theme on component mount
  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }

    setIsMounted(true);
  }, []);

  // Smart scroll detection: auto-hide when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the very top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Scrolling down -> hide floating dock to not obstruct content
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
        // Scrolling up -> show floating dock
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Update the document class
    document.documentElement.classList.toggle('dark', newTheme);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const iconMap: Record<string, React.ReactNode> = {
    home: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    about: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <circle cx="12" cy="8" r="0.5" fill="currentColor"/>
      </svg>
    ),
    github: <Github className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
    resume: <FileText className="w-5 h-5" />,
  };

  const socialLinks = [
    ...portfolio.socialLinks.map((link) => ({
      icon: iconMap[link.key] || <FileText className="w-5 h-5" />,
      href: link.href,
      label: link.label,
      external: link.external,
      onClick: undefined,
    })),
    {
      icon: isMounted
        ? (isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)
        : <Moon className="w-5 h-5" />,
      href: "#",
      label: isMounted ? (isDarkMode ? "Light Mode" : "Dark Mode") : "Dark Mode",
      onClick: toggleTheme,
      external: undefined,
    }
  ];

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className={`flex items-center space-x-1.5 sm:space-x-2 backdrop-blur-sm rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/20 border-gray-700' 
          : 'bg-white/20 border-gray-300'
      }`}>
        {socialLinks.map((link, index) => (
          <div key={index} className="relative">
            {/* Tooltip */}
            {hoveredIndex === index && link.label !== "Dark Mode" && link.label !== "Light Mode" && (
              <div className="absolute bottom-full mb-2.5 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap shadow-md ${
                  isDarkMode 
                    ? 'bg-[#241821] text-[#f2e7df] border border-white/10' 
                    : 'bg-white text-[#120b11] border border-black/10'
                }`}>
                  {link.label}
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className={`border-l-4 border-r-4 border-t-4 border-transparent ${
                    isDarkMode 
                      ? 'border-t-[#241821]' 
                      : 'border-t-white'
                  }`}></div>
                </div>
              </div>
            )}
            
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 cursor-pointer ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-black hover:bg-black/5'
                }`}
                aria-label={link.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.icon}
              </button>
            ) : (
              <a
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className={`p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 block cursor-pointer ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-black hover:bg-black/5'
                }`}
                aria-label={link.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.icon}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;