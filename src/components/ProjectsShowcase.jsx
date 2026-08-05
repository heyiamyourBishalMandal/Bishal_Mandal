import React, { useState } from 'react';

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'portfolio-site',
      title: '3D Scrollytelling Interactive Portfolio Engine',
      category: 'development web-design',
      description:
        'A high-performance personal portfolio built with 80-frame kinetic 3D Canvas motion sequence scrubbing, Framer Motion step panels, glassmorphism UI, and ultra-fluid responsiveness.',
      tech: ['React.js', 'Framer Motion', 'HTML5 Canvas 3D', 'Tailwind CSS', 'Vite'],
    },
    {
      id: 'food-ordering',
      title: 'Online Food-Ordering Platform',
      category: 'development web-design',
      description:
        'A full-stack application featuring user authentication, seamless menu browsing, and robust payment integration.',
      tech: ['HTML5', 'CSS', 'JS', 'PHP', 'MYSQL'],
    },
    {
      id: 'blog-platform',
      title: 'Personal Blog Platform',
      category: 'development web-design',
      description:
        'A dynamic platform allowing users to create, edit, and publish posts, featuring a rich text editor and engagement mechanics.',
      tech: ['HTML', 'CSS', 'JS'],
    },
    {
      id: 'weather-dashboard',
      title: 'Weather Dashboard',
      category: 'web-design',
      description:
        'A single-page application displaying real-time climate data via a third-party REST API with geolocation support.',
      tech: ['HTML', 'Tailwind', 'JavaScript', 'REST API'],
    },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="py-20 md:py-28 px-4 sm:px-8 transition-colors duration-500 relative z-10 bg-white dark:bg-[#080c10]/95 border-t border-gray-200 dark:border-gray-800/60">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
          Featured <span className="text-cybergreen">Projects</span>
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
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
                  ? 'bg-cybergreen text-black shadow-[0_0_20px_rgba(0,230,118,0.4)] scale-105'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-cybergreen/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50/90 dark:bg-[#0d1117]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800/80 hover:border-cybergreen/50 flex flex-col transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,230,118,0.1)] group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cybergreen transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 flex-grow leading-relaxed font-normal">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-[11px] font-semibold px-3 py-1 rounded-full font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
