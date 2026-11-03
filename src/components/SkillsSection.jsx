import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Database, Globe, Zap, Volume2, VolumeX, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SkillsSection() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lampRef = useRef(null);

  // Web Audio API Synthesizer (Realistic Mechanical Switch Click + Neon Transformer Hum)
  const playSwitchSound = (turnOn) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (turnOn) {
        // 1. Mechanical Pull Switch Click
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(140, ctx.currentTime);
        clickOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.07);
        clickGain.gain.setValueAtTime(0.35, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 0.07);

        // 2. High-Voltage Neon Transformer Hum
        setTimeout(() => {
          try {
            const humOsc = ctx.createOscillator();
            const humGain = ctx.createGain();
            humOsc.type = 'sawtooth';
            humOsc.frequency.setValueAtTime(60, ctx.currentTime);
            humOsc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.12);
            humGain.gain.setValueAtTime(0.08, ctx.currentTime);
            humGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            humOsc.connect(humGain);
            humGain.connect(ctx.destination);
            humOsc.start();
            humOsc.stop(ctx.currentTime + 0.35);
          } catch (_) {}
        }, 40);
      } else {
        // Power-down soft click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      }
    } catch (_) {
      // Audio context restricted or unavailable
    }
  };

  // Spark burst physics using canvas-confetti
  const triggerSparks = () => {
    if (!lampRef.current) return;
    const rect = lampRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 70,
      startVelocity: 18,
      origin: { x, y },
      colors: ['#00E676', '#69F0AE', '#B9F6CA', '#FFFFFF', '#00E5FF'],
      ticks: 45,
      gravity: 0.9,
      scalar: 0.7,
      disableForReducedMotion: true,
    });
  };

  // Handle Cord Pull Interaction
  const handleCordPull = () => {
    if (isPulling) return;
    setIsPulling(true);
    setHasInteracted(true);

    const nextState = !isPowerOn;
    playSwitchSound(nextState);

    // Cord spring recoil timing
    setTimeout(() => {
      setIsPowerOn(nextState);
      if (nextState) {
        triggerSparks();
      }
      setIsPulling(false);
    }, 280);
  };

  const allSkills = [
    {
      id: 'python',
      name: 'Python 3.11',
      category: 'languages',
      categoryLabel: 'SYSTEMS & AUTOMATION',
      iconClass: 'devicon-python-plain',
      power: 95,
      highlight: 'PyQt6 & Desktop Tooling',
      description: 'Core engine for desktop assistants, automation pipelines, and algorithmic frameworks.',
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'languages',
      categoryLabel: 'OBJECT ORIENTED',
      iconClass: 'devicon-cplusplus-plain',
      power: 90,
      highlight: 'Algorithms & Data Structures',
      description: 'High-performance computing, memory optimization, and algorithmic efficiency.',
    },
    {
      id: 'js',
      name: 'JavaScript (ES6+)',
      category: 'languages',
      categoryLabel: 'MODERN WEB',
      iconClass: 'devicon-javascript-plain',
      power: 92,
      highlight: 'Asynchronous Architecture',
      description: 'Modern ES6+ syntax, async event-driven orchestration, and interactive UI systems.',
    },
    {
      id: 'html-css',
      name: 'HTML5 & CSS3',
      category: 'web',
      categoryLabel: 'SEMANTIC UI',
      iconClass: 'devicon-html5-plain',
      power: 98,
      highlight: 'Pixel-Perfect Layouts',
      description: 'Semantic DOM architecture, hardware-accelerated animations, and responsive accessibility.',
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'web',
      categoryLabel: 'DESIGN SYSTEM',
      iconClass: 'devicon-tailwindcss-plain',
      power: 96,
      highlight: 'Modern Glassmorphic Systems',
      description: 'Utility-first rapid prototyping, responsive layouts, and cyber-green dark themes.',
    },
    {
      id: 'php',
      name: 'PHP',
      category: 'web',
      categoryLabel: 'BACKEND SERVICES',
      iconClass: 'devicon-php-plain',
      power: 88,
      highlight: 'Server-Side & Auth Logic',
      description: 'Secure server-side logic, session management, database CRUD, and MVC architectures.',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'systems',
      categoryLabel: 'RELATIONAL DATABASE',
      iconClass: 'devicon-mysql-plain',
      power: 90,
      highlight: 'Schema & Query Optimization',
      description: 'Relational data modeling, ACID transactions, complex indexed queries, and data integrity.',
    },
    {
      id: 'apis',
      name: 'RESTful APIs',
      category: 'systems',
      categoryLabel: 'SYSTEM INTEGRATION',
      customIcon: 'api',
      power: 92,
      highlight: 'JSON Data Pipelines',
      description: 'Microservice endpoints, webhook listeners, environmental telemetry, and real-time fetch.',
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'systems',
      categoryLabel: 'VERSION CONTROL',
      iconClass: 'devicon-git-plain',
      power: 94,
      highlight: 'Collaborative DevOps',
      description: 'Branching workflows, version tracking, rebasing, merge resolution, and automated deployments.',
    },
    {
      id: 'pyqt6',
      name: 'PyQt6 GUI',
      category: 'ai',
      categoryLabel: 'DESKTOP APPLICATION',
      customIcon: 'terminal',
      power: 92,
      highlight: 'J.E.R.V.I.S Voice Architecture',
      description: 'Desktop voice assistant framework, multi-threaded event dispatchers, and modern dark GUIs.',
    },
    {
      id: 'algorithms',
      name: 'Data Structures & Algorithms',
      category: 'ai',
      categoryLabel: 'COMPUTATIONAL LOGIC',
      customIcon: 'cpu',
      power: 88,
      highlight: 'Time & Space Efficiency',
      description: 'Graph traversals, dynamic programming, sorting & searching, and algorithmic space complexity.',
    },
    {
      id: 'react-vite',
      name: 'React.js & Vite',
      category: 'web',
      categoryLabel: 'MODERN FRONTEND',
      iconClass: 'devicon-react-original',
      power: 92,
      highlight: 'Reactive State & Scrollytelling',
      description: 'Component lifecycles, hooks, Framer Motion transitions, and ultra-fast Vite module bundling.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Modules (12)' },
    { id: 'languages', label: 'Core Languages' },
    { id: 'web', label: 'Full-Stack Web' },
    { id: 'systems', label: 'Databases & APIs' },
    { id: 'ai', label: 'AI & Systems GUI' },
  ];

  const filteredSkills =
    activeFilter === 'all'
      ? allSkills
      : allSkills.filter((s) => s.category === activeFilter);

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 px-4 sm:px-8 bg-[#05080c] relative z-10 overflow-hidden border-t border-gray-800/60 transition-colors duration-500"
    >
      {/* Dynamic Overhead Conical Light Beam (Radiates down when lamp is powered on) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isPowerOn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 230, 118, 0.16) 0%, rgba(0, 230, 118, 0.05) 45%, transparent 75%)',
        }}
      />

      {/* Cyber Grid Subtle Background Matrix */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00E676 1px, transparent 1px), linear-gradient(to bottom, #00E676 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/30 text-cybergreen text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 text-cybergreen" />
            <span>INTERACTIVE QUANTUM REACTOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Technical <span className="text-cybergreen">Power Grid.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-mono uppercase tracking-[0.2em] mt-3">
            Pull the hanging overhead switch to energize and illuminate technical modules.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* INTERACTIVE HANGING OVERHEAD CYBER-LAMP & PULL CORD */}
        {/* ======================================================== */}
        <div className="relative flex flex-col items-center justify-center mb-12 sm:mb-16 select-none">
          {/* Ceiling Power Conduit Cable */}
          <div className="w-1.5 h-6 bg-gradient-to-b from-gray-700 to-gray-900 border-x border-gray-600 rounded-t" />

          {/* Overhead Industrial Cyber Lamp Fixture */}
          <div
            ref={lampRef}
            className={`relative max-w-xs sm:max-w-md w-full h-10 sm:h-12 rounded-2xl border transition-all duration-500 flex items-center justify-between px-4 sm:px-6 z-20 ${
              isPowerOn
                ? 'bg-[#0d171e] border-cybergreen/80 shadow-[0_0_40px_rgba(0,230,118,0.4),0_0_80px_rgba(0,230,118,0.15)]'
                : 'bg-[#0b0e14] border-gray-800 shadow-xl'
            }`}
          >
            {/* Left Status LED */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isPowerOn ? 'bg-cybergreen shadow-[0_0_8px_#00E676] animate-pulse' : 'bg-red-500/80'
                }`}
              />
              <span className="font-mono text-[10px] text-gray-400 font-semibold tracking-wider">
                {isPowerOn ? '480V ACTIVE' : 'STANDBY 0V'}
              </span>
            </div>

            {/* Center Neon Plasma Tube */}
            <div className="flex-1 mx-4 h-3 rounded-full overflow-hidden bg-black/60 border border-gray-800 flex items-center p-0.5">
              <div
                className={`w-full h-full rounded-full transition-all duration-500 ${
                  isPowerOn
                    ? 'bg-gradient-to-r from-cybergreen via-emerald-300 to-cybergreen shadow-[0_0_18px_#00E676]'
                    : 'bg-gray-800/50'
                }`}
              />
            </div>

            {/* Right Circuit Label */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest hidden sm:inline">
                GRID.SYS
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-gray-500 hover:text-cybergreen transition-colors p-1"
                title={soundEnabled ? 'Mute switch audio' : 'Enable switch audio'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* THE DANGLING PULL CORD / ROPE WITH PHYSICS */}
          {/* ======================================================== */}
          <div className="relative flex flex-col items-center cursor-pointer group" onClick={handleCordPull}>
            {/* The Cable / Chain */}
            <motion.div
              animate={{
                y: isPulling ? [0, 40, 8, 0] : 0,
                rotate: isPowerOn ? 0 : [-1.2, 1.2, -1.2],
              }}
              transition={{
                y: { duration: 0.38, ease: 'easeOut' },
                rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="flex flex-col items-center origin-top pt-0.5"
            >
              {/* Vertical Segmented Metallic Cord Line */}
              <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 shadow-[0_0_6px_rgba(0,0,0,0.9)]" />

              {/* Connecting Ring Link */}
              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-gray-700 shadow-md -my-0.5" />

              {/* Heavy Chrome/Brass Toggle Handle */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-6 h-10 sm:w-7 sm:h-11 rounded-full border flex flex-col items-center justify-between py-1.5 shadow-2xl transition-all duration-300 ${
                  isPowerOn
                    ? 'bg-gradient-to-b from-emerald-300 via-cybergreen to-emerald-600 border-white/60 shadow-[0_0_20px_rgba(0,230,118,0.7)]'
                    : 'bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 border-gray-400 shadow-[0_4px_15px_rgba(0,0,0,0.8)]'
                }`}
              >
                <div className="w-3 h-0.5 bg-black/40 rounded-full" />
                <div className="w-3.5 h-1 bg-black/30 rounded-full" />
                <div className="w-2 h-0.5 bg-black/40 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Interactive Pull Instruction Beacon */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3.5 flex flex-col items-center pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCordPull();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 border transition-all duration-300 shadow-lg cursor-pointer ${
                  isPowerOn
                    ? 'bg-cybergreen/15 text-cybergreen border-cybergreen/50 shadow-[0_0_20px_rgba(0,230,118,0.25)] hover:bg-cybergreen/25'
                    : 'bg-white/10 text-white border-white/20 hover:border-cybergreen/60 hover:text-cybergreen animate-bounce'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isPowerOn ? 'text-cybergreen' : 'text-amber-400 animate-pulse'}`} />
                <span>{isPowerOn ? 'POWER: ONLINE (CLICK TO TOGGLE)' : 'PULL ROOF CORD TO IGNITE ↓'}</span>
              </button>

              {!isPowerOn && (
                <span className="text-[10px] font-mono text-gray-400 tracking-wider mt-1.5">
                  Click handle or button to surge electricity
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CATEGORY FILTER TABS (Visible when powered on) */}
        {/* ======================================================== */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-cybergreen text-black shadow-[0_0_20px_rgba(0,230,118,0.35)] scale-105'
                  : 'bg-white/[0.04] text-gray-300 border border-white/10 hover:border-cybergreen/40 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* THE 12 ILLUMINATED SKILL MODULES (IGNITE ONE BY ONE) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredSkills.map((skill, sIdx) => {
            // Sequential cascading ignition delay (100ms per card)
            const cascadeDelay = isPowerOn ? sIdx * 0.08 : 0;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0.35, y: 15 }}
                animate={{
                  opacity: isPowerOn ? 1 : 0.45,
                  y: isPowerOn ? 0 : 8,
                }}
                transition={{
                  duration: 0.5,
                  delay: cascadeDelay,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: isPowerOn ? -6 : 0,
                  scale: isPowerOn ? 1.02 : 1,
                }}
                className={`relative rounded-3xl p-5 sm:p-6 backdrop-blur-2xl transition-all duration-500 overflow-hidden group border ${
                  isPowerOn
                    ? 'bg-[#0b0f15]/90 border-white/[0.08] hover:border-cybergreen/60 shadow-xl hover:shadow-[0_20px_45px_rgba(0,230,118,0.14)]'
                    : 'bg-[#080b0f]/60 border-white/[0.03] opacity-50'
                }`}
              >
                {/* Module Header Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Icon Container */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                        isPowerOn
                          ? 'bg-cybergreen/10 border-cybergreen/40 text-cybergreen shadow-[0_0_15px_rgba(0,230,118,0.2)] group-hover:scale-110'
                          : 'bg-white/[0.03] border-white/5 text-gray-600'
                      }`}
                    >
                      {skill.customIcon === 'api' ? (
                        <Globe className="w-5 h-5" />
                      ) : skill.customIcon === 'terminal' ? (
                        <Terminal className="w-5 h-5" />
                      ) : skill.customIcon === 'cpu' ? (
                        <Cpu className="w-5 h-5" />
                      ) : (
                        <i className={`${skill.iconClass} text-2xl`} />
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase block font-bold">
                        {skill.categoryLabel}
                      </span>
                      <h3
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                          isPowerOn
                            ? 'text-white group-hover:text-cybergreen'
                            : 'text-gray-500'
                        }`}
                      >
                        {skill.name}
                      </h3>
                    </div>
                  </div>

                  {/* Power Voltage Badge */}
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full border transition-all duration-500 ${
                      isPowerOn
                        ? 'bg-cybergreen/15 text-cybergreen border-cybergreen/40 shadow-[0_0_10px_rgba(0,230,118,0.2)]'
                        : 'bg-gray-900 text-gray-600 border-gray-800'
                    }`}
                  >
                    {isPowerOn ? `${skill.power}%` : 'OFFLINE'}
                  </span>
                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                    isPowerOn ? 'text-gray-300 font-normal' : 'text-gray-600 font-light'
                  }`}
                >
                  {skill.description}
                </p>

                {/* Animated Power Level Meter */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-400 font-semibold truncate pr-2">
                      {skill.highlight}
                    </span>
                    <span className={isPowerOn ? 'text-cybergreen font-bold' : 'text-gray-600'}>
                      {isPowerOn ? 'ENERGIZED' : 'STANDBY'}
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isPowerOn ? `${skill.power}%` : '0%' }}
                      transition={{
                        duration: 0.9,
                        delay: cascadeDelay + 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cybergreen to-emerald-300 shadow-[0_0_10px_#00E676]"
                    />
                  </div>
                </div>

                {/* Ambient Cyber Corner Glow on Hover */}
                {isPowerOn && (
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cybergreen/10 rounded-full filter blur-xl pointer-events-none group-hover:bg-cybergreen/20 transition-all duration-500" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Section Diagnostic Footer Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPowerOn ? 'bg-cybergreen animate-pulse' : 'bg-gray-600'
              }`}
            />
            <span>SYSTEM STATUS: {isPowerOn ? 'GRID SYNCHRONIZED (100% YIELD)' : 'AWAITING USER INPUT'}</span>
          </div>

          <button
            onClick={handleCordPull}
            className="hover:text-cybergreen transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{isPowerOn ? 'SWITCH TO DARK MODE' : 'ENGAGE POWER GRID'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
