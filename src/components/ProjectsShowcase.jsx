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
    <section id="projects" className="py-20 px-4 sm:px-8 transition-colors duration-300 relative z-10 bg-white dark:bg-[#080c10]/95 border-t border-gray-200 dark:border-gray-800/60">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Featured Projects
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {[
            { id: 'all', label: 'All' },
            { id: 'web-design', label: 'Web Design' },
            { id: 'development', label: 'Development' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === tab.id
                  ? 'bg-cybergreen text-black shadow-[0_0_15px_#00E676] scale-105'
                  : 'bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-cybergreen/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/60 dark:bg-[#11161d]/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800/80 flex flex-col transform transition duration-300 hover:-translate-y-2 group"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cybergreen transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 font-mono"
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
