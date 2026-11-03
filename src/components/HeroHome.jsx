import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function HeroHome({ scrollToSection }) {
  const canvasRef = useRef(null);

  // High-performance canvas drawing for the fixed hero frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

    let width = window.innerWidth;
    let height = window.innerHeight;

    const basePath = import.meta.env.BASE_URL || './';
    const prefix = basePath.endsWith('/') ? basePath : basePath + '/';

    const img = new Image();
    img.decoding = 'async';
    img.src = `${prefix}fram/ezgif-frame-080.jpg`;

    const render = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobile = width < 768;
      const isWidescreen = width > height && width >= 800;

      const activeDpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * activeDpr);
      canvas.height = Math.round(height * activeDpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(activeDpr, activeDpr);

      // Hardware background fill
      ctx.fillStyle = '#080c10';
      ctx.fillRect(0, 0, width, height);

      if (img.complete && img.naturalWidth > 0) {
        const sourceW = img.naturalWidth;
        const sourceH = img.naturalHeight * 0.96;
        const imgRatio = sourceW / sourceH;
        let drawW, drawH, drawX, drawY;

        if (isWidescreen) {
          // Widescreen Desktop / Laptop / Landscape Tablet: 3D portrait on left stage
          const targetH = Math.max(height * 1.05, width / imgRatio);
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = - (drawW * 0.12);
          drawY = (height - drawH) / 2;
        } else {
          // Portrait Tablet (iPad Air), Mobile Phone, & Mobile "Desktop site" mode:
          // Centered 3D portrait framing in upper stage
          const targetH = width >= 640 ? height * 0.56 : height * 0.48;
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = width >= 640 ? height * 0.08 : height * 0.07;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = isWidescreen ? 'high' : 'medium';

        ctx.drawImage(
          img,
          0,
          0,
          Math.round(sourceW),
          Math.round(sourceH),
          Math.round(drawX),
          Math.round(drawY),
          Math.round(drawW),
          Math.round(drawH)
        );

        if (isWidescreen) {
          // Deep Obsidian Black Gradient Edge Fade Mask on Widescreen Monitors (fades rightwards)
          const fadeStart = width * 0.36;
          const fadeWidth = width * 0.28;
          const gradient = ctx.createLinearGradient(fadeStart, 0, fadeStart + fadeWidth, 0);

          gradient.addColorStop(0, 'rgba(8, 12, 16, 0)');
          gradient.addColorStop(1, 'rgba(8, 12, 16, 1)');

          ctx.fillStyle = gradient;
          ctx.fillRect(Math.round(fadeStart), 0, Math.round(fadeWidth), Math.round(height));

          ctx.fillStyle = '#080c10';
          ctx.fillRect(Math.round(fadeStart + fadeWidth), 0, Math.round(width - (fadeStart + fadeWidth)), Math.round(height));
        } else {
          // Portrait / Tablet / Mobile: Smooth vertical gradient edge fade at the bottom of the portrait
          const fadeTop = drawY + drawH * 0.68;
          const fadeH = drawH * 0.32;
          const vGradient = ctx.createLinearGradient(0, fadeTop, 0, fadeTop + fadeH);

          vGradient.addColorStop(0, 'rgba(8, 12, 16, 0)');
          vGradient.addColorStop(1, 'rgba(8, 12, 16, 1)');

          ctx.fillStyle = vGradient;
          ctx.fillRect(0, Math.round(fadeTop), Math.round(width), Math.round(fadeH));

          const bottomSolid = fadeTop + fadeH;
          if (bottomSolid < height) {
            ctx.fillStyle = '#080c10';
            ctx.fillRect(0, Math.round(bottomSolid), Math.round(width), Math.round(height - bottomSolid));
          }
        }
      }

      ctx.restore();
    };

    img.onload = render;
    if (img.complete) render();

    window.addEventListener('resize', render, { passive: true });
    window.addEventListener('orientationchange', render, { passive: true });
    return () => {
      window.removeEventListener('resize', render);
      window.removeEventListener('orientationchange', render);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#080c10] flex items-center justify-center">
      {/* Full-bleed Fixed Portrait Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover filter contrast-[108%] brightness-[104%] saturate-[105%]"
        />
      </div>

      {/* 1. Huge Brand Display Title */}
      <div className="absolute top-8 sm:top-12 lg:top-20 left-5 sm:left-10 lg:left-14 z-25 pointer-events-none select-none">
        <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cybergreen opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cybergreen"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-300 uppercase font-bold">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>
        <br />
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cybergreen uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          PORTFOLIO ARCHIVE // 2026
        </span>
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mt-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)]">
          BISHAL<br />MONDAL
        </h1>
      </div>

      {/* 2. Floating Brief Intro Panel Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-end lg:justify-center items-center lg:items-end pointer-events-none pb-8 sm:pb-12 lg:pb-0">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-md text-left lg:ml-auto lg:mr-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-3 sm:space-y-5 pointer-events-auto p-5 sm:p-7 rounded-3xl bg-[#080c10]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(0,230,118,0.06)] hover:border-cybergreen/40 transition-all duration-500"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/40 text-cybergreen text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen animate-spin shrink-0" />
              <span className="truncate">"STRENGTH IN STRATEGY, POWER IN PROGRESS"</span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
              Hey there, I'm <span className="text-cybergreen">Bishal Mondal</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed font-normal text-gray-300">
              A passionate Software Developer & Web Designer with research experience at <strong className="text-white font-semibold">IIT Kharagpur</strong>, specializing in scalable web systems, algorithm design, and custom desktop automation.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {['IIT KGP Intern', 'Python / C++ / JS', 'Kolkata, India'].map((pill, pIdx) => (
                <span
                  key={pIdx}
                  className="bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-cybergreen via-emerald-400 to-cybergreen text-black font-extrabold py-2.5 px-5 sm:px-6 rounded-xl shadow-lg shadow-cybergreen/30 hover:shadow-cybergreen/50 transition-all duration-300 hover:scale-105 text-xs sm:text-sm text-center cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-cybergreen/50 text-white font-semibold py-2.5 px-5 sm:px-6 rounded-xl transition duration-300 text-xs sm:text-sm text-center cursor-pointer backdrop-blur-md"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Navigation Links & Scroll Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-6 right-6 flex justify-between items-center z-25 font-mono text-[10px] sm:text-xs text-gray-400 pointer-events-auto">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://www.linkedin.com/in/bishal-mandal-0bb756264/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cybergreen transition"
          >
            LINKEDIN
          </a>
          <span className="text-gray-700">|</span>
          <button
            onClick={() => scrollToSection('resume')}
            className="hover:text-cybergreen transition uppercase cursor-pointer"
          >
            RESUME
          </button>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-cybergreen transition uppercase tracking-widest cursor-pointer group"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="text-cybergreen group-hover:translate-y-0.5 transition-transform">↓</span>
        </button>
      </div>
    </section>
  );
}
