"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function Research() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const papers = [
    {
      title: "A Lightweight Reinforcement Learning Framework for Othello Agents: Exploring Reward Shaping and Efficient Exploration",
      conference: "ICAART 2026 — Published",
      badge: "B-Ranked Conference",
      description: "Designed a high-performance, lightweight TD-learning architecture optimized for training competitive gameplay agents without heavy GPU resources. Investigated custom reward shaping formulas and exploration strategies to solve sparse-reward states in grid-board tactics.",
      tech: "TD-Learning • Reward Shaping • Exploration Strategy • Game AI",
      link: "https://www.scitepress.org/Link.aspx?doi=10.5220/0014326900004052"
    },
    {
      title: "Autonomous Control for Reusable Rocket Landing: Deriving a Robust Guidance through Deep Reinforcement Learning in a Custom 3D Simulation Environment",
      conference: "ICAART 2026 — Published",
      badge: "B-Ranked Conference",
      description: "Developed an autonomous control guidance framework in a custom-built 3D physical environment simulating vertical descent dynamics of rocket landing stages. Formulated robust deep reinforcement learning policies to calculate precise landing controls under adverse drag conditions.",
      tech: "Deep Reinforcement Learning • 3D Simulation • Control Systems • Rocket Guidance",
      link: "https://www.scitepress.org/Link.aspx?doi=10.5220/0014326200004052"
    }
  ];

  return (
    <section 
      id="research" 
      className={`py-16 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / research
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>

        {/* Papers Full-Width Vertical Cards */}
        <div className="space-y-6">
          {papers.map((paper, index) => (
            <div 
              key={index}
              className="panel panel-muted rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-[color:var(--stroke)] bg-[color:var(--surface-2)] shadow-[0_8px_30px_rgba(27,19,26,0.01)] transition-all duration-300 hover:border-[color:var(--accent-lavender)]/35 group"
            >
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-[color:var(--accent-lavender)] opacity-85 shrink-0 mt-1" />
                
                <div className="space-y-4 w-full">
                  {/* Conference & Badge info */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-muted font-bold uppercase tracking-wider">
                      {paper.conference}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[color:var(--accent-lavender)]/10 text-[color:var(--accent-lavender)] border border-[color:var(--accent-lavender)]/20 text-[10px] font-bold uppercase tracking-wider">
                      {paper.badge}
                    </span>
                  </div>

                  {/* Title covering full width */}
                  <h3 className="section-title text-lg md:text-xl text-[color:var(--text-title)] font-bold leading-snug group-hover:text-[color:var(--accent-lavender)] transition duration-300">
                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                      {paper.title}
                    </a>
                  </h3>

                  {/* Tech stack monospaced tags below title */}
                  <div className="text-xs font-semibold tracking-wider text-muted font-mono pt-4 border-t border-[color:var(--stroke)] w-full">
                    {paper.tech}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
