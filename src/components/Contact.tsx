"use client";
import { useState, useEffect } from 'react';

export default function Contact() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <section 
      id="contact" 
      className={`min-h-screen py-16 px-8 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#112240] text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-2 rounded-full text-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 cursor-default mb-8">
            Get In Touch
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Let's Work Together
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p 
              className={`text-center text-lg leading-relaxed mb-12 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="group">
              <label 
                htmlFor="name"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className={`w-full p-4 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-[#0a192f] border-gray-600 text-white placeholder-gray-400 hover:border-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Email Input */}
            <div className="group">
              <label 
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className={`w-full p-4 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-[#0a192f] border-gray-600 text-white placeholder-gray-400 hover:border-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Message Textarea */}
            <div className="group">
              <label 
                htmlFor="message"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or just say hello..."
                rows={6}
                required
                className={`w-full p-4 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical ${
                  isDarkMode
                    ? 'bg-[#0a192f] border-gray-600 text-white placeholder-gray-400 hover:border-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className={`group relative overflow-hidden px-8 py-4 border-2 rounded-lg font-medium text-lg tracking-wider uppercase transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  isDarkMode
                    ? 'border-white text-white hover:bg-white hover:text-[#0a192f] hover:shadow-lg hover:shadow-white/25'
                    : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-lg hover:shadow-gray-900/25'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Button shine effect */}
                <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent to-transparent ${
                  isDarkMode ? 'via-white/20' : 'via-black/10'
                }`} />
                <span className="relative">Send Message</span>
              </button>
            </div>
          </form>
      </div>
      </div>
          {/* Alternative Contact Methods */}
          

      {/* Background Effects */}
      {/* <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
        }`} />
      </div> */}
    </section>
  );
}