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
          // Portrait Tablet & Mobile Phone:
          // Centered 3D portrait framing with clean headroom so the face is fully open and visible
          const targetH = width >= 640 ? height * 0.60 : height * 0.54;
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = width >= 640 ? height * 0.05 : height * 0.02;
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

      {/* 1. Desktop Executive Brand Display (Left stage on widescreen laptops/monitors only) */}
      <div className="device-widescreen-only absolute top-12 lg:top-20 left-10 lg:left-14 z-25 pointer-events-none select-none">
        {/* Luminous Status Badge */}
        <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-black/60 border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,230,118,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cybergreen opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cybergreen shadow-[0_0_8px_#00E676]"></span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-emerald-200 to-cybergreen uppercase font-bold">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-6 h-[1px] bg-gradient-to-r from-cybergreen to-transparent" />
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-cybergreen uppercase drop-shadow-[0_2px_12px_rgba(0,230,118,0.5)]">
            ARCHIVE // 2026 EDITION
          </span>
        </div>

        {/* Master Signature Name with Titanium-Platinum Sheen */}
        <h1 className="text-6xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9] mt-1 select-none">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            BISHAL
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-cybergreen drop-shadow-[0_15px_45px_rgba(0,230,118,0.35)]">
            MONDAL
          </span>
        </h1>

        <p className="mt-3 text-xs font-mono tracking-[0.25em] text-gray-400 uppercase font-semibold flex items-center gap-2">
          <span>SOFTWARE ARCHITECT</span>
          <span className="text-cybergreen">&bull;</span>
          <span>SYSTEMS DESIGNER</span>
        </p>
      </div>

      {/* 2. Portrait Tablet & Mobile Sleek Top Status Pill (Takes only ~32px at top edge so forehead and face are 100% visible) */}
      <div className="device-portrait-only absolute top-4 left-0 right-0 z-25 justify-center pointer-events-none select-none px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_15px_rgba(0,230,118,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cybergreen opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cybergreen shadow-[0_0_6px_#00E676]"></span>
          </span>
          <span className="text-[9px] font-mono tracking-widest text-gray-200 uppercase font-bold">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>
      </div>

      {/* 3. Floating High-End Glassmorphic Executive Intro Card (Docked cleanly at bottom on portrait/mobile, side-by-side on widescreen) */}
      <div className="hero-responsive-container relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col pointer-events-none">
        <div className="hero-responsive-card-box w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2.5 sm:space-y-3.5 lg:space-y-5 pointer-events-auto p-4 sm:p-6 lg:p-8 rounded-[1.75rem] sm:rounded-[2rem] bg-[#080c10]/85 backdrop-blur-3xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,230,118,0.08)] hover:border-cybergreen/50 transition-all duration-500 relative overflow-hidden group"
          >
            {/* Ambient Internal Sheen Glow */}
            <div className="absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 bg-cybergreen/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cybergreen/15 transition-all duration-700" />

            {/* Luxury Eyebrow Crest Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-cybergreen/15 via-emerald-500/10 to-transparent border border-cybergreen/40 text-cybergreen text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-[0_0_15px_rgba(0,230,118,0.2)]">
              <Sparkles className="w-3 h-3 text-cybergreen animate-spin shrink-0" />
              <span>PRECISION ARCHITECTURE &bull; IIT KGP ALUMNI</span>
            </div>

            {/* Main Greeting Headline with Radiant Gradient */}
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gray-400 uppercase block font-semibold mb-0.5 sm:mb-1">
                EXECUTIVE INTRO
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
                Hello, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-cybergreen font-black drop-shadow-[0_0_20px_rgba(0,230,118,0.4)]">
                  Bishal Mondal
                </span>
              </h2>
            </div>

            {/* Rich Narrative Description */}
            <p className="text-[11px] sm:text-xs lg:text-[14px] leading-relaxed font-normal text-gray-300">
              Engineering high-yield web platforms, algorithmic systems, and custom automation with mathematical precision &mdash; refined through research at <strong className="text-white font-semibold underline decoration-cybergreen/60 underline-offset-2">IIT Kharagpur</strong>.
            </p>

            {/* High-Status Executive Feature Badges (Compact 2x2 grid on mobile) */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5 font-mono text-[9px] sm:text-[11px]">
              <div className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cybergreen shadow-[0_0_6px_#00E676] shrink-0" />
                <span className="truncate">IIT KGP Research</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cybergreen shadow-[0_0_6px_#00E676] shrink-0" />
                <span className="truncate">Python &bull; C++ &bull; Web</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cybergreen shadow-[0_0_6px_#00E676] shrink-0" />
                <span className="truncate">J.E.R.V.I.S Assistant</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-cybergreen shadow-[0_0_6px_#00E676] shrink-0" />
                <span className="truncate">Kolkata, India</span>
              </div>
            </div>

            {/* Action Buttons (Side by Side on mobile, compact height) */}
            <div className="flex flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-cybergreen via-emerald-400 to-cybergreen text-black font-extrabold py-2 px-3 sm:py-3 sm:px-6 rounded-xl shadow-[0_0_20px_rgba(0,230,118,0.35)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all duration-300 hover:scale-105 text-xs sm:text-sm text-center cursor-pointer flex-1 flex items-center justify-center gap-1.5 group"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-cybergreen/60 text-white hover:text-cybergreen font-semibold py-2 px-3 sm:py-3 sm:px-6 rounded-xl transition-all duration-300 text-xs sm:text-sm text-center cursor-pointer backdrop-blur-md shadow-md flex-1 flex items-center justify-center"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. Bottom Navigation Links & Luxury Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex justify-between items-center z-25 font-mono text-[9px] sm:text-xs text-gray-400 pointer-events-auto">
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://www.linkedin.com/in/bishal-mandal-0bb756264/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cybergreen transition tracking-[0.15em] sm:tracking-[0.2em] font-semibold"
          >
            LINKEDIN
          </a>
          <span className="text-gray-700">|</span>
          <button
            onClick={() => scrollToSection('resume')}
            className="hover:text-cybergreen transition uppercase cursor-pointer tracking-[0.15em] sm:tracking-[0.2em] font-semibold"
          >
            RESUME
          </button>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-cybergreen/40 text-gray-300 hover:text-cybergreen transition-all duration-300 uppercase tracking-widest cursor-pointer group shadow-sm"
        >
          <span>DISCOVER STORY</span>
          <span className="text-cybergreen group-hover:translate-y-0.5 transition-transform font-bold">&darr;</span>
        </button>
      </div>
    </section>
  );
}
