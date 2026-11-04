import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowDown } from 'lucide-react';

export default function DeveloperShowcase({ scrollToSection }) {
  const sectionRef = useRef(null);

  // Smooth Parallax Scroll Tracking for Giant Watermark Text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [-25, 45]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 1.05]);

  return (
    <section
      ref={sectionRef}
      id="developer"
      className="py-16 sm:py-24 md:py-28 px-4 sm:px-8 relative z-10 border-t border-gray-800/60 bg-[#080c10] overflow-hidden transition-colors duration-500"
    >
      {/* 1. GIANT GREEN ANIMATED WATERMARK HEADING (DEVELOPER - Under 3D Scrolling Effect End) */}
      <div className="absolute top-2 sm:top-6 left-0 right-0 z-0 pointer-events-none select-none flex justify-center overflow-hidden px-1">
        <motion.h2
          style={{
            y: titleY,
            scale: titleScale,
          }}
          className="text-[15.5vw] sm:text-[13.5vw] uppercase text-center whitespace-nowrap select-none developer-green-shimmer"
        >
          DEVELOPER
        </motion.h2>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 pt-10 sm:pt-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/40 text-cybergreen text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,230,118,0.2)] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-cybergreen" />
            <span>ENGINEERING PRECISION &bull; ARCHITECTURAL MASTERY</span>
          </div>

          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Systems <span className="text-cybergreen">Architecture.</span>
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 font-mono uppercase tracking-[0.2em] mt-2.5">
            Architecting computational frameworks with high-yield mathematical efficiency.
          </p>
        </motion.div>

        {/* 2. Sleek Executive Telemetry Tiles (No duplicate paragraph text) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
        >
          <div className="bg-[#0b0f15]/80 backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-5 rounded-2xl sm:rounded-3xl hover:border-cybergreen/40 transition-all duration-300 shadow-xl group">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
              01 // RESEARCH
            </span>
            <span className="block text-base sm:text-xl font-bold text-white group-hover:text-cybergreen transition-colors">
              IIT Kharagpur
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-mono block mt-0.5">
              Dept. of CSE Intern
            </span>
          </div>

          <div className="bg-[#0b0f15]/80 backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-5 rounded-2xl sm:rounded-3xl hover:border-cybergreen/40 transition-all duration-300 shadow-xl group">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
              02 // DEGREE
            </span>
            <span className="block text-base sm:text-xl font-bold text-white group-hover:text-cybergreen transition-colors">
              BCA Graduate
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-mono block mt-0.5">
              Class of 2025
            </span>
          </div>

          <div className="bg-[#0b0f15]/80 backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-5 rounded-2xl sm:rounded-3xl hover:border-cybergreen/40 transition-all duration-300 shadow-xl group">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
              03 // INTELLIGENCE
            </span>
            <span className="block text-base sm:text-xl font-bold text-white group-hover:text-cybergreen transition-colors">
              J.E.R.V.I.S GUI
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-mono block mt-0.5">
              PyQt6 Voice AI
            </span>
          </div>

          <div className="bg-[#0b0f15]/80 backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-5 rounded-2xl sm:rounded-3xl hover:border-cybergreen/40 transition-all duration-300 shadow-xl group">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
              04 // LOCATION
            </span>
            <span className="block text-base sm:text-xl font-bold text-white group-hover:text-cybergreen transition-colors">
              Kolkata, India
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-mono block mt-0.5">
              High-Yield Systems
            </span>
          </div>
        </motion.div>

        {/* 3. Transition Link to Skills Section */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => scrollToSection && scrollToSection('skills')}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cybergreen/40 text-xs font-mono text-gray-400 hover:text-cybergreen transition-all duration-300 cursor-pointer group"
          >
            <span>NEXT: TECHNICAL POWER GRID</span>
            <ArrowDown className="w-3.5 h-3.5 text-cybergreen group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
