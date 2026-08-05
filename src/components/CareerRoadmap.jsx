import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Download, CheckCircle2 } from 'lucide-react';

export default function CareerRoadmap() {
  return (
    <section id="resume" className="py-20 md:py-28 px-4 sm:px-8 bg-gray-50 dark:bg-[#080c10] relative z-10 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Award className="w-4 h-4 text-cybergreen" />
            <span>Career & Academic Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            My <span className="text-cybergreen">Resume & Experience.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light text-base sm:text-lg leading-relaxed">
            A track record of research excellence at IIT Kharagpur, academic achievements, and software engineering solutions.
          </p>
        </motion.div>

        {/* Experience Timeline Grid */}
        <div className="space-y-8 mb-16">
          {/* Card 1: IIT Kharagpur Research Internship */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl border border-cybergreen/50 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-[0_20px_40px_rgba(0,230,118,0.15)] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cybergreen/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cybergreen/20 text-cybergreen font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  Research Internship
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-cybergreen transition-colors">
                  Web Development & Research Intern
                </h3>
                <p className="text-sm font-semibold text-cybergreen">
                  Department of CSE, IIT Kharagpur
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono text-xs font-bold">
                  IIT Kharagpur
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Successfully completed research internship on <strong className="text-gray-900 dark:text-white font-semibold">Web Development to Showcase Indoor Air Pollution (IAP) Frameworks</strong> under the guidance of <strong className="text-cybergreen font-semibold">Prof. Sandip Chakraborty</strong>, Department of Computer Science & Engineering (CSE), IIT Kharagpur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Frontend Web Architecture & Interactive Dashboards</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Indoor Air Pollution Framework Visualization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Guided by Prof. Sandip Chakraborty (Dept. of CSE)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-cybergreen shrink-0" />
                <span>Real-Time Environmental Data Telemetry</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Academic Background */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl transition-all duration-300 hover:border-cybergreen/40"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Bachelor Degree
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Graduate Class of 2025
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-mono text-xs font-bold">
                  2022 - 2025
                </span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Graduated with a strong foundation in computer science core fundamentals: object-oriented programming in C++, data structures & algorithms, web architecture, and database management systems.
            </p>
          </motion.div>
        </div>

        {/* PDF Download Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-800/80 shadow-2xl space-y-6 hover:border-cybergreen/50 transition-all"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Download Official Resume
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Get the complete overview of my research internship at IIT Kharagpur, technical skill set, and project portfolio in PDF format.
          </p>
          <div className="pt-2">
            <a
              href="your_resume.pdf"
              download="Bishal_Mandal_Resume.pdf"
              className="inline-flex items-center gap-3 bg-cybergreen hover:bg-emerald-400 text-black font-extrabold py-4 px-9 rounded-full shadow-lg shadow-cybergreen/30 transition duration-300 hover:scale-105 text-sm sm:text-base cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
