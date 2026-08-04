import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroScrollytelling from './components/HeroScrollytelling';
import AboutDossier from './components/AboutDossier';
import SkillsSection from './components/SkillsSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import CareerRoadmap from './components/CareerRoadmap';
import CyberTerminalContact from './components/CyberTerminalContact';
import { Linkedin } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dynamic Scroll-Activated Navbar Tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-gray-900 dark:bg-[#080c10] dark:text-gray-100 transition-colors duration-500 relative selection:bg-cybergreen selection:text-black">
      {/* High-Tech Animated Preloader Intro */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Website Experience */}
      {!isLoading && (
        <>
          {/* Navbar Header (With dynamic active tab animation on scroll) */}
          <Navbar
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Main Content Sections */}
          <main>
            <HeroScrollytelling scrollToSection={scrollToSection} darkMode={darkMode} />
            <AboutDossier />
            <SkillsSection />
            <ProjectsShowcase />
            <CareerRoadmap />
            <CyberTerminalContact />
          </main>

          {/* Sleek Minimalist Footer (100% Matching User Screenshot) */}
          <footer className="py-12 border-t border-gray-800/60 bg-[#05080c] text-center flex flex-col items-center justify-center space-y-3">
            {/* Circular LinkedIn Badge */}
            <a
              href="https://www.linkedin.com/in/bishal-mandal-5079a4309/"
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
