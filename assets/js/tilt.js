/**
 * VEGA REDESIGN - 3D TILT ENGINE
 * Provides tactile 3D perspective and specular glare on hover.
 * Zero hardcoded colors; respects prefers-reduced-motion.
 */

(function () {
  class TiltEffect {
    constructor(element, options = {}) {
      this.el = element;
      this.settings = Object.assign({
        max: 12,              // Max tilt rotation (degrees)
        perspective: 1000,    // Perspective depth
        scale: 1.025,         // Scale on hover
        speed: 300,           // Transition speed
        glare: true,          // Specular glare effect
        maxGlare: 0.25        // Max glare opacity
      }, options);

      this.isHovering = false;
      this.init();
    }

    init() {
      this.el.style.transformStyle = 'preserve-3d';
      
      if (this.settings.glare) {
        this.createGlare();
      }

      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);

      this.el.addEventListener('mouseenter', this.onMouseEnter);
      this.el.addEventListener('mousemove', this.onMouseMove);
      this.el.addEventListener('mouseleave', this.onMouseLeave);
    }

    createGlare() {
      let glareContainer = this.el.querySelector('.tilt-glare');
      if (!glareContainer) {
        glareContainer = document.createElement('div');
        glareContainer.className = 'tilt-glare';
        glareContainer.style.cssText = `
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          border-radius: inherit;
          z-index: 10;
        `;

        this.glareElement = document.createElement('div');
        this.glareElement.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(var(--ignite-rgb), 0.35) 0%, rgba(var(--frost-rgb), 0.15) 30%, transparent 70%);
          width: 200%;
          height: 200%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity ${this.settings.speed}ms cubic-bezier(0.16, 1, 0.3, 1);
        `;

        glareContainer.appendChild(this.glareElement);
        this.el.appendChild(glareContainer);
      } else {
        this.glareElement = glareContainer.firstElementChild;
      }
    }

    onMouseEnter() {
      this.isHovering = true;
      this.el.style.willChange = 'transform';
      this.el.style.transition = `transform ${this.settings.speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      if (this.glareElement) {
        this.glareElement.style.opacity = this.settings.maxGlare;
      }
    }

    onMouseMove(event) {
      if (!this.isHovering) return;
      const rect = this.el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const percentX = (x / rect.width) * 2 - 1; // -1 to 1
      const percentY = (y / rect.height) * 2 - 1; // -1 to 1

      const rotateX = (-percentY * this.settings.max).toFixed(2);
      const rotateY = (percentX * this.settings.max).toFixed(2);

      this.el.style.transition = 'none';
      this.el.style.transform = `perspective(${this.settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;

      if (this.glareElement) {
        const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) - 90;
        this.glareElement.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    }

    onMouseLeave() {
      this.isHovering = false;
      this.el.style.willChange = 'auto';
      this.el.style.transition = `transform ${this.settings.speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      this.el.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (this.glareElement) {
        this.glareElement.style.opacity = '0';
      }
    }

    destroy() {
      this.el.style.willChange = 'auto';
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
      this.el.removeEventListener('mousemove', this.onMouseMove);
      this.el.removeEventListener('mouseleave', this.onMouseLeave);
      const glareContainer = this.el.querySelector('.tilt-glare');
      if (glareContainer) glareContainer.remove();
    }
  }

  window.VegaTilt = {
    init(selector = '[data-tilt], .tilt-card', options = {}) {
      // Respect prefers-reduced-motion & touch screens
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(hover: none)').matches) return;
      
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (!el.__vegaTilt) {
          el.__vegaTilt = new TiltEffect(el, options);
        }
      });
    },
    bind(element, options = {}) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(hover: none)').matches) return;
      if (element && !element.__vegaTilt) {
        element.__vegaTilt = new TiltEffect(element, options);
      }
    }
  };

  window.initTiltCards = function(selector, options) {
    if (window.VegaTilt) window.VegaTilt.init(selector, options);
  };

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.VegaTilt.init();
  });
})();
