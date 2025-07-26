"use client";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className={`py-14 overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Center content */}
          <div className="space-y-8 text-center">
            {/* Animated intro text - Two lines only */}
            <div className="space-y-4">
              <h2 
                className={`text-xl font-light mb-4 transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                } ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                I don't just solve problems,
              </h2>
              
              <h1 
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent leading-tight transition-all duration-700 delay-200 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                I reimagine what's possible.
              </h1>
            </div>

            {/* Animated Education badge */}
            <div 
              className={`flex justify-center transition-all duration-700 delay-800 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
            >
              <span className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-8 py-2 rounded-full text-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 cursor-default">
                Education
              </span>
            </div>

            {/* Animated Education Details Card */}
            <div 
              className={`backdrop-blur-sm rounded-2xl p-10 max-w-4xl mx-auto border transition-all duration-700 delay-1000 hover:shadow-xl ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              } ${
                isDarkMode
                  ? 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 hover:shadow-gray-900/20'
                  : 'bg-white/70 border-gray-200/50 hover:border-gray-300/50 hover:shadow-gray-200/20'
              }`}
            >
              <div className="flex items-start gap-8">
                {/* Animated icon */}
                <div className={`rounded-full p-4 flex-shrink-0 transition-colors duration-300 group ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <svg 
                    className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </div>
                
                <div className="text-left flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className={`text-2xl font-bold transition-colors duration-300 hover:text-purple-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Bachelor's Degree
                    </h3>
                    <span className={`text-base px-4 py-2 rounded-full ${
                      isDarkMode 
                        ? 'text-gray-400 bg-gray-800' 
                        : 'text-gray-600 bg-gray-200'
                    }`}>
                      Aug 2023 - June 2027
                    </span>
                  </div>
                  <a href="https://www.iiits.ac.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <h4 
                      className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent mb-4 hover:from-purple-500 hover:to-cyan-600 transition-all duration-300" 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, SRICITY, CHITTOOR
                    </h4>
                  </a>
                  <p 
                    className={`mb-3 text-lg transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-gray-200' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Currently pursuing B.Tech. Degree specialization in Computer Science (CSE)
                  </p>
                  <p className={`font-medium text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span className="text-green-400 font-bold hover:text-green-300 transition-colors duration-300">
                      CGPA: 9.37/10.00
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Experience badge */}
            <div 
              className={`flex justify-center transition-all duration-700 delay-1200 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90'
              }`}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-2 rounded-full text-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 cursor-default">
                Experience
              </span>
            </div>

            {/* Animated Experience Details Cards */}
            <div className="space-y-8">
              {/* Hoffero Experience */}
              <div 
                className={`backdrop-blur-sm rounded-2xl p-10 max-w-4xl mx-auto border transition-all duration-700 delay-1400 hover:shadow-xl ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                } ${
                  isDarkMode
                    ? 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 hover:shadow-gray-900/20'
                    : 'bg-white/70 border-gray-200/50 hover:border-gray-300/50 hover:shadow-gray-200/20'
                }`}
              >
                <div className="flex items-start gap-8">
                  <div className={`rounded-full p-4 flex-shrink-0 transition-colors duration-300 group hover:bg-cyan-500 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                    </svg>
                  </div>
                  
                  <div className="text-left flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 
                        className={`text-2xl font-bold transition-colors duration-300 hover:text-cyan-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        SDE Intern
                      </h3>
                      <span className={`text-base px-4 py-2 rounded-full ${
                        isDarkMode 
                          ? 'text-gray-400 bg-gray-800' 
                          : 'text-gray-600 bg-gray-200'
                      }`}>
                        May 2025 - Aug 2025
                      </span>
                    </div>
                    <a href="https://www.hoffero.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <h4 
                        className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent mb-4 hover:from-purple-500 hover:to-cyan-600 transition-all duration-300" 
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Hoffero, Singapore (Remote)
                      </h4>
                    </a>
                    <div className="space-y-3">
                      <p 
                        className={`text-lg leading-relaxed transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-gray-200' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        • Worked with APIs and implemented webhooks to set up automated messaging on creators' and hotels' Instagram accounts, enabling real-time communication and increased engagement.
                      </p>
                      <p 
                        className={`text-lg leading-relaxed transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-gray-200' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        • Utilized LangChain to enhance the accuracy and efficiency of the app's trip-planning chatbot, improving user experience and reducing response latency.
                      </p>
                      <p 
                        className={`text-lg leading-relaxed transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-gray-200' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        • Enhanced UI/UX of the webapp. Fetched insights of creators' account for hotels' to make data driven decision for collaboration. 
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6">
                      {['NodeJS', 'Flutter', 'Firebase', 'LangChain', 'Google Cloud', 'Fast API'].map((tech, index) => (
                        <span 
                          key={tech} 
                          className={`px-4 py-2 rounded-full text-base transition-all duration-300 hover:scale-105 ${
                            isDarkMode
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background animated particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-500/25 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div> */}
    </section>
  );
}