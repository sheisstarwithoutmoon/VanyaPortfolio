"use client";
import React, { useState, useEffect } from 'react';
import Sticker from './Sticker';

export default function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);

  // Resume download function
  const downloadResume = async () => {
    setIsDownloading(true);
    
    try {
      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('Resume file not found');
      }

      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Vanya_Awasthi_Resume.pdf';
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
          backgroundImage: "url('/pink.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full h-full bg-[#f3d1da]/70 dark:bg-[#3a2230]/70" />
      </div>

      <div className="relative z-10 w-full py-20 lg:py-0">
        <div className="container mx-auto px-6 max-w-5xl grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] pt-12 lg:pt-0">
          
          {/* Left Editorial Copy */}
          <div className="hero-fade-in flex flex-col space-y-8 max-w-2xl text-center lg:text-left items-center lg:items-start">
            
            <div className="space-y-4 w-full">
              <div className="handwritten text-4xl md:text-5xl font-normal text-[color:var(--text-title)] tracking-wide">
                hi, i'm
              </div>
              <h1 className="hero-name text-6xl md:text-7xl lg:text-8xl leading-none text-[color:var(--text-title)] font-bold">
                vanya awasthi
              </h1>
              <div className="text-xs md:text-sm uppercase tracking-[0.28em] text-muted font-semibold mt-2">
                developer · problem solver · researcher
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <a
                href="mailto:awasthi.v23@iiits.in?subject=Let's%20Collaborate"
                className="btn-primary px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-center"
              >
                Get in Touch
              </a>
              <button
                onClick={downloadResume}
                disabled={isDownloading}
                className="px-8 py-3.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 bg-white text-black border border-neutral-200/80 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    Download Resume
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Clean Visual Column (Completely static, no motion, no backing rectangles) */}
          <div className="hero-fade-in flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/van.jpeg"
                alt="Vanya Awasthi portrait"
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