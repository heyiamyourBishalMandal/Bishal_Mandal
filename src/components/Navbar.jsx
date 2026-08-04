import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ activeSection, scrollToSection, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed Home button as requested — Links: About, Skills, Projects, Resume, Contact
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 transform ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Floating Capsule Navbar */}
        <div className="w-full bg-[#080c10]/90 backdrop-blur-xl border border-gray-800/80 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl shadow-black/80">
          {/* Left: Circular BM Cyber-Green Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/90 border border-cybergreen/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.25)] group-hover:scale-105 transition-all duration-300">
              <img
                src="assets/logo/logo.png"
                alt="BM Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'assets/Hlogo/Hlogo.png';
                }}
              />
            </div>
          </div>

          {/* Center: Navigation Links (About, Skills, Projects, Resume, Contact) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-xs sm:text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'text-cybergreen font-bold drop-shadow-[0_0_10px_#00E676]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme Switch & Custom 2-Line Animated Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Sun/Moon Theme Toggle Box */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 sm:p-2 rounded-xl bg-gray-900/80 border border-gray-800 text-amber-400 hover:text-cybergreen transition-all duration-300 cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-cybergreen" />}
            </button>

            {/* Custom 2-Line Animated Hamburger Icon for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-900/80 border border-gray-800 flex flex-col justify-center items-center gap-1.5 w-9 h-9 cursor-pointer transition-all duration-300"
              aria-label="Toggle Mobile Menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 bg-cybergreen rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 bg-cybergreen rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="md:hidden max-w-5xl mx-auto px-4 mt-2"
          >
            <div className="bg-[#080c10]/95 backdrop-blur-2xl border border-gray-800 rounded-3xl p-5 font-sans space-y-2 shadow-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-bold transition ${
                    activeSection === item.id
                      ? 'bg-cybergreen text-black shadow-[0_0_15px_#00E676]'
                      : 'text-gray-300 hover:bg-[#121820]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
