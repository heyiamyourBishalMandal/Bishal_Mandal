import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Sparkles, Award, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AboutDossier({ scrollToSection }) {
  const sectionRef = useRef(null);

  // Parallax Scroll Tracking for Giant Watermark Text & Stage Card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 0.85, 0.85, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 px-4 sm:px-8 relative z-10 border-t border-gray-200 dark:border-gray-800/60 bg-white dark:bg-[#080c10]/95 transition-colors duration-500 overflow-hidden"
    >
      {/* 1. GIANT OMNIBUDS-STYLE PARALLAX WATERMARK HEADING (DEVELOPER) */}
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

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header (Developer Dossier Badge Removed) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Engineering <span className="text-cybergreen">Precision.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-light text-base sm:text-xl lg:text-2xl leading-relaxed">
            Software Developer & Systems Engineer with research internship experience at <strong className="text-cybergreen font-semibold">IIT Kharagpur</strong>.
          </p>
        </motion.div>

        {/* 2. MAIN EXECUTIVE SHOWCASE STAGE CARD (Without Image) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gray-50/90 dark:bg-[#0d1117]/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-800/90 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(0,230,118,0.12)] overflow-hidden transition-all duration-500 hover:border-cybergreen/40 space-y-8"
        >
          {/* Header Title & Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cybergreen uppercase tracking-wider bg-cybergreen/10 px-3.5 py-1.5 rounded-full border border-cybergreen/30 mb-3">
                <ShieldCheck className="w-4 h-4" />
                SOFTWARE DEVELOPER & BCA GRADUATE
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                Bishal Mandal.
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 font-mono text-xs font-bold border border-gray-200 dark:border-gray-700">
                Kolkata, India
              </span>
            </div>
          </div>

          {/* Narrative Summary */}
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
            Based in Kolkata, my engineering foundation bridges mathematical precision, algorithm design, responsive full-stack web applications, and Python desktop automation—highlighted by my research internship at <strong className="text-gray-900 dark:text-white font-semibold">IIT Kharagpur</strong>.
          </p>

          {/* Featured IIT Kharagpur Research Card */}
          <div className="bg-cybergreen/10 border border-cybergreen/30 p-6 sm:p-8 rounded-3xl relative overflow-hidden backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-cybergreen shrink-0" />
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Research Internship — <span className="text-cybergreen">IIT Kharagpur</span>
              </h4>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              Successfully completed a research internship in <strong className="text-gray-900 dark:text-white font-semibold">Web Development & Frontend Engineering</strong> to showcase <strong className="text-cybergreen font-semibold">Indoor Air Pollution (IAP) Frameworks</strong> under the guidance of <strong className="text-gray-900 dark:text-white font-semibold">Prof. Sandip Chakraborty</strong>, Department of Computer Science & Engineering (CSE), IIT Kharagpur.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Dept. of CSE, IIT Kharagpur</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Guided by Prof. Sandip Chakraborty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Indoor Air Pollution Data Telemetry</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Interactive Frontend Architecture</span>
              </div>
            </div>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center hover:border-cybergreen/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black text-cybergreen">IIT KGP</span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">Research Intern</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center hover:border-cybergreen/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black text-cybergreen">2025</span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">BCA Graduate</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center hover:border-cybergreen/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black text-cybergreen">J.E.R.V.I.S</span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">PyQt6 Assistant</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-center hover:border-cybergreen/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black text-cybergreen">Google</span>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 uppercase font-semibold">Career Goal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800/80">
            <button
              onClick={() => scrollToSection && scrollToSection('projects')}
              className="bg-cybergreen hover:bg-emerald-400 text-black font-extrabold py-3.5 px-7 rounded-xl shadow-lg shadow-cybergreen/30 transition duration-300 hover:scale-105 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection && scrollToSection('contact')}
              className="bg-gray-900 border border-gray-700 text-white font-semibold py-3.5 px-7 rounded-xl hover:bg-gray-800 transition duration-300 text-xs sm:text-sm cursor-pointer"
            >
              Contact Bishal
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
