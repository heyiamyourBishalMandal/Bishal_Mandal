document.addEventListener('DOMContentLoaded', () => {
  // Set current year in the footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // JavaScript for active navigation link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateNavLink = (id) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      }
    });
  };

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // Changed threshold to 20% to make it more sensitive
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateNavLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Initial activation on page load
  // Check which section is in view on load and activate its nav link
  const initialActiveSection = Array.from(sections).find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
  });
  if (initialActiveSection) {
    activateNavLink(initialActiveSection.id);
  } else {
    // Fallback to home if no section is in view (e.g., very short page)
    activateNavLink('home');
  }

  // Hamburger menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const overlayNavLinks = mobileMenuOverlay.querySelectorAll('.nav-link'); // Get links from the mobile overlay

  mobileMenuButton.addEventListener('click', () => {
    mobileMenuOverlay.classList.toggle('hidden');
    // Add ARIA attributes for accessibility
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  });

  // Close mobile menu when a nav link is clicked
  overlayNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenuOverlay.classList.contains('hidden')) {
        mobileMenuOverlay.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
      }
    });
  });

  // Close mobile menu if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
      mobileMenuOverlay.classList.add('hidden'); // Ensure it's hidden on desktop
      mobileMenuButton.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
    }
  });

  // Particles.js initialization
  // Ensure particlesJS is available globally from the CDN script
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg", // This is a placeholder, particles.js can use images
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  } else {
    console.error("particles.js not loaded. Check CDN script in HTML.");
  }

  // Typing effect for home section
  const typingTextElement = document.getElementById('typing-text');
  const phrases = [
    "Software Developer",
    "Web Designer",
    "Problem Solver",
    "Tech Enthusiast"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character
  const pauseBeforeDelete = 1500; // milliseconds to pause before deleting
  const pauseBeforeType = 500; // milliseconds to pause before typing next phrase

  function typeWriterEffect() {
    if (!typingTextElement) return; // Exit if element not found

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting text
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing text
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing, then start deleting
      currentSpeed = pauseBeforeDelete;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Pause at the end of deleting, then move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      currentSpeed = pauseBeforeType;
    }

    setTimeout(typeWriterEffect, currentSpeed);
  }

  // Start the typing effect when the DOM is fully loaded
  if (typingTextElement) {
    typeWriterEffect();
  }

  // Project Filtering Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectGrid = document.getElementById('project-grid'); // Get the grid container

  function filterProjects(category) {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active-filter-btn'));

    // Add active class to the clicked button
    const activeButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (activeButton) {
      activeButton.classList.add('active-filter-btn');
    }

    // Temporarily hide all cards to reset the grid
    projectCards.forEach(card => {
      card.style.display = 'none';
    });

    const filteredCards = [];

    projectCards.forEach(card => {
      const cardCategories = card.dataset.category.split(' '); // Split categories by space
      if (category === 'all' || cardCategories.includes(category)) {
        filteredCards.push(card);
      }
    });

    // Re-append and show filtered cards
    filteredCards.forEach(card => {
      card.style.display = ''; // Show the card
      projectGrid.appendChild(card); // Re-append to maintain order within the grid
    });
  }

  // Add event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      filterProjects(category);
    });
  });

  // Initialize with 'all' projects shown on load
  filterProjects('all');


  // Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const skillCardItems = document.querySelectorAll('.skill-card-item');
  const projectCardItems = document.querySelectorAll('.project-card'); // Project cards also animate

  const revealObserverOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, revealObserverOptions);

  // Observe main sections
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Observe skill cards with staggered delay
  skillCardItems.forEach((item, index) => {
    item.classList.add('scroll-reveal'); // Ensure it has the base reveal class
    item.classList.add(`card-delay-${(index % 6) + 1}`); // Apply staggered delay class (1-6)
    revealObserver.observe(item);
  });

  // Observe project cards with staggered delay (after initial filter is applied)
  // We need to re-observe projects after filtering as their DOM position changes
  // A simpler approach for projects might be to let the filter handle visibility
  // and rely on the initial scroll-reveal for the grid itself.
  // However, if you want individual project cards to animate on scroll *within* the filtered view,
  // you'd need to re-run the observer logic after each filter.
  // For now, I'll apply it to the initial load.
  projectCardItems.forEach((item, index) => {
    item.classList.add('scroll-reveal'); // Ensure it has the base reveal class
    // Optional: Add staggered delay if desired, similar to skill cards
    // item.classList.add(`card-delay-${(index % 6) + 1}`);
    revealObserver.observe(item);
  });

  // Re-observe project cards after filter operation to ensure animations
  // This is a more complex scenario. For simplicity, the initial reveal is applied.
  // If you need re-animation on filter, consider a more advanced library or
  // re-initializing observers after filter, which can be performance heavy.
});