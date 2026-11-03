import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Award } from 'lucide-react';

export default function AboutScrollytelling({ scrollToSection }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [frames, setFrames] = useState([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  const totalFrames = 80;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload & GPU Async-decode 80 3D frame images
  useEffect(() => {
    let isCancelled = false;
    const basePath = import.meta.env.BASE_URL || './';
    const prefix = basePath.endsWith('/') ? basePath : basePath + '/';
    const loadedImages = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = `${prefix}fram/ezgif-frame-${numStr}.jpg`;
      img.onload = () => {
        if (!isCancelled) {
          lastDrawnFrameRef.current = -1;
        }
      };
      if (img.decode) {
        img.decode().catch(() => {});
      }
      loadedImages.push(img);
    }
    setFrames(loadedImages);
    return () => { isCancelled = true; };
  }, []);

  // Hardware-Accelerated 60-120FPS Canvas Engine (Universal Mobile, Tablet, & Laptop Smoothness)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

    let dpr = 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobile = width < 768;

      // Device-adaptive DPR capping
      dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      lastDrawnFrameRef.current = -1; // Force immediate re-render on resize
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    const render = (frameIndex) => {
      if (frames.length === 0) return;

      let img = frames[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = frames.find((f) => f && f.complete && f.naturalWidth > 0) || frames[0];
      }

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        // Hardware background fill
        ctx.fillStyle = '#080c10';
        ctx.fillRect(0, 0, width, height);

        const sourceW = img.naturalWidth;
        const sourceH = img.naturalHeight * 0.96;
        const imgRatio = sourceW / sourceH;
        let drawW, drawH, drawX, drawY;

        // Widescreen Monitor / Laptop / Landscape Tablet vs Portrait Tablet / Mobile
        const isWidescreen = width > height && width >= 800;

        if (isWidescreen) {
          // Widescreen Desktop / Laptop: 3D portrait on left stage
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

        ctx.restore();
      }
    };

    let animationFrameId;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.0001) {
        // High-responsiveness, zero-lag lerp factor (0.18 across all devices)
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const currentIntFrame = Math.round(Math.max(0, Math.min(totalFrames - 1, currentFrameRef.current)));

      // ALWAYS render if frame changed OR lastDrawnFrame was invalidated (e.g. after resize or initial load)
      if (currentIntFrame !== lastDrawnFrameRef.current) {
        render(currentIntFrame);
        lastDrawnFrameRef.current = currentIntFrame;
      }

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, [frames]);

  // Instant Direct Scroll Tracking
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      targetFrameRef.current = val * (totalFrames - 1);

      if (val < 0.25) {
        setActiveStep(0);
      } else if (val >= 0.25 && val < 0.50) {
        setActiveStep(1);
      } else if (val >= 0.50 && val < 0.75) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const storySteps = [
    {
      stepNum: '#01',
      stepName: 'Software Engineering',
      badge: 'SYSTEMS & SOFTWARE ARCHITECTURE',
      icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen animate-spin shrink-0" />,
      title: (
        <>
          Software <span className="text-cybergreen">Developer</span>
        </>
      ),
      description: 'Specializing in Python desktop automation, algorithm design, and full-stack systems engineering built for scalability and performance.',
      pills: ['Python 3.11', 'Algorithms & DS', 'PyQt6 & Full-Stack'],
      buttons: true,
    },
    {
      stepNum: '#02',
      stepName: 'IIT KGP Research',
      badge: 'IIT KHARAGPUR RESEARCH INTERN',
      icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen shrink-0" />,
      title: (
        <>
          Research at <span className="text-cybergreen">IIT Kharagpur</span>
        </>
      ),
      description:
        'Completed research internship on Web Development to Showcase Indoor Air Pollution (IAP) Frameworks under Prof. Sandip Chakraborty, Dept. of CSE, IIT Kharagpur.',
      pills: ['Dept. of CSE', 'Prof. Sandip Chakraborty', 'IAP Frameworks'],
    },
    {
      stepNum: '#03',
      stepName: 'J.E.R.V.I.S Assistant',
      badge: 'INTELLIGENCE MODULE',
      icon: <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen shrink-0" />,
      title: (
        <>
          Custom <span className="text-cybergreen">J.E.R.V.I.S. Assistant</span>
        </>
      ),
      description:
        'Integrating practical AI modules directly into software workflows—most notably engineering J.E.R.V.I.S., a custom desktop voice assistant built for automation.',
      pills: ['Voice Automation', 'Desktop Tooling', 'PyQt6 GUI'],
    },
    {
      stepNum: '#04',
      stepName: 'Full-Stack Web',
      badge: 'DEVELOPMENT STACK',
      icon: <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen shrink-0" />,
      title: (
        <>
          Full-Stack <span className="text-cybergreen">Web Platforms</span>
        </>
      ),
      description:
        'Architecting responsive full-stack applications with HTML5, CSS3, Tailwind, JavaScript, PHP, and MySQL for robust digital experiences.',
      pills: ['HTML5 & CSS3', 'Tailwind CSS', 'PHP & MySQL'],
    },
  ];

  return (
    <section ref={containerRef} id="about" className="relative w-full h-[500vh]">
      {/* Pinned Sticky 3D Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#080c10] flex items-center justify-center">
        {/* Full-bleed Hardware Accelerated Motion Canvas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover filter contrast-[108%] brightness-[104%] saturate-[105%]"
          />
        </div>

        {/* 1. Huge Brand Display Title in About Section */}
        <div className="absolute top-8 sm:top-12 lg:top-20 left-5 sm:left-10 lg:left-14 z-25 pointer-events-none select-none">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cybergreen uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            ABOUT THE
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mt-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)]">
            DEVELOPER<br />JOURNEY
          </h2>
        </div>

        {/* 2. Interactive Step List (#01 - #04) */}
        <div className="hidden lg:block absolute bottom-16 left-6 sm:bottom-20 sm:left-10 lg:left-14 z-25 pointer-events-auto space-y-2 font-mono text-[11px] sm:text-xs">
          {storySteps.map((step, sIdx) => {
            const isActive = sIdx === activeStep;
            return (
              <div
                key={sIdx}
                className={`flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-cybergreen font-bold translate-x-2 scale-105 drop-shadow-[0_0_12px_#00E676]'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => {
                  const targetPct = (sIdx / (storySteps.length - 1));
                  window.scrollTo({
                    top: containerRef.current.offsetTop + targetPct * (containerRef.current.offsetHeight - window.innerHeight),
                    behavior: 'smooth',
                  });
                }}
              >
                <span className="text-[10px] opacity-70 font-semibold">{step.stepNum}</span>
                <span className="truncate">{step.stepName}</span>
              </div>
            );
          })}
        </div>

        {/* 3. Floating Story Panel Container */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-end lg:justify-center items-center lg:items-end pointer-events-none pb-8 sm:pb-12 lg:pb-0">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-md text-left lg:ml-auto lg:mr-10">
            <AnimatePresence mode="wait">
              {storySteps.map((step, idx) => {
                if (idx !== activeStep) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="space-y-3 sm:space-y-5 pointer-events-auto p-5 sm:p-7 rounded-3xl bg-[#080c10]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(0,230,118,0.06)] hover:border-cybergreen/40 transition-all duration-500"
                  >
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/40 text-cybergreen text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
                      {step.icon}
                      <span className="truncate">{step.badge}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
                      {step.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed font-normal text-gray-300">
                      {step.description}
                    </p>

                    {/* Pills */}
                    {step.pills && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {step.pills.map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            className="bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-sm"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {step.buttons && (
                      <div className="flex flex-row flex-wrap gap-2.5 pt-2">
                        <button
                          onClick={() => scrollToSection('projects')}
                          className="bg-gradient-to-r from-cybergreen via-emerald-400 to-cybergreen text-black font-extrabold py-2.5 px-5 sm:px-6 rounded-xl shadow-lg shadow-cybergreen/30 hover:shadow-cybergreen/50 transition-all duration-300 hover:scale-105 text-xs sm:text-sm text-center cursor-pointer"
                        >
                          Explore Work
                        </button>
                        <button
                          onClick={() => scrollToSection('contact')}
                          className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-cybergreen/50 text-white font-semibold py-2.5 px-5 sm:px-6 rounded-xl transition duration-300 text-xs sm:text-sm text-center cursor-pointer backdrop-blur-md"
                        >
                          Get In Touch
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Bottom Navigation Indicator */}
        <div className="absolute bottom-3 sm:bottom-4 left-6 right-6 flex justify-between items-center z-25 font-mono text-[10px] sm:text-xs text-gray-400 pointer-events-auto">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-cybergreen uppercase font-bold tracking-wider">SCROLL TO ROTATE 3D MODEL</span>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-cybergreen transition uppercase cursor-pointer"
            >
              NEXT: SKILLS &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
