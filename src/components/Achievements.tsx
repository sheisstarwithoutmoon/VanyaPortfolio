"use client";
import { useState, useEffect } from 'react';

export default function Achievements() {
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

  const achievements = [
    {
      title: "Flipkart Grid Semifinalist",
      description: "Qualified as Semifinalist in Flipkart Grid, demonstrating excellence in software engineering and problem-solving capabilities.",
      icon: "🛒",
      category: "Competition",
      color: "from-blue-500 to-indigo-600",
      link: "https://www.linkedin.com/posts/activity-7354480604358332416-Oa2k?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9TmX0BvDGR5Ui_yfd9lHSeTZ6fUFto4HQ"
    },
    {
      title: "Codeforces Rating",
      description: "Achieved a rating of max. 1276 (Pupil) on Codeforces, demonstrating strong problem-solving and algorithmic skills.",
      icon: "🏆",
      category: "Competitive Programming",
      color: "from-yellow-500 to-orange-500",
      link: "https://codeforces.com/profile/vanyacodes"
    },
    {
      title: "International Healthcare Hackathon",
      description: "Secured 35th rank among 350+ teams in International Healthcare Hackathon organized by IISc Bangalore and IIIT Sri City.",
      icon: "🩺",
      category: "Hackathon (Team Name - Team Alpha)",
      color: "from-green-500 to-blue-500",
      link: "https://keepthescore.com/board/pzvvwsstynwxr/?public=true"
    },
    {
      title: "Academic Excellence Award",
      description: "Academic Excellence Award for CGPA at IIIT Sri City.",
      icon: "🎓",
      category: "Academic",
      color: "from-purple-500 to-pink-500",
      // link:""
    },
    {
      title: "App-a-thon 2024",
      description: "2nd runner up at App-a-thon 2024 organized by iLabs, Hyderabad — April, 2024.",
      icon: "📱",
      category: "App Development",
      color: "from-cyan-500 to-blue-500",
      link: "https://www.linkedin.com/posts/activity-7173946725533990912-oy03?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9TmX0BvDGR5Ui_yfd9lHSeTZ6fUFto4HQ"
    },
    {
      title: "JEE Main Excellence",
      description: "Secured Top 2.56 %ile in Joint Entrance Examination (JEE) Main, over more than 1.1 Million Students.",
      icon: "🎯",
      category: "Entrance Exam",
      color: "from-red-500 to-pink-500",
      // link: ""
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
        Achievements & Certifications
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <a
              key={index}
              href={achievement.link}
              target={achievement.link && !achievement.link.startsWith('mailto:') ? '_blank' : '_self'}
              rel={achievement.link && !achievement.link.startsWith('mailto:') ? 'noopener noreferrer' : ''}
              className={`group relative overflow-hidden backdrop-blur-sm border rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer block ${
                isDarkMode
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/80 border-gray-200/50 hover:bg-white hover:border-gray-300/50 shadow-lg hover:shadow-xl'
              } ${!achievement.link ? 'cursor-default' : ''}`}
            >
              {/* Shine Effect */}
              <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent to-transparent ${
                isDarkMode ? 'via-white/10' : 'via-black/5'
              }`} />
              
              {/* Achievement Content */}
              <div className="p-6 space-y-4">
                {/* Icon and Category */}
                <div className="flex items-center justify-between">
                  <div className={`
                    flex items-center justify-center 
                    w-12 h-12 rounded-full 
                    bg-gradient-to-r ${achievement.color}
                    text-2xl font-bold text-white
                    shadow-lg group-hover:scale-110 transition-transform duration-300
                  `}>
                    {achievement.icon}
                  </div>
                  <span className={`px-3 py-1 border rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-cyan-300'
                      : 'bg-cyan-50 border-cyan-200 text-cyan-600'
                  }`}>
                    {achievement.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 
                  className={`text-xl font-bold transition-colors duration-300 group-hover:text-cyan-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {achievement.title}
                </h3>
                
                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {achievement.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className={`h-1 bg-gradient-to-r ${achievement.color} group-hover:h-2 transition-all duration-300`} />
            </a>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              1276
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Max Codeforces Rating
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              35/350+
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Healthcare Hackathon Rank
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              3rd
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              App-a-thon Position
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              97.49%ile
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              JEE Main Percentile
            </div>
          </div>
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