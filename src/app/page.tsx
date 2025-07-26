import Image from "next/image";
import Hero from "@/components/Hero";
import About from "../components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Achievements from "@/components/Achievements";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <SocialLinks />
    </div>
  );
}