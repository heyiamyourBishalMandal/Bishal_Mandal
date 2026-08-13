import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Award } from 'lucide-react';

export default function HeroScrollytelling({ scrollToSection, darkMode }) {
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
    const loadedImages = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = `fram/ezgif-frame-${numStr}.jpg`;
      if (img.decode) {
        img.decode().catch(() => {});
      }
      loadedImages.push(img);
    }
    setFrames(loadedImages);
  }, []);

  // Hardware-Accelerated High-FPS Canvas Engine (Zero Input Lag & Stutter-Free)
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

      // Device-adaptive DPR capping (prevents VRAM exhaustion and lag)
      dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      lastDrawnFrameRef.current = -1; // Force re-render on resize
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

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

        if (width >= 1024) {
          const targetH = Math.max(height * 1.04, width / imgRatio);
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = - (drawW * 0.12);
          drawY = (height - drawH) / 2;
        } else if (width >= 768) {
          const targetH = Math.max(height * 1.02, width / imgRatio);
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = - (drawW * 0.08);
          drawY = (height - drawH) / 2;
        } else {
          const targetH = height * 0.52;
          drawH = targetH;
          drawW = targetH * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = (height * 0.28) - (drawH * 0.35);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = width >= 768 ? 'high' : 'medium';

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

        // Deep Obsidian Black Gradient Edge Fade Mask (#080c10)
        if (width >= 768) {
          const fadeStart = width * 0.38;
          const fadeWidth = width * 0.30;
          const gradient = ctx.createLinearGradient(fadeStart, 0, fadeStart + fadeWidth, 0);

          gradient.addColorStop(0, 'rgba(8, 12, 16, 0)');
          gradient.addColorStop(1, 'rgba(8, 12, 16, 1)');

          ctx.fillStyle = gradient;
          ctx.fillRect(Math.round(fadeStart), 0, Math.round(fadeWidth), Math.round(height));

          ctx.fillStyle = '#080c10';
          ctx.fillRect(Math.round(fadeStart + fadeWidth), 0, Math.round(width - (fadeStart + fadeWidth)), Math.round(height));
        }

        ctx.restore();
      }
    };

    let animationFrameId;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.0001) {
        // High-responsiveness, zero-lag lerp factor (0.18 for instant, silky motion)
        currentFrameRef.current += diff * 0.18;

        const currentIntFrame = Math.round(Math.max(0, Math.min(totalFrames - 1, currentFrameRef.current)));

        if (currentIntFrame !== lastDrawnFrameRef.current) {
          render(currentIntFrame);
          lastDrawnFrameRef.current = currentIntFrame;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [frames]);

  // Instant Direct Scroll Tracking (Eliminates spring delay lag)
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
      stepName: 'Software Developer',
      badge: '"STRENGTH IN STRATEGY, POWER IN PROGRESS"',
      icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cybergreen animate-spin shrink-0" />,
      title: (
        <>
          Hey there, I'm <span className="text-cybergreen">Bishal Mandal</span>
        </>
      ),
      description: 'A passionate Software Developer & Web Designer with research experience at IIT Kharagpur, focusing on impactful web applications and custom software.',
      pills: ['IIT KGP Intern', 'Python / C++ / JS', 'Kolkata, India'],
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
    <section ref={containerRef} id="hero" className="relative w-full h-[500vh]">
      {/* Pinned Sticky 3D Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#080c10] flex items-center justify-center">
        {/* Full-bleed Hardware Accelerated Motion Canvas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover filter contrast-[108%] brightness-[104%] saturate-[105%]"
          />
        </div>

        {/* 1. Huge Brand Display Title */}
        <div className="absolute top-16 left-5 sm:top-24 sm:left-10 lg:left-14 z-25 pointer-events-none select-none">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cybergreen uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            WELCOME TO
          </span>
          <h1 className="text-2xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mt-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.98)]">
            BISHAL<br />MANDAL
          </h1>
        </div>

        {/* 2. Interactive Step List (#01 - #04) */}
        <div className="hidden md:block absolute bottom-16 left-6 sm:bottom-20 sm:left-10 lg:left-14 z-25 pointer-events-auto space-y-2 font-mono text-[11px] sm:text-xs">
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
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-full flex flex-col justify-end md:justify-center items-end pointer-events-none pb-12 md:pb-0">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-md text-left md:ml-auto md:mr-2 lg:mr-10">
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
                    className="space-y-3 sm:space-y-5 pointer-events-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#080c10]/90 backdrop-blur-xl border border-gray-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                  >
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cybergreen/10 border border-cybergreen/40 text-cybergreen text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider max-w-full">
                      {step.icon}
                      <span className="truncate">{step.badge}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
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
                            className="bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-full"
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
                          className="bg-cybergreen hover:bg-emerald-400 text-black font-extrabold py-2.5 px-4 sm:px-5 rounded-xl shadow-lg shadow-cybergreen/30 transition duration-300 hover:scale-105 text-xs sm:text-sm text-center cursor-pointer"
                        >
                          View My Work
                        </button>
                        <button
                          onClick={() => scrollToSection('contact')}
                          className="bg-gray-900 border border-gray-700 text-white font-semibold py-2.5 px-4 sm:px-5 rounded-xl hover:bg-gray-800 transition duration-300 text-xs sm:text-sm text-center cursor-pointer"
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

        {/* 4. Bottom Navigation Links */}
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
        </div>
      </div>
    </section>
  );
}
