"use client";
import { useState, useEffect } from 'react';

export default function Skills() {
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

  const skillsData = {
    "Languages": [
      { name: "C++", img: "https://cdn.svgporn.com/logos/c-plusplus.svg", color: "from-blue-600 to-blue-800" },
      { name: "Python", img: "https://cdn.svgporn.com/logos/python.svg", color: "from-yellow-500 to-blue-600" },
      { name: "Java", img: "https://cdn.svgporn.com/logos/java.svg", color: "from-orange-600 to-red-600" },
      { name: "HTML", img: "/html.svg", color: "from-orange-500 to-red-500" },
      { name: "CSS", img: "/css.svg", color: "from-blue-500 to-cyan-500" },
      { name: "JavaScript", img: "https://cdn.svgporn.com/logos/javascript.svg", color: "from-yellow-400 to-yellow-600" },
      { name: "Dart", img:"/dart.png", color: "from-blue-400 to-cyan-400" }
    ],
    "Frameworks": [
      { name: "Flutter", img: "/flutter.png", color: "from-blue-400 to-cyan-400" },
      { name: "Firebase", img: "/firebase.png", color: "from-yellow-500 to-orange-500" },
      { name: "Next.js", img: "https://cdn.svgporn.com/logos/nextjs-icon.svg", color: "from-gray-800 to-black" },
      { name: "React.js", img: "https://cdn.svgporn.com/logos/react.svg", color: "from-cyan-400 to-blue-500" },
      { name: "Node.js", img: "https://cdn.svgporn.com/logos/nodejs-icon.svg", color: "from-green-500 to-green-700" },
      { name: "Tailwind CSS", img: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg", color: "from-cyan-400 to-blue-500" },
      { name: "REST API", icon: "🔗", color: "from-purple-500 to-pink-500" }
    ],
    "Tools": [
      { name: "Git", img: "https://cdn.svgporn.com/logos/git-icon.svg", color: "from-orange-500 to-red-500" },
      { name: "GitHub", img: "/github.svg", color: "from-gray-600 to-gray-800" },
      { name: "Android Studio", img: "/as.png", color: "from-green-500 to-blue-500" },
      { name: "Google Cloud", img: "/gcp.png", color: "from-blue-500 to-cyan-500" }
    ],
    "Database": [
      { name: "MySQL", img: "mysql.png", color: "from-orange-500 to-blue-600" },
      { name: "MongoDB", img: "https://cdn.svgporn.com/logos/mongodb-icon.svg", color: "from-green-500 to-green-700" }
    ]
  };

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
        My Skills
          </div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="space-y-6">
              {/* Category Title */}
              <h2 
                className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {category}
              </h2>
              
              {/* Skills Grid */}
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`
                      group relative overflow-hidden
                      flex items-center gap-3 
                      px-6 py-3 
                      backdrop-blur-sm
                      border rounded-full 
                      hover:transform hover:-translate-y-1
                      transition-all duration-300 ease-out
                      cursor-pointer
                      ${isDarkMode 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                        : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
                      }
                    `}
                  >
                    {/* Shine Effect */}
                    <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent to-transparent ${
                      isDarkMode ? 'via-white/10' : 'via-black/10'
                    }`} />
                    
                    {/* Icon or SVG */}
                    <div className={`
                      flex items-center justify-center 
                      w-6 h-6 rounded-full 
                      text-xs font-bold text-white
                      shadow-lg
                      ${skill.img 
                        ? (isDarkMode ? 'bg-white/10' : 'bg-black/10') 
                        : `bg-gradient-to-r ${skill.color}`
                      }
                    `}>
                      {skill.img ? (
                        <img 
                          src={skill.img} 
                          alt={skill.name} 
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        skill.img
                      )}
                    </div>
                    
                    {/* Skill Name */}
                    <span 
                      className={`font-medium transition-colors duration-300 group-hover:text-cyan-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
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