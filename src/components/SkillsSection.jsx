import React from 'react';
import { Cpu, Link, Database } from 'lucide-react';

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
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            My Technical<span className="text-cybergreen"> Gyan.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-mono uppercase tracking-[0.2em]">
            Programming languages integrated directly into my neural networks.
          </p>
        </div>

        {/* 3-Column Neural Network Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4 items-center relative w-full">
          {/* Left Column Skills */}
          <div className="flex flex-col space-y-12 sm:space-y-16 py-4 lg:py-8 z-20 order-2 lg:order-1 items-center lg:items-end pr-0 lg:pr-8">
            {leftSkills.map((skill, idx) => (
              <div key={idx} className="relative w-full max-w-[280px] group text-center lg:text-right">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center justify-center lg:justify-end gap-3 relative z-10 bg-gray-50 dark:bg-[#080c10] pl-0 lg:pl-4">
                  {skill.isCustomIcon ? (
                    <Link className="w-6 h-6 text-gray-400 group-hover:text-cybergreen transition-colors" />
                  ) : (
                    <i className={`${skill.iconClass} text-2xl text-gray-400 group-hover:text-cybergreen transition-colors`} />
                  )}
                  {skill.name}
                </h3>
                <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full items-center w-[80px] xl:w-[130px] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 group-hover:bg-cybergreen transition-colors" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200 group-hover:bg-cybergreen group-hover:shadow-[0_0_10px_#00E676] transition-all shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Neural Brain Core */}
          <div className="flex justify-center items-center relative z-10 order-first lg:order-2 pointer-events-none mb-4 lg:mb-0">
            <div className="absolute w-56 h-56 bg-blue-500/20 blur-[80px] rounded-full animate-pulse" />
            <img
              src="assets/img/neural-brain.jpg"
              alt="Neural Network Core"
              className="relative w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[420px] h-auto object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.3)] dark:mix-blend-screen transition-transform duration-1000 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'assets/logo/logo.png';
              }}
            />
            <div className="absolute -bottom-4 lg:-bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-max">
              <div className="bg-white/80 dark:bg-[#080c10]/80 backdrop-blur-md border border-gray-200/50 dark:border-blue-500/40 text-gray-900 dark:text-blue-400 text-[9px] sm:text-xs font-mono px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10">
                Neural Network
              </div>
            </div>
          </div>

          {/* Right Column Skills */}
          <div className="flex flex-col space-y-12 sm:space-y-16 py-4 lg:py-8 z-20 order-3 items-center lg:items-start pl-0 lg:pl-8">
            {rightSkills.map((skill, idx) => (
              <div key={idx} className="relative w-full max-w-[280px] group text-center lg:text-left">
                <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-full items-center w-[90px] xl:w-[140px] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200 group-hover:bg-cybergreen group-hover:shadow-[0_0_10px_#00E676] transition-all shrink-0" />
                  <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-600 group-hover:bg-cybergreen transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight flex items-center justify-center lg:justify-start gap-3 relative z-10 bg-gray-50 dark:bg-[#080c10] pr-0 lg:pr-4">
                  <i className={`${skill.iconClass} text-2xl text-gray-400 group-hover:text-cybergreen transition-colors`} />
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Subtitle */}
        <div className="text-center mt-20">
          <p className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase">Optimized for performance.</p>
        </div>
      </div>
    </section>
  );
}
