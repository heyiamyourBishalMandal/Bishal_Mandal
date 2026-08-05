import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';

export default function SkillsSection() {
  const leftSkills = [
    { name: 'C++', iconClass: 'devicon-cplusplus-plain' },
    { name: 'Python', iconClass: 'devicon-python-plain' },
    { name: 'RESTful APIs', isCustomIcon: true },
    { name: 'MySQL', iconClass: 'devicon-mysql-plain' },
  ];

  const rightSkills = [
    { name: 'JavaScript', iconClass: 'devicon-javascript-plain' },
    { name: 'PHP', iconClass: 'devicon-php-plain' },
    { name: 'HTML5', iconClass: 'devicon-html5-plain' },
    { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-plain' },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 bg-gray-50 dark:bg-[#080c10] relative z-10 overflow-hidden border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            My Technical<span className="text-cybergreen"> Gyan.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono uppercase tracking-[0.2em]">
            Programming languages integrated directly into my neural networks.
          </p>
        </motion.div>

        {/* 3-Column Neural Network Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4 items-center relative w-full">
          {/* Left Column Skills */}
          <div className="flex flex-col space-y-8 sm:space-y-12 py-4 lg:py-8 z-20 order-2 lg:order-1 items-center lg:items-end pr-0 lg:pr-8">
            {leftSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.05 }}
                className="relative w-full max-w-[280px] group text-center lg:text-right"
              >
                <div className="bg-white/80 dark:bg-[#0d1117]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800/80 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg hover:border-cybergreen/50 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,230,118,0.15)] flex items-center justify-center lg:justify-end gap-3 relative z-10">
                  {skill.isCustomIcon ? (
                    <Link className="w-6 h-6 text-gray-400 group-hover:text-cybergreen transition-colors" />
                  ) : (
                    <i className={`${skill.iconClass} text-2xl text-gray-400 group-hover:text-cybergreen transition-colors`} />
                  )}
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{skill.name}</span>
                </div>
                <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full items-center w-[80px] xl:w-[130px] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 group-hover:bg-cybergreen transition-colors" />
                  <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-200 group-hover:bg-cybergreen group-hover:shadow-[0_0_10px_#00E676] transition-all shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Neural Brain Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center relative z-10 order-first lg:order-2 pointer-events-none mb-4 lg:mb-0"
          >
            <div className="absolute w-56 h-56 bg-cybergreen/20 blur-[80px] rounded-full animate-pulse" />
            <img
              src="assets/img/neural-brain.jpg"
              alt="Neural Network Core"
              className="relative w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[420px] h-auto object-contain drop-shadow-[0_0_30px_rgba(0,230,118,0.3)] dark:mix-blend-screen transition-transform duration-1000 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'img/neural-brain.jpg';
              }}
            />
            <div className="absolute -bottom-4 lg:-bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-max">
              <div className="bg-white/90 dark:bg-[#080c10]/90 backdrop-blur-md border border-cybergreen/50 text-cybergreen text-[9px] sm:text-xs font-mono px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-cybergreen/20 font-bold">
                Neural Core Engine
              </div>
            </div>
          </motion.div>

          {/* Right Column Skills */}
          <div className="flex flex-col space-y-8 sm:space-y-12 py-4 lg:py-8 z-20 order-3 items-center lg:items-start pl-0 lg:pl-8">
            {rightSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.05 }}
                className="relative w-full max-w-[280px] group text-center lg:text-left"
              >
                <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-full items-center w-[90px] xl:w-[140px] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-200 group-hover:bg-cybergreen group-hover:shadow-[0_0_10px_#00E676] transition-all shrink-0" />
                  <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 group-hover:bg-cybergreen transition-colors" />
                </div>
                <div className="bg-white/80 dark:bg-[#0d1117]/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800/80 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg hover:border-cybergreen/50 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,230,118,0.15)] flex items-center justify-center lg:justify-start gap-3 relative z-10">
                  <i className={`${skill.iconClass} text-2xl text-gray-400 group-hover:text-cybergreen transition-colors`} />
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Subtitle */}
        <div className="text-center mt-20">
          <p className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase">Optimized for high-yield performance.</p>
        </div>
      </div>
    </section>
  );
}
