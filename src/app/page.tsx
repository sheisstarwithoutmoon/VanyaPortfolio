import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Achievements from "@/components/Achievements";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Leadership />
        <Achievements />
      </main>

      <div className="relative w-full overflow-hidden h-24 sm:h-28 md:h-32">
        <img
          src="/stickers/fish_pixel.png"
          alt="Pixel fish"
          className="fish-swim w-20 sm:w-24 md:w-28 h-auto pointer-events-none select-none"
          loading="lazy"
        />
      </div>
      
      <footer className="w-full text-center py-10 pb-32 text-xs font-medium tracking-wide text-muted/50 space-y-1.5 select-none">
        <p>Built and designed by Vanya Awasthi.</p>
        <p>All rights reserved. ©</p>
      </footer>

      <SocialLinks />
    </div>
  );
}