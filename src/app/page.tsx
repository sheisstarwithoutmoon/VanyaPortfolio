import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Achievements from "@/components/Achievements";
import SocialLinks from "@/components/SocialLinks";
import { portfolio } from "@/lib/portfolio";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <main className="space-y-4 md:space-y-6">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Leadership />
        <Achievements />
      </main>

      <div className="relative w-full overflow-hidden h-20 sm:h-24 my-2">
        <img
          src="/stickers/fish_pixel.png"
          alt="Pixel fish"
          className="fish-swim w-16 sm:w-20 md:w-22 h-auto pointer-events-none select-none"
        />

        <img
          src="/stickers/fish_pixel.png"
          alt="Pixel fish"
          className="fish-swim-delay w-16 sm:w-20 md:w-22 h-auto pointer-events-none select-none"
        />
      </div>
      
      <footer className="w-full text-center py-4 pb-20 text-xs sm:text-sm font-medium tracking-wide text-muted/60 space-y-1 select-none">
        <p>{portfolio.footer.line1}</p>
        <p>{portfolio.footer.line2}</p>
      </footer>

      <SocialLinks />
    </div>
  );
}