import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Cpu, Sparkles, Award, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function AboutDossier({ scrollToSection }) {
  const sectionRef = useRef(null);

  // Parallax Scroll Tracking for Giant Watermark Text & Stage Card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax shifts matching OmniBuds kinetic header
  const titleY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 0.85, 0.85, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 px-4 sm:px-8 relative z-10 border-t border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#080c10]/95 transition-colors duration-500 overflow-hidden"
    >
      {/* 1. GIANT OMNIBUDS-STYLE PARALLAX WATERMARK HEADING */}
      <div className="absolute top-8 left-0 right-0 z-0 pointer-events-none select-none flex justify-center overflow-hidden">
        <motion.h1
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
          className="text-[14vw] sm:text-[13vw] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-gray-900/15 via-gray-700/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent tracking-tighter leading-none text-center whitespace-nowrap"
        >
          DEVELOPER
        </motion.h1>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-cybergreen animate-ping" />
            Developer Dossier
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Engineering <span className="text-cybergreen">Precision.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-light text-base sm:text-xl lg:text-2xl leading-relaxed">
            Software Developer & Systems Engineer with research internship experience at <strong className="text-cybergreen font-semibold">IIT Kharagpur</strong>.
          </p>
        </motion.div>

        {/* 2. MAIN OMNIBUDS-STYLE OVERLAPPING SHOWCASE STAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gray-50/90 dark:bg-[#0d1117]/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-800/90 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,230,118,0.12)] overflow-hidden transition-all duration-500 hover:border-cybergreen/40 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Media Stage with Overlaid Telemetry Badge */}
            <div className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[540px] overflow-hidden bg-black/90 flex items-center justify-center">
              <img
                src="assets/img/About_Me.jpg"
                alt="Bishal Mandal"
                className="w-full h-full object-cover object-top filter contrast-[108%] brightness-[102%] group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'img/About_Me.jpg';
                }}
              />

              {/* OmniBuds Floating Telemetry Glass Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-[#080c10]/90 backdrop-blur-xl border border-gray-800 p-4 sm:p-5 rounded-2xl shadow-2xl space-y-2.5 z-20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cybergreen uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-cybergreen" />
                    IIT KGP RESEARCH TELEMETRY
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cybergreen animate-ping" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-baseline gap-2">
                  IAP Frameworks
                </div>
                <p className="text-[11px] text-gray-300 font-sans leading-tight">
                  Web development framework for Indoor Air Pollution visualization guided by <strong className="text-white">Prof. Sandip Chakraborty</strong> (Dept. of CSE, IIT KGP).
                </p>
              </motion.div>
            </div>

            {/* Right Story Panel */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cybergreen uppercase tracking-wider bg-cybergreen/10 px-3 py-1 rounded-full border border-cybergreen/30">
                  <ShieldCheck className="w-4 h-4" />
                  SOFTWARE DEVELOPER & BCA GRADUATE
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  Bishal Mandal.
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
                Based in Kolkata, my engineering foundation bridges mathematical algorithms, responsive full-stack web applications, and Python desktop automation—highlighted by my research internship at <strong className="text-gray-900 dark:text-white font-semibold">IIT Kharagpur</strong>.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl hover:border-cybergreen/50 transition-colors">
                  <span className="block text-xl sm:text-2xl font-black text-cybergreen">IIT KGP</span>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">Research Intern</span>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl hover:border-cybergreen/50 transition-colors">
                  <span className="block text-xl sm:text-2xl font-black text-cybergreen">J.E.R.V.I.S</span>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">PyQt6 Assistant</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => scrollToSection && scrollToSection('projects')}
                  className="bg-cybergreen hover:bg-emerald-400 text-black font-extrabold py-3 px-6 rounded-xl shadow-lg shadow-cybergreen/30 transition duration-300 hover:scale-105 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore My Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection && scrollToSection('contact')}
                  className="bg-gray-900 border border-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition duration-300 text-xs sm:text-sm cursor-pointer"
                >
                  Contact Bishal
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
