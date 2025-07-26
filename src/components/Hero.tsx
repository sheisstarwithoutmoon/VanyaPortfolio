"use client";
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Home, CheckCircle, Mail, FileText, Sun } from 'lucide-react';

export default function Hero() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Resume download function
  const downloadResume = async () => {
    setIsDownloading(true);
    
    try {
      // Check if file exists first (optional, for better UX)
      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('Resume file not found');
      }

      // Create download link
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Make sure your resume.pdf is in the public folder
      link.download = 'Vanya_Awasthi_Resume.pdf'; // Custom download filename
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
    <section className="min-h-screen relative overflow-hidden transition-all duration-300">
      {/* Background image with theme-responsive opacity */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
          isDarkMode ? 'opacity-25' : 'opacity-40'
        }`}
        style={{
          backgroundImage: `url('/bgg.jpg')`
        }}
      ></div>
      
      {/* Theme-responsive overlay */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isDarkMode 
          ? ' bg-opacity-70' 
          : 'bg-transparent'
      }`}></div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ zIndex: 10 }}>
        {/* Cyan line accent */}
        <div className="w-24 h-0.5 bg-cyan-400 mb-12"></div>
        
        {/* Hello text */}
        <div className="mb-8">
          <span className={`text-lg font-light tracking-wider transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            HELLO, WORLD
          </span>
        </div>

        {/* Main heading with gradient text */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-12 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span className={`font-light transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            I'm Vanya{' '}
          </span>
          <span 
            className="font-light bg-gradient-to-r from-purple-400 via-purple-500 to-green-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Awasthi
          </span>
        </h1>

        {/* Role descriptors */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
          <span 
            className={`text-base md:text-lg font-light tracking-wider border-l-2 pl-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-300 border-gray-600' 
                : 'text-gray-600 border-gray-400'
            }`}
            style={{ 
              animation: 'fadeInUp 0.8s ease-out 0.5s both',
              opacity: 0
            }}
          >
            STUDENT
          </span>
          <span 
            className={`text-base md:text-lg font-light tracking-wider border-l-2 pl-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-300 border-gray-600' 
                : 'text-gray-600 border-gray-400'
            }`}
            style={{ 
              animation: 'fadeInUp 0.8s ease-out 0.8s both',
              opacity: 0
            }}
          >
            DEVELOPER
          </span>
          <span 
            className={`text-base md:text-lg font-light tracking-wider border-l-2 pl-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-300 border-gray-600' 
                : 'text-gray-600 border-gray-400'
            }`}
            style={{ 
              animation: 'fadeInUp 0.8s ease-out 1.1s both',
              opacity: 0
            }}
          >
            PROBLEM SOLVER
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
        <button 
          className={`px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-sm ${
            isDarkMode
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
          onClick={() => window.open('mailto:awasthi.v23@iiits.in?subject=Contact%20Inquiry&body=Hello,%20I%20would%20like%20to%20get%20in%20touch.', '_self')}
          suppressHydrationWarning
        >
          Get In Touch
        </button>
          <button 
            onClick={downloadResume}
            disabled={isDownloading}
            className={`border-2 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-2 ${
              isDownloading
                ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                : isDarkMode
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
            {isDownloading ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            ) : (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-current"
              >
                <path
                  d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                  fill="currentColor"
                />
                <path
                  d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}