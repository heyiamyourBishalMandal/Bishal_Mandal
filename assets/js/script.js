document.addEventListener('DOMContentLoaded', () => {
    // --- SPLASH SCREEN LOGIC ---
    window.addEventListener('load', () => {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                setTimeout(() => {
                    splashScreen.remove();
                }, 600);
            }, 1500); 
        }
    });
  
    // Set current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // --- DARK/LIGHT MODE TOGGLE LOGIC ---
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const darkIconDesktop = document.getElementById('theme-toggle-dark-icon-desktop');
    const lightIconDesktop = document.getElementById('theme-toggle-light-icon-desktop');
    const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
  
    function initializeTheme() {
      let currentTheme = 'light';
      if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          if(lightIconDesktop) lightIconDesktop.classList.remove('hidden');
          if(lightIconMobile) lightIconMobile.classList.remove('hidden');
          currentTheme = 'dark';
      } else {
          document.documentElement.classList.remove('dark');
          if(darkIconDesktop) darkIconDesktop.classList.remove('hidden');
          if(darkIconMobile) darkIconMobile.classList.remove('hidden');
      }
      loadParticles(currentTheme);
    }
  
    function toggleTheme() {
      darkIconDesktop.classList.toggle('hidden');
      lightIconDesktop.classList.toggle('hidden');
      darkIconMobile.classList.toggle('hidden');
      lightIconMobile.classList.toggle('hidden');
  
      let newTheme = 'light';
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
          newTheme = 'light';
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
          newTheme = 'dark';
      }
      loadParticles(newTheme);
    }
    
    initializeTheme();
  
    if(themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
    if(themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
  
    // --- FLOATING NAVBAR SCROLL SHIFT LOGIC (Optimized) ---
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.remove('top-0', 'border-b', 'p-3', 'sm:p-4');
                    navbar.classList.add('top-2', 'sm:top-4', 'max-w-[95%]', 'md:max-w-5xl', 'mx-auto', 'rounded-2xl', 'sm:rounded-full', 'border', 'border-gray-200/30', 'dark:border-gray-700/50', 'py-2.5', 'px-4', 'sm:px-8', 'shadow-lg');
                } else {
                    navbar.classList.add('top-0', 'border-b', 'p-3', 'sm:p-4');
                    navbar.classList.remove('top-2', 'sm:top-4', 'max-w-[95%]', 'md:max-w-5xl', 'mx-auto', 'rounded-2xl', 'sm:rounded-full', 'border', 'border-gray-200/30', 'dark:border-gray-700/50', 'py-2.5', 'px-4', 'sm:px-8', 'shadow-lg');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
  
    // --- INTERACTIVE TERMINAL SIMULATION ENGINE (Cached DOM) ---
    const terminalSequence = [
      { lineId: "line1", cursorId: "cursor1", outputId: "output1", text: "init --profile=production --verbose" },
      { lineId: "line2", cursorId: "cursor2", outputId: "output2", text: "cat technical_competencies.json" }
    ];
  
    function runTerminalSequence(index) {
      if (index >= terminalSequence.length) return;
      const data = terminalSequence[index];
      const lineElement = document.getElementById(data.lineId);
      const cursorElement = document.getElementById(data.cursorId);
      const outputElement = document.getElementById(data.outputId);
  
      if (index > 0) {
        const promptNext = document.getElementById(`prompt${index + 1}`);
        if (promptNext) promptNext.classList.remove('hidden');
        if (cursorElement) cursorElement.classList.remove('hidden');
      }
  
      let charIndex = 0;
      const targetText = data.text;
  
      function renderKeystroke() {
        if (charIndex < targetText.length) {
          if (lineElement) lineElement.textContent += targetText.charAt(charIndex);
          charIndex++;
          setTimeout(renderKeystroke, 40);
        } else {
          if (cursorElement) cursorElement.classList.add('hidden');
          if (outputElement) {
            outputElement.classList.remove('hidden');
            outputElement.classList.add('block');
          }
          setTimeout(() => { runTerminalSequence(index + 1); }, 500);
        }
      }
      renderKeystroke();
    }
    setTimeout(() => { runTerminalSequence(0); }, 600);
  
    // --- SINGLE PAGE APPLICATION (SPA) ROUTING ENGINE ---
    const navTriggers = document.querySelectorAll('.nav-trigger');
    const spaViews = document.querySelectorAll('.spa-view');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
  
            // 1. Hide all views
            spaViews.forEach(view => {
                view.classList.remove('active');
                view.classList.add('hidden');
            });
  
            // 2. Remove 'active' state from all nav buttons
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
  
            // 3. Show the targeted view
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
  
            // 4. Highlight the clicked button (unless it's the logo)
            if (trigger.classList.contains('nav-link')) {
                trigger.classList.add('active');
            }
  
            // 5. Scroll instantly to top of the page for the new view
            window.scrollTo({ top: 0, behavior: 'instant' });
  
            // 6. Close Mobile Menu if open
            if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('menu-open')) {
                mobileMenuOverlay.classList.remove('menu-open');
                if (mobileMenuButton) {
                    mobileMenuButton.classList.remove('menu-active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
  
            // 7. Re-trigger Scroll Reveal Animations in the new view
            const revealElements = targetView.querySelectorAll('.scroll-reveal');
            revealElements.forEach(el => {
                el.classList.remove('revealed'); 
                setTimeout(() => el.classList.add('revealed'), 100);
            });

            // 8. Motion Design View Activation Hook
            if (targetId === 'view-motion' && window.onMotionViewActivated) {
                window.onMotionViewActivated();
            }
        });
    });
  
    // --- HIGH-END MOBILE MENU LOGIC ---
    const overlayNavLinks = mobileMenuOverlay ? mobileMenuOverlay.querySelectorAll('.nav-link') : []; 
  
    if (mobileMenuButton && mobileMenuOverlay) {
      mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileMenuOverlay.classList.contains('menu-open');
  
        if (!isOpen) {
          mobileMenuOverlay.classList.add('menu-open');
          mobileMenuButton.classList.add('menu-active');
          mobileMenuButton.setAttribute('aria-expanded', 'true');
        } else {
          mobileMenuOverlay.classList.remove('menu-open');
          mobileMenuButton.classList.remove('menu-active');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
      });
  
      document.addEventListener('click', (e) => {
        if (!mobileMenuOverlay.contains(e.target) && !mobileMenuButton.contains(e.target)) {
          mobileMenuOverlay.classList.remove('menu-open');
          mobileMenuButton.classList.remove('menu-active');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
      });
    }
  
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && mobileMenuOverlay) { 
        mobileMenuOverlay.classList.remove('menu-open'); 
        if (mobileMenuButton) {
          mobileMenuButton.classList.remove('menu-active');
          mobileMenuButton.setAttribute('aria-expanded', 'false'); 
        }
      }
    });
  
    // --- PARTICLES.JS INITIALIZATION ---
    function loadParticles(theme) {
      if (typeof particlesJS === 'undefined') return;
      
      try {
          if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = []; 
          }
      
          const particleColor = theme === 'dark' ? '#00E676' : '#10b981'; 
          const lineColor = theme === 'dark' ? '#00E676' : '#10b981';     
      
          particlesJS('particles-js', {
            "particles": {
              "number": { "value": 45, "density": { "enable": true, "value_area": 1000 } },
              "color": { "value": particleColor },
              "shape": { "type": "circle" },
              "opacity": { "value": theme === 'dark' ? 0.25 : 0.15, "random": false },
              "size": { "value": 2.5, "random": true },
              "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.12, "width": 1 },
              "move": { "enable": true, "speed": 2.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
              "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.4 } }, "push": { "particles_nb": 3 } }
            },
            "retina_detect": true
          });
      } catch(e) {
          console.warn("Particles.js failed to initialize.", e);
      }
    }
    
    // --- TYPING EFFECT ---
    const typingTextElement = document.getElementById('typing-text');
    const phrases = [ "Software Developer", "Automation Designer", "Full-Stack Architect" ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
  
    function typeWriterEffect() {
      if (!typingTextElement) return; 
      const currentPhrase = phrases[phraseIndex];
  
      if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }
  
      let currentSpeed = isDeleting ? 45 : 90;
      if (!isDeleting && charIndex === currentPhrase.length) {
        currentSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentSpeed = 400;
      }
      setTimeout(typeWriterEffect, currentSpeed);
    }
  
    if (typingTextElement) typeWriterEffect();
  
    // --- PROJECT FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    function filterProjects(category) {
      filterButtons.forEach(button => button.classList.remove('active-filter-btn'));
      const activeButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
      if (activeButton) activeButton.classList.add('active-filter-btn');
  
      projectCards.forEach(card => {
        const cardCategories = card.dataset.category.split(' '); 
        if (category === 'all' || cardCategories.includes(category)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => { filterProjects(button.dataset.category); });
    });
  
    filterProjects('all');
  
    // --- SCROLL REVEAL ANIMATIONS INITIAL LOAD ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); 
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.08 });
  
    revealElements.forEach(element => revealObserver.observe(element));

    // --- 3D SCROLLYTELLING FRAME ANIMATION ENGINE ---
    function initScrollytellingEngine() {
        const canvas = document.getElementById('scroll-motion-canvas');
        const scrollySection = document.getElementById('scrollytelling-section');
        const loader = document.getElementById('scrolly-loader');
        const loaderPercent = document.getElementById('scrolly-loader-percent');
        const progressBar = document.getElementById('scrolly-progress-bar');
        const hudStep = document.getElementById('scrolly-hud-step');
        const frameCountHud = document.getElementById('scrolly-frame-count');

        const card0 = document.getElementById('story-card-0');
        const card1 = document.getElementById('story-card-1');
        const card2 = document.getElementById('story-card-2');
        const card3 = document.getElementById('story-card-3');
        const card4 = document.getElementById('story-card-4');
        const card5 = document.getElementById('story-card-5');
        const storyCards = [card0, card1, card2, card3, card4, card5];

        if (!canvas || !scrollySection) return;

        const ctx = canvas.getContext('2d');
        const totalFrames = 37;
        const frames = [];
        let loadedCount = 0;
        let isLoaded = false;

        let targetFrameFloat = 0;
        let currentFrameFloat = 0;

        // 1. Preload 37 Frame Sequence with Instant Fallback
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameNumStr = String(i).padStart(3, '0');
            img.src = `fram/ezgif-frame-${frameNumStr}.jpg`;
            img.onload = () => {
                loadedCount++;
                const pct = Math.floor((loadedCount / totalFrames) * 100);
                if (loaderPercent) loaderPercent.textContent = `${pct}%`;
                
                // Set isLoaded on first frame load so screen is never blank!
                if (!isLoaded && loadedCount >= 1) {
                    isLoaded = true;
                    resizeCanvas();
                    renderCurrentFrame();
                }

                if (loadedCount === totalFrames) {
                    if (loader) {
                        loader.style.opacity = '0';
                        setTimeout(() => loader.style.display = 'none', 400);
                    }
                }
            };
            img.onerror = () => {
                loadedCount++;
                isLoaded = true;
                if (loadedCount === totalFrames && loader) {
                    loader.style.display = 'none';
                }
            };
            frames.push(img);
        }

        // Safety fallback timer: force engine online after 1.2s max
        setTimeout(() => {
            isLoaded = true;
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 300);
            }
            resizeCanvas();
            renderCurrentFrame();
        }, 1200);

        // 2. Canvas Resize
        function resizeCanvas() {
            if (!canvas) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            renderCurrentFrame();
        }

        window.addEventListener('resize', resizeCanvas);

        // 3. Render Canvas Frame (Instant render with nearest-frame fallback)
        function renderCurrentFrame() {
            if (frames.length === 0) return;
            const width = window.innerWidth;
            const height = window.innerHeight;

            ctx.clearRect(0, 0, width, height);

            const displayIndex = Math.floor(Math.max(0, Math.min(totalFrames - 1, currentFrameFloat)));
            let img = frames[displayIndex];

            // Nearest-frame fallback if current target frame is still buffering
            if (!img || !img.complete || img.naturalWidth === 0) {
                img = frames.find(f => f && f.complete && f.naturalWidth > 0) || frames[0];
            }

            if (img && img.complete && img.naturalWidth > 0) {
                const imgRatio = img.naturalWidth / img.naturalHeight;
                const canvasRatio = width / height;
                let drawW, drawH, drawX, drawY;

                // Cover-fit math with top-alignment to guarantee 100% full portrait & head visibility
                if (canvasRatio > imgRatio) {
                    drawW = width;
                    drawH = width / imgRatio;
                    drawX = 0;
                    drawY = 0;
                } else {
                    drawH = height;
                    drawW = height * imgRatio;
                    drawX = (width - drawW) * 0.15;
                    drawY = 0;
                }

                ctx.drawImage(img, drawX, drawY, drawW, drawH);
            }

            if (frameCountHud) {
                frameCountHud.textContent = `FRAME ${String(displayIndex + 1).padStart(2, '0')} / ${totalFrames}`;
            }
        }

        let isUserScrolling = false;
        let scrollTimeout = null;
        let autoPlayDirection = 1;

        window.addEventListener('scroll', () => {
            isUserScrolling = true;
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 1000);
        }, { passive: true });

        let targetTiltX = 0, targetTiltY = 0;
        let currentTiltX = 0, currentTiltY = 0;

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            targetTiltX = y * -8; // Rotate X (pitch)
            targetTiltY = x * 8;  // Rotate Y (yaw)
        });

        // 4. Sticky Scrollytelling Lerp & Card Step Engine
        function updateScrollFrame() {
            const rect = scrollySection.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;

            let scrollProgress = 0;
            if (totalScrollable > 0) {
                const currentScroll = -rect.top;
                scrollProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
            }

            // Map progress directly to target 3D frame (0 to 36) when scrolling
            if (isUserScrolling) {
                targetFrameFloat = scrollProgress * (totalFrames - 1);
            }

            // Update Progress Bar
            if (progressBar) {
                progressBar.style.width = `${scrollProgress * 100}%`;
            }

            // 3D Spatial Canvas Zoom & Gyroscope Tilt Effect
            const depthScale = 1.0 + Math.sin(scrollProgress * Math.PI) * 0.05;
            const scrollTiltX = (scrollProgress - 0.5) * 4;
            
            // Lerp Mouse Gyroscope Tilt for 60 FPS spatial depth
            currentTiltX += (targetTiltX - currentTiltX) * 0.1;
            currentTiltY += (targetTiltY - currentTiltY) * 0.1;

            if (canvas) {
                canvas.style.transform = `perspective(1200px) scale3d(${depthScale.toFixed(4)}, ${depthScale.toFixed(4)}, 1) rotateX(${(scrollTiltX + currentTiltX).toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
            }

            // Story Card Step Thresholds for 6 cards
            let activeStepIndex = 0;
            if (scrollProgress < 0.15) {
                activeStepIndex = 0;
                if (hudStep) hudStep.textContent = "00 // HERO INTRO";
            } else if (scrollProgress >= 0.15 && scrollProgress < 0.32) {
                activeStepIndex = 1;
                if (hudStep) hudStep.textContent = "01 // WHO I AM";
            } else if (scrollProgress >= 0.32 && scrollProgress < 0.50) {
                activeStepIndex = 2;
                if (hudStep) hudStep.textContent = "02 // LOGIC & COMPUTATION";
            } else if (scrollProgress >= 0.50 && scrollProgress < 0.68) {
                activeStepIndex = 3;
                if (hudStep) hudStep.textContent = "03 // WHAT I DO";
            } else if (scrollProgress >= 0.68 && scrollProgress < 0.85) {
                activeStepIndex = 4;
                if (hudStep) hudStep.textContent = "04 // WHAT I WANT";
            } else {
                activeStepIndex = 5;
                if (hudStep) hudStep.textContent = "05 // READY TO EXPLORE";
            }

            storyCards.forEach((card, idx) => {
                if (!card) return;
                if (idx === activeStepIndex) {
                    card.classList.remove('hidden');
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                    card.classList.add('hidden');
                }
            });
        }

        window.addEventListener('scroll', updateScrollFrame, { passive: true });

        // Animation Loop with Idle Auto-Play Ping-Pong + Scroll Sync
        function animLoop() {
            if (!isUserScrolling) {
                // Ping-pong idle auto-play so 3D motion is ALWAYS active and visible!
                targetFrameFloat += autoPlayDirection * 0.2;
                if (targetFrameFloat >= totalFrames - 1) {
                    targetFrameFloat = totalFrames - 1;
                    autoPlayDirection = -1;
                } else if (targetFrameFloat <= 0) {
                    targetFrameFloat = 0;
                    autoPlayDirection = 1;
                }
            }

            const diff = targetFrameFloat - currentFrameFloat;
            if (Math.abs(diff) > 0.001) {
                currentFrameFloat += diff * 0.15;
                renderCurrentFrame();
            } else {
                currentFrameFloat = targetFrameFloat;
                renderCurrentFrame();
            }

            updateScrollFrame();
            requestAnimationFrame(animLoop);
        }
        requestAnimationFrame(animLoop);
    }

    // --- TOAST NOTIFICATION SYSTEM ---
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `flex items-center gap-3 bg-[#0b1017]/95 border ${type === 'success' ? 'border-cybergreen/60 text-cybergreen' : 'border-blue-500/60 text-blue-400'} px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl font-mono text-xs font-bold transform translate-y-8 opacity-0 transition-all duration-300 pointer-events-auto`;
        
        toast.innerHTML = `
            <span class="w-2.5 h-2.5 rounded-full ${type === 'success' ? 'bg-cybergreen animate-ping' : 'bg-blue-400 animate-pulse'}"></span>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-8', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        });

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // --- INTERACTIVE CYBERPUNK TERMINAL SIMULATOR ---
    function initCyberTerminal() {
        const terminalForm = document.getElementById('terminal-form');
        const terminalInput = document.getElementById('terminal-input');
        const terminalBody = document.getElementById('terminal-body');

        if (!terminalForm || !terminalInput || !terminalBody) return;

        const commands = {
            'whoami': 'Bishal Mandal — Software Developer | Systems Architect | BCA 2025 Graduate | Preparing for NIMCET June 6, 2026. Target: Top NIT MCA & Google Systems Engineering.',
            'skills': 'Primary Stack: Python 3.11, C++, JavaScript ES6+, PyQt6, MySQL, HTML5/CSS3, Tailwind CSS, System Automation, RESTful APIs.',
            'projects': 'Featured Systems:\n1. J.E.R.V.I.S Desktop Assistant (PyQt6/Python)\n2. Sweet Shop E-Commerce Platform\n3. 3D Kinetic Canvas Engine\n4. NIMCET Rank Predictor & Analytics',
            'nimcet': 'Target Date: JUNE 6, 2026. Objective: Top-tier NIT Master of Computer Applications (MCA) seat. Focus: Advanced Mathematics & Computer Science.',
            'contact': 'Email: contact@bishalmandal.dev | LinkedIn: bishal-mandal-0bb756264 | Form Active Below.',
            'help': 'Available System Commands:\n  whoami   - Display developer bio & trajectory\n  skills   - List technical stack & competencies\n  projects - View flagship software projects\n  nimcet   - View NIMCET 2026 prep status\n  contact  - Display direct contact channels\n  clear    - Reset terminal screen'
        };

        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = terminalInput.value.trim().toLowerCase();
            if (!cmd) return;

            const inputLine = document.createElement('div');
            inputLine.className = 'flex items-center gap-2 text-white font-bold';
            inputLine.innerHTML = `<span class="text-cybergreen">$</span> <span>${escapeHtml(cmd)}</span>`;
            terminalBody.appendChild(inputLine);

            if (cmd === 'clear') {
                terminalBody.innerHTML = `
                    <div class="text-cybergreen">Terminal cleared. Type <span class="font-bold underline text-white">help</span> for available commands.</div>
                `;
            } else if (commands[cmd]) {
                const outputLine = document.createElement('div');
                outputLine.className = 'text-cybergreen/90 whitespace-pre-wrap pl-3 border-l border-cybergreen/40 my-1';
                outputLine.textContent = commands[cmd];
                terminalBody.appendChild(outputLine);
            } else {
                const errLine = document.createElement('div');
                errLine.className = 'text-red-400/90 pl-3 border-l border-red-500/40 my-1';
                errLine.textContent = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
                terminalBody.appendChild(errLine);
            }

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
    }

    function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // --- PROJECT SPECIFICATIONS MODAL SYSTEM ---
    function initProjectModal() {
        const modal = document.getElementById('project-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const modalCloseAction = document.getElementById('modal-close-action');
        const modalTitle = document.getElementById('modal-title');
        const modalCategory = document.getElementById('modal-category');
        const modalDescription = document.getElementById('modal-description');
        const modalTags = document.getElementById('modal-tags');
        const modalGithub = document.getElementById('modal-github-link');

        if (!modal) return;

        const projectData = {
            'jervis': {
                title: 'J.E.R.V.I.S. Desktop Assistant',
                category: 'AUTOMATION & DESKTOP SYSTEM',
                description: 'A modular, custom desktop assistant built with Python 3.11 and PyQt6. Features voice command recognition, system process controls, automated browser workflows, audio feedback engine, and background task scheduling.',
                tags: ['Python 3.11', 'PyQt6', 'SpeechRecognition', 'PyTTSx3', 'System Automation', 'Process Control'],
                github: 'https://github.com/heyiamyourbishalmandal'
            },
            'ecommerce': {
                title: 'Sweet Shop E-Commerce Platform',
                category: 'FULL-STACK WEB PLATFORM',
                description: 'Commercial online sales application engineered for a local retail business. Features responsive catalog filtering, shopping cart state management, checkout routing, and structured database schema.',
                tags: ['Full-Stack', 'JavaScript ES6', 'Tailwind CSS', 'MySQL Schema', 'Responsive Web UI'],
                github: 'https://github.com/heyiamyourbishalmandal'
            },
            'scrollytelling': {
                title: '3D Kinetic Scrollytelling Engine',
                category: 'KINETIC CANVAS FRAMEWORK',
                description: 'High-performance 60 FPS HTML5 Canvas2D frame scrubbing framework with sub-pixel lerp physics, spatial CSS 3D perspective transforms, and mouse gyroscope parallax responsiveness.',
                tags: ['HTML5 Canvas', 'Vanilla JS Lerp', 'CSS3D Spatial', 'WebGL Physics', 'Interactive UI'],
                github: 'https://github.com/heyiamyourbishalmandal'
            },
            'nimcet': {
                title: 'NIMCET Rank Predictor & Prep Analytics',
                category: 'DATA & ANALYTICS PORTAL',
                description: 'An algorithmic data portal designed to simulate NIMCET exam scoring models, calculate percentile rank estimations across all NIT institutes, and track subject performance.',
                tags: ['Python Data', 'Mathematics Logic', 'Algorithm Design', 'Data Visualization'],
                github: 'https://github.com/heyiamyourbishalmandal'
            }
        };

        document.querySelectorAll('.open-project-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const projKey = btn.getAttribute('data-project');
                const data = projectData[projKey];
                if (!data) return;

                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDescription.textContent = data.description;
                if (modalGithub) modalGithub.href = data.github;

                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'bg-cybergreen/10 text-cybergreen border border-cybergreen/30 text-xs font-mono font-bold px-3 py-1 rounded-full';
                    tagSpan.textContent = tag;
                    modalTags.appendChild(tagSpan);
                });

                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- PROJECT CATEGORY FILTERING ---
    function initProjectFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active-filter-btn', 'bg-cybergreen', 'text-black', 'shadow-lg');
                    b.classList.add('bg-gray-200/80', 'dark:bg-gray-800/80', 'text-gray-700', 'dark:text-gray-300');
                });
                btn.classList.add('active-filter-btn', 'bg-cybergreen', 'text-black', 'shadow-lg');
                btn.classList.remove('bg-gray-200/80', 'dark:bg-gray-800/80', 'text-gray-700', 'dark:text-gray-300');

                const cat = btn.getAttribute('data-category');
                projectCards.forEach(card => {
                    const cardCats = card.getAttribute('data-category') || '';
                    if (cat === 'all' || cardCats.includes(cat)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- RESUME DOWNLOAD & ACTION HANDLERS ---
    function initActionHandlers() {
        const resumeBtn = document.getElementById('download-resume-btn');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                showToast('Resume Download Initiated!', 'success');
            });
        }

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                showToast('Message Sent Successfully! I will reply shortly.', 'success');
            });
        }
    }

    initScrollytellingEngine();
    initCyberTerminal();
    initProjectModal();
    initProjectFiltering();
    initActionHandlers();
  });