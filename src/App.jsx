import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HeroScrollytelling from './components/HeroScrollytelling';
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
      const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
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
            <HeroScrollytelling scrollToSection={scrollToSection} darkMode={darkMode} />
            <AboutDossier scrollToSection={scrollToSection} />
            <SkillsSection />
            <ProjectsShowcase />
            <CareerRoadmap />
            <CyberTerminalContact />
          </main>

          {/* Sleek Minimalist Footer (Updated LinkedIn Link) */}
          <footer className="py-12 border-t border-gray-800/60 bg-[#05080c] text-center flex flex-col items-center justify-center space-y-3">
            {/* Circular LinkedIn Badge */}
            <a
              href="https://www.linkedin.com/in/bishal-mandal-0bb756264/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-[#0d131a] border border-gray-800 text-gray-300 hover:text-cybergreen hover:border-cybergreen/50 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
              title="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5 group-hover:scale-110 transition duration-300" />
            </a>

            {/* Brand Title */}
            <h3 className="text-sm font-black tracking-[0.2em] text-white uppercase pt-1">
              BISHAL MANDAL
            </h3>

            {/* Copyright Line */}
            <p className="text-[11px] font-sans text-gray-500 tracking-wide">
              &copy; 2026 All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
