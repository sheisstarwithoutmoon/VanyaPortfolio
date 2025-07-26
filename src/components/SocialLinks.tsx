"use client";

import { Github, Linkedin, Mail, FileText, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const SocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

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
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Update the document class
    document.documentElement.classList.toggle('dark', newTheme);
    
    // Update CSS custom properties
    if (newTheme) {
      // Dark mode
      document.documentElement.style.setProperty('--background', '#000000');
      document.documentElement.style.setProperty('--foreground', '#ffffff');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    } else {
      // Light mode
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#000000');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const socialLinks = [
    {
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>,
      href: "#hero",
      label: "Home"
    },
    {
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <circle cx="12" cy="8" r="0.5" fill="currentColor"/>
    </svg>,
      href: "#about",
      label: "About"
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/sheisstarwithoutmoon",
      label: "GitHub",
      external: true
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/vanya-awasthi/",
      label: "LinkedIn",
      external: true
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:awasthi.v23@iiits.in",
      label: "Email",
      external: true
    },
    {
      icon: <FileText className="w-5 h-5" />,
      href: "/resume.pdf",
      label: "Resume",
      external: true
    },
    {
      icon: isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />,
      href: "#",
      label: isDarkMode ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-3 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/20 border-gray-700' 
          : 'bg-white/20 border-gray-300'
      }`}>
        {socialLinks.map((link, index) => (
          <div key={index} className="relative">
            {/* Tooltip */}
            {hoveredIndex === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                <div className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                  isDarkMode 
                    ? 'bg-black/90 text-white' 
                    : 'bg-white/90 text-black border border-gray-200'
                }`}>
                  {link.label}
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className={`border-l-4 border-r-4 border-t-4 border-transparent ${
                    isDarkMode 
                      ? 'border-t-black/90' 
                      : 'border-t-white/90'
                  }`}></div>
                </div>
              </div>
            )}
            
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className={`p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
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
                className={`p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 block ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
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