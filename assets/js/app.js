/**
 * VEGA REDESIGN - MAIN APPLICATION ORCHESTRATOR
 * Lenis Smooth Scroll, ScrollTrigger / Reveal Effects, Navbar & Global Utilities
 */

(function () {
  const VegaApp = {
    lenis: null,

    init() {
      this.initSmoothScroll();
      this.initNavbar();
      this.initScrollReveal();
      this.initMobileNav();
      this.markActiveNavLink();
    },

    /**
     * Initialize Lenis Smooth Scroll
     */
    initSmoothScroll() {
      if (typeof Lenis !== 'undefined') {
        try {
          this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2
          });

          const raf = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);

          // Integrate with GSAP ScrollTrigger if present
          if (typeof ScrollTrigger !== 'undefined') {
            this.lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
              this.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
          }
        } catch (e) {
          console.warn('Lenis initialization skipped:', e);
        }
      }
    },

    /**
     * Navbar scroll state management
     */
    initNavbar() {
      const nav = document.querySelector('.site-nav');
      if (!nav) return;

      const handleScroll = () => {
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    },

    /**
     * Reveal on scroll utility using IntersectionObserver or GSAP
     */
    initScrollReveal() {
      const revealElements = document.querySelectorAll('.reveal, [data-reveal]');
      if (revealElements.length === 0) return;

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        revealElements.forEach(el => {
          gsap.fromTo(el, 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        });
      } else {
        // High-performance IntersectionObserver fallback
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        revealElements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(24px)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.observe(el);
        });
      }
    },

    /**
     * Mobile Menu Navigation
     */
    initMobileNav() {
      const toggle = document.querySelector('.mobile-toggle');
      const mobileNav = document.getElementById('mobile-nav-menu');
      if (!toggle || !mobileNav) return;

      toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    },

    /**
     * Mark active navigation link
     */
    markActiveNavLink() {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('.nav-link');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (
          href === currentPath ||
          (href === '/index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
          (href && currentPath.endsWith(href))
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.VegaApp = VegaApp;

  document.addEventListener('DOMContentLoaded', () => {
    VegaApp.init();
  });
})();
