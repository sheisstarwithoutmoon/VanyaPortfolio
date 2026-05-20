"use client";
import React, { useState, useEffect } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Open email client prefilled
    const subject = encodeURIComponent("Let's Collaborate");
    const body = encodeURIComponent(`Hello Vanya,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`);
    window.open(`mailto:awasthi.v23@iiits.in?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section 
      id="contact" 
      className={`pt-16 pb-40 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-transparent text-[color:var(--text-primary)]' : 'bg-transparent text-[color:var(--text-primary)]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Editorial Header */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="section-title text-3xl md:text-4xl text-[color:var(--text-title)] font-bold shrink-0 lowercase">
            / contact
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[color:var(--stroke)] to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start mt-8">
          
          {/* Info Card (Left) */}
          <div className="panel panel-muted rounded-3xl p-8 bg-[color:var(--surface-2)] border border-[color:var(--stroke)] shadow-[0_8px_30px_rgba(27,19,26,0.01)] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[color:var(--accent-rose)] font-bold">
                Let's Work Together
              </span>
              <h3 className="section-title text-2xl md:text-3xl text-[color:var(--text-title)] font-bold mt-2">
                direct line
              </h3>
            </div>
            
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Open to internships, collaborations, and product work where craft and engineering meet. If you are building a product or need a technical developer, I would love to hear the story.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Full-stack web and Flutter apps',
                'Product design and UX systems',
                'Creative, technical collaboration'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-[color:var(--accent-rose)] font-medium select-none text-sm">—</span>
                  <span className="text-muted text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:awasthi.v23@iiits.in?subject=Let's%20Collaborate"
                className="px-6 py-3 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-full border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] hover:border-[color:var(--accent-rose)] hover:bg-[color:var(--accent-rose)]/5 transition-all duration-300"
              >
                Email Me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-full border border-[color:var(--stroke)] text-[color:var(--text-primary)] hover:border-[color:var(--accent-lavender)] hover:bg-[color:var(--accent-lavender)]/5 transition-all duration-300"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Form Card (Right) */}
          <form
            onSubmit={handleSubmit}
            className="panel panel-muted rounded-3xl p-8 bg-[color:var(--surface-2)] border border-[color:var(--stroke)] shadow-[0_8px_30px_rgba(27,19,26,0.01)]"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider font-semibold mb-2 text-muted"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="w-full p-4 rounded-2xl border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none focus:border-[color:var(--accent-rose)] focus:ring-1 focus:ring-[color:var(--accent-rose)]/20 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider font-semibold mb-2 text-muted"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="w-full p-4 rounded-2xl border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none focus:border-[color:var(--accent-rose)] focus:ring-1 focus:ring-[color:var(--accent-rose)]/20 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider font-semibold mb-2 text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your idea..."
                  rows={5}
                  required
                  className="w-full p-4 rounded-2xl border border-[color:var(--stroke)] bg-[color:var(--surface-3)] text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] focus:outline-none focus:border-[color:var(--accent-rose)] focus:ring-1 focus:ring-[color:var(--accent-rose)]/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 text-xs font-semibold tracking-wider uppercase rounded-full border border-[color:var(--accent-rose)] bg-[color:var(--accent-rose)] text-[color:var(--background)] hover:bg-transparent hover:text-[color:var(--text-primary)] hover:border-[color:var(--accent-rose)] transition-all duration-300 cursor-pointer text-center"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}