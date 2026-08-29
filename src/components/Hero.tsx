"use client";
import React, { useState, useEffect } from 'react';
import Sticker from './Sticker';
import { portfolio } from '@/lib/portfolio';

export default function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

  // Resume download function
  const downloadResume = async () => {
    setIsDownloading(true);
    
    try {
      const response = await fetch(portfolio.hero.resumeHref, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('Resume file not found');
      }

      const link = document.createElement('a');
      link.href = portfolio.hero.resumeHref;
      link.download = portfolio.hero.resumeDownloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Sorry, the resume could not be downloaded. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="hero-editorial relative min-h-screen flex items-center justify-center">
      {/* Optimized Background Image Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url('${portfolio.hero.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full h-full bg-[#f3d1da]/70 dark:bg-[#3a2230]/70" />
      </div>

      <div className="relative z-10 w-full py-20 lg:py-0">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] pt-12 lg:pt-0">
          
          {/* Left Editorial Copy */}
          <div className="hero-fade-in flex flex-col space-y-8 max-w-2xl text-center lg:text-left items-center lg:items-start">
            
            <div className="space-y-4 w-full">
              <div className="handwritten text-4xl md:text-5xl font-normal text-[color:var(--text-title)] tracking-wide">
                {portfolio.hero.greeting}
              </div>
              <h1 className="hero-name text-6xl md:text-7xl lg:text-8xl leading-none text-[color:var(--text-title)] font-bold lowercase">
                {portfolio.hero.name}
              </h1>
              <div className="text-xs md:text-sm uppercase tracking-[0.28em] text-muted font-semibold mt-2">
                {portfolio.hero.headline}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a
                href={`mailto:${portfolio.contact.email}`}
                className="btn-primary px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-center cursor-pointer"
              >
                Get In Touch
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.replaceState(null, '', window.location.pathname);
                }}
                className="px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 bg-white text-black border border-neutral-200/80 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-100 transition-all duration-300 cursor-pointer"
              >
                My Work
              </a>
            </div>
          </div>

          {/* Right Clean Visual Column (Completely static, no motion, no backing rectangles) */}
          <div className="hero-fade-in flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative">
              <img
                src={portfolio.hero.portrait}
                alt={`${portfolio.hero.name} portrait`}
                className="w-64 sm:w-72 md:w-80 lg:w-[23rem] aspect-[4/5] object-cover rounded-3xl shadow-lg border border-[color:var(--stroke)]"
              />
              <Sticker
                src="/stickers/bow_paperpin.png"
                alt="paper pin bow sticker"
                className="-top-12 -right-8 sm:-top-50 sm:-right-30 md:-top-38 md:-right-20"
                initialRotation={30}
                width="w-20 sm:w-50 md:w-44"
                animate="none"
                withFrame={false}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}