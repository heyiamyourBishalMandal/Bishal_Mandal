import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HeroHome from './components/HeroHome';
import AboutScrollytelling from './components/AboutScrollytelling';
import AboutDossier from './components/AboutDossier';
import SkillsSection from './components/SkillsSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import CareerRoadmap from './components/CareerRoadmap';
import CyberTerminalContact from './components/CyberTerminalContact';
import { Linkedin } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [darkMode, setDarkMode] = useState(true);

  // Sync Tailwind dark mode class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Section Observer for Navbar Highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'about-dossier', 'skills', 'projects', 'resume', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId === 'about-dossier' ? 'about' : secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#080c10] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans selection:bg-cybergreen selection:text-black">
      {/* Opening Splash Screen Loader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main App Content */}
      {!loading && (
        <>
          {/* Floating Capsule Navbar */}
          <Navbar
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Main Content Sections */}
          <main>
            <HeroHome scrollToSection={scrollToSection} />
            <AboutScrollytelling scrollToSection={scrollToSection} />
            <AboutDossier scrollToSection={scrollToSection} />
            <SkillsSection />
            <ProjectsShowcase />
            <CareerRoadmap />
            <CyberTerminalContact />
          </main>

          {/* Coding Ninjas Style Footer */}
          <footer className="relative pt-16 pb-8 sm:pb-12 border-t border-gray-800/60 bg-[#05080c] text-center flex flex-col items-center justify-center overflow-hidden">
            {/* Upper Footer: Social & Copyright */}
            <div className="flex flex-col items-center justify-center space-y-3 z-10 mb-8 sm:mb-12">
              <a
                href="https://www.linkedin.com/in/bishal-mandal-0bb756264/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#0d131a] border border-gray-800 text-gray-300 hover:text-cybergreen hover:border-cybergreen/50 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5 group-hover:scale-110 transition duration-300" />
              </a>

              <p className="text-[11px] font-sans text-gray-500 tracking-wide">
                &copy; 2026 Bishal Mondal &bull; All rights reserved.
              </p>
            </div>

            {/* Coding Ninjas Style Giant Watermark Brand Text with Translucent Slanted Wave */}
            <div className="w-full flex items-center justify-center px-4 select-none pointer-events-none overflow-hidden">
              <h2 className="text-[2.8rem] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-extrabold tracking-tighter leading-none coding-ninjas-text-shimmer">
                Bishal Mondal
              </h2>
            </div>

            {/* Back to Top Quick Action */}
            <div className="pt-8 z-10">
              <button
                onClick={() => scrollToSection('hero')}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cybergreen/40 text-xs font-mono text-gray-400 hover:text-cybergreen transition-all duration-300 cursor-pointer group"
              >
                <span>BACK TO TOP</span>
                <span className="text-cybergreen group-hover:-translate-y-0.5 transition-transform font-bold">↑</span>
              </button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
