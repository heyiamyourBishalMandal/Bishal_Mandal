import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'portfolio-site',
      title: '3D Scrollytelling Interactive Portfolio Engine',
      badge: 'FEATURED ARCHITECTURE',
      category: 'development web-design',
      description:
        'A high-performance personal portfolio built with 80-frame kinetic 3D Canvas motion sequence scrubbing, Framer Motion step panels, glassmorphism UI, and ultra-fluid responsiveness.',
      tech: ['React.js', 'Framer Motion', 'HTML5 Canvas 3D', 'Tailwind CSS', 'Vite'],
      github: '#', // EDIT HERE: Replace '#' with your GitHub repo URL (e.g., 'https://github.com/heyiamyourbishalmandal/Bishal_Mandal')
    },
    {
      id: 'food-ordering',
      title: 'Online Food-Ordering Platform',
      badge: 'FULL-STACK PRODUCTION',
      category: 'development web-design',
      description:
        'A full-stack application featuring user authentication, seamless menu browsing, and robust payment integration.',
      tech: ['HTML5', 'CSS', 'JS', 'PHP', 'MYSQL'],
      github: '#', // EDIT HERE: Replace '#' with your GitHub repo URL
    },
    {
      id: 'blog-platform',
      title: 'Personal Blog Platform',
      badge: 'WEB APPLICATION',
      category: 'development web-design',
      description:
        'A dynamic platform allowing users to create, edit, and publish posts, featuring a rich text editor and engagement mechanics.',
      tech: ['HTML', 'CSS', 'JS'],
      github: '#', // EDIT HERE: Replace '#' with your GitHub repo URL
    },
    {
      id: 'weather-dashboard',
      title: 'Weather Dashboard',
      badge: 'API TELEMETRY',
      category: 'web-design',
      description:
        'A single-page application displaying real-time climate data via a third-party REST API with geolocation support.',
      tech: ['HTML', 'Tailwind', 'JavaScript', 'REST API'],
      github: '#', // EDIT HERE: Replace '#' with your GitHub repo URL
    },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-8 transition-colors duration-500 relative z-10 bg-white dark:bg-[#080c10]/95 border-t border-gray-200 dark:border-gray-800/60 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cybergreen" />
            <span>Engineered Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured <span className="text-cybergreen">Projects.</span>
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web-design', label: 'Web Design' },
            { id: 'development', label: 'Development' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-cybergreen to-emerald-400 text-black shadow-[0_0_25px_rgba(0,230,118,0.4)] scale-105 font-bold'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-cybergreen/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid with Scroll Entrance Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, pIdx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: pIdx * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="bg-gray-50/90 dark:bg-[#0b0f15]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/[0.08] hover:border-cybergreen/50 flex flex-col justify-between transform transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,230,118,0.12)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-cybergreen uppercase bg-cybergreen/10 border border-cybergreen/30 px-3 py-1 rounded-full">
                    {project.badge}
                  </span>
                  {/* GitHub Logo Icon (External link turned off for now, logo stays visible) */}
                  <span
                    className="text-gray-400 p-1 flex items-center justify-center opacity-80 cursor-default"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cybergreen transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-2 mb-5">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-[11px] font-semibold px-3 py-1 rounded-full font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-white/[0.06] flex items-center justify-between">
                  {/* Source indicator (External link off, logo preserved) */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-400 cursor-default">
                    <Github className="w-3.5 h-3.5 text-gray-500" />
                    <span>SOURCE ARCHIVE</span>
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                    VERIFIED CODE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
