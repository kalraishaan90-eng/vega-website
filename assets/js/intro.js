/**
 * VEGA SPORTWEAR — FULL-SCREEN 3D INTRO SEQUENCE
 *
 * Sequence (~3.5s total):
 * 1. Black screen (--void). Real Vega V logo mark centered, extruded as 3D shape
 *    using Three.js SVGLoader + ExtrudeGeometry from vector paths.
 *    Flat matte graphite material with a thin Ignite orange-red (#FE492A) edge rim light.
 *    No glow, no bloom.
 * 2. 0–2.0s: V spins on Y axis, easing from slow to fast (ease-in), slight camera push-in.
 * 3. 2.0s: EXPLODE. Geometry converted to non-indexed shards; each triangle gets outward
 *    velocity + rotation + gravity. Short camera shake + 80ms white flash frame.
 *    Shards fade and scale out over ~1s.
 * 4. 2.4s: At peak explosion, remove overlay & start site. Nav slides in, hero headline
 *    reveals line-by-line (clip-path mask, 60ms stagger), hero image/content settles in.
 *    Scroll unlocked.
 *
 * Requirements:
 * - Play once per session (sessionStorage flag). Repeat visits skip straight to the site.
 * - Visible "Skip" text button bottom-right (Esc & click also skips).
 * - prefers-reduced-motion: skip intro entirely.
 * - Preloaded geometry: zero flicker. Main site layout computed behind overlay.
 * - Responsive: scales V to ~40% of viewport height at 375px mobile and 1920px desktop.
 * - Exposes window.VegaIntro.onComplete(cb).
 * - Zero external CDN dependencies beyond pinned Three.js.
 */

(function () {
  'use strict';

  var SESSION_KEY = 'vega_intro_seen';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasSeenIntro = false;
  try {
    hasSeenIntro = !!sessionStorage.getItem(SESSION_KEY);
  } catch (e) {
    hasSeenIntro = false;
  }

  // Registered completion callbacks
  var completionCallbacks = [];
  var isCompleted = false;

  function runCallbacks() {
    if (isCompleted) return;
    isCompleted = true;
    for (var i = 0; i < completionCallbacks.length; i++) {
      try {
        completionCallbacks[i]();
      } catch (err) {
        console.error('VegaIntro callback error:', err);
      }
    }
    completionCallbacks = [];
  }

  // Public API exposed immediately on window
  window.VegaIntro = {
    onComplete: function (cb) {
      if (typeof cb === 'function') {
        if (isCompleted) {
          cb();
        } else {
          completionCallbacks.push(cb);
        }
      }
    },
    isComplete: function () {
      return isCompleted;
    },
    skip: function () {
      if (window._vegaIntroInstance) {
        window._vegaIntroInstance.skip();
      } else {
        skipImmediately();
      }
    }
  };

  /** Skip immediately if already seen or reduced motion requested */
  function skipImmediately() {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    document.documentElement.classList.remove('intro-pending');
    if (document.body) {
      document.body.classList.remove('intro-locked', 'intro-active');
      document.body.classList.add('site-revealed');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.remove('intro-locked', 'intro-active');
        document.body.classList.add('site-revealed');
      });
    }

    var overlay = document.getElementById('vega-intro-overlay');
    if (overlay) overlay.style.display = 'none';

    runCallbacks();
  }

  if (hasSeenIntro || prefersReducedMotion) {
    skipImmediately();
    return;
  }

  // Lock scroll and mark intro active immediately
  document.documentElement.classList.add('intro-pending');
  function markBodyActive() {
    if (document.body) {
      document.body.classList.add('intro-active', 'intro-locked');
    }
  }
  if (document.body) {
    markBodyActive();
  } else {
    document.addEventListener('DOMContentLoaded', markBodyActive);
  }

  /* --------------------------------------------------------------------------
     Vega Real Logo Mark SVG Paths (Centered at (0, 0))
     Accurately traced from official Vega brand mark:
     Left Wing, Right Wing, Center Winged V Body, Top Crest
     -------------------------------------------------------------------------- */
  var VEGA_V_PATHS = [
    // Left Wing Blade
    'M -155.0 -96.0 L -144.0 -92.0 L -33.0 125.0 L -52.0 141.0 Z',
    // Right Wing Blade
    'M 155.0 -96.0 L 52.0 141.0 L 33.0 125.0 L 144.0 -92.0 Z',
    // Center Winged V Body
    'M -16.0 114.0 L -119.0 -95.0 L -111.0 -95.0 L -105.0 -92.0 L -91.0 -82.0 L -55.0 -45.0 L -20.0 -5.0 L -8.0 5.0 L 0.0 7.0 L 8.0 5.0 L 20.0 -5.0 L 55.0 -45.0 L 91.0 -82.0 L 105.0 -92.0 L 111.0 -95.0 L 119.0 -95.0 L 16.0 114.0 Z',
    // Top Crest / Disc
    'M 0.0 -140.0 L -15.0 -139.0 L -28.0 -133.0 L -40.0 -123.0 L -50.0 -112.0 L -57.0 -98.0 L -59.0 -83.0 L -52.0 -74.0 L -35.0 -64.0 L -18.0 -48.0 L 0.0 -26.0 L 18.0 -48.0 L 35.0 -64.0 L 52.0 -74.0 L 59.0 -83.0 L 57.0 -98.0 L 50.0 -112.0 L 40.0 -123.0 L 28.0 -133.0 L 15.0 -139.0 Z'
  ];

  /* --------------------------------------------------------------------------
     Intro Controller Implementation
     -------------------------------------------------------------------------- */
  function VegaIntroController() {
    this.overlay = document.getElementById('vega-intro-overlay');
    this.canvas = document.getElementById('vega-intro-canvas');
    this.flashEl = document.getElementById('vega-intro-flash');
    this.skipBtn = document.getElementById('vega-intro-skip');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.vGroup = null;
    this.vMesh = null;
    this.shardGroup = null;
    this.shards = [];
    this.shardMaterial = null;

    this.rafId = null;
    this.startTime = null;
    this.exploded = false;
    this.revealedSite = false;
    this.isDisposed = false;
    this.baseDist = 480;

    this.init();
  }

  VegaIntroController.prototype.init = function () {
    if (!this.overlay || !this.canvas) {
      this.ensureElements();
    }

    if (typeof THREE === 'undefined') {
      console.warn('VegaIntro: THREE not found. Skipping intro.');
      this.skip();
      return;
    }

    this.setupThree();
    this.setupListeners();
    this.startAnimation();
  };

  VegaIntroController.prototype.ensureElements = function () {
    if (!this.overlay) {
      var ov = document.createElement('div');
      ov.id = 'vega-intro-overlay';
      ov.className = 'vega-intro-overlay';
      ov.innerHTML =
        '<canvas id="vega-intro-canvas" class="vega-intro-canvas"></canvas>' +
        '<div id="vega-intro-flash" class="vega-intro-flash" aria-hidden="true"></div>' +
        '<button type="button" id="vega-intro-skip" class="vega-intro-skip" aria-label="Skip intro">' +
          '<span>Skip</span> ' +
          '<span class="vega-intro-skip-key">[Esc]</span> ' +
          '<span aria-hidden="true">&rarr;</span>' +
        '</button>';
      document.body.prepend(ov);
      this.overlay = ov;
      this.canvas = document.getElementById('vega-intro-canvas');
      this.flashEl = document.getElementById('vega-intro-flash');
      this.skipBtn = document.getElementById('vega-intro-skip');
    }
  };

  VegaIntroController.prototype.setupThree = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0B0B0C); // --void

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2500);
    this.camera.position.set(0, 0, this.baseDist);

    // Renderer
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(pixelRatio);
    if (THREE.SRGBColorSpace) {
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    // Lighting: Matte graphite with razor-sharp Ignite orange-red (#FE492A) edge lights
    var ambient = new THREE.AmbientLight(0x202228, 1.8);
    this.scene.add(ambient);

    // Front key light for matte graphite face definition
    var keyLight = new THREE.DirectionalLight(0x757c8d, 1.4);
    keyLight.position.set(20, 80, 160);
    this.scene.add(keyLight);

    // Ignite orange-red (#FE492A) edge / rim lights (No glow, no bloom)
    var rimLeft = new THREE.DirectionalLight(0xFE492A, 5.5);
    rimLeft.position.set(-200, 90, -100);
    this.scene.add(rimLeft);

    var rimRight = new THREE.DirectionalLight(0xFE492A, 4.5);
    rimRight.position.set(200, -70, -80);
    this.scene.add(rimRight);

    var rimTop = new THREE.DirectionalLight(0xFE492A, 3.6);
    rimTop.position.set(0, 190, -70);
    this.scene.add(rimTop);

    // Build extruded 3D V geometry
    this.buildGeometry();

    // Scale to ~40% viewport height
    this.updateScale();
  };

  VegaIntroController.prototype.buildGeometry = function () {
    this.vGroup = new THREE.Group();
    this.scene.add(this.vGroup);

    // Parse SVG paths into shapes
    var shapes = [];

    // Use SVGLoader if available, otherwise direct Shape parsing
    if (typeof THREE.SVGLoader !== 'undefined') {
      var svgLoader = new THREE.SVGLoader();
      for (var p = 0; p < VEGA_V_PATHS.length; p++) {
        var svgStr = '<svg xmlns="http://www.w3.org/2000/svg"><path d="' + VEGA_V_PATHS[p] + '" /></svg>';
        var parsed = svgLoader.parse(svgStr);
        if (parsed.paths && parsed.paths.length > 0) {
          var pShapes = THREE.SVGLoader.createShapes(parsed.paths[0]);
          for (var s = 0; s < pShapes.length; s++) {
            shapes.push(pShapes[s]);
          }
        }
      }
    }

    // Direct fallback parser if SVGLoader was absent or returned empty
    if (shapes.length === 0) {
      for (var k = 0; k < VEGA_V_PATHS.length; k++) {
        var shape = this.parseSvgPathToShape(VEGA_V_PATHS[k]);
        if (shape) shapes.push(shape);
      }
    }

    var extrudeSettings = {
      depth: 18,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 1.5,
      bevelThickness: 1.5
    };

    var geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
    geometry.center();

    // Invert Y axis so upright in Three.js (SVG Y is downward)
    geometry.scale(1, -1, 1);
    geometry.computeVertexNormals();

    // Flat matte graphite material
    var vMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2d34, // Matte graphite
      roughness: 0.82,
      metalness: 0.12,
      flatShading: false
    });

    this.vMesh = new THREE.Mesh(geometry, vMaterial);
    this.vGroup.add(this.vMesh);

    // Pre-calculate non-indexed shard pieces for instant explosion at 2.0s
    this.buildShards(geometry);
  };

  /** Direct robust SVG M/L/Z parser to THREE.Shape fallback */
  VegaIntroController.prototype.parseSvgPathToShape = function (d) {
    var tokens = d.trim().split(/\s+/);
    var shape = new THREE.Shape();
    var i = 0;
    var moved = false;
    while (i < tokens.length) {
      var cmd = tokens[i];
      if (cmd === 'M') {
        var mx = parseFloat(tokens[i + 1]);
        var my = parseFloat(tokens[i + 2]);
        shape.moveTo(mx, my);
        moved = true;
        i += 3;
      } else if (cmd === 'L') {
        var lx = parseFloat(tokens[i + 1]);
        var ly = parseFloat(tokens[i + 2]);
        if (!moved) {
          shape.moveTo(lx, ly);
          moved = true;
        } else {
          shape.lineTo(lx, ly);
        }
        i += 3;
      } else if (cmd === 'Z') {
        shape.closePath();
        i += 1;
      } else {
        i += 1;
      }
    }
    return shape;
  };

  /** Precompute non-indexed triangle shards */
  VegaIntroController.prototype.buildShards = function (indexedGeo) {
    var nonIndexed = indexedGeo.getIndex() ? indexedGeo.toNonIndexed() : indexedGeo;
    var posAttr = nonIndexed.attributes.position;
    var normAttr = nonIndexed.attributes.normal;
    var count = posAttr.count / 3;

    this.shardGroup = new THREE.Group();
    this.shardGroup.visible = false;
    this.scene.add(this.shardGroup); // Direct child of scene for clean world-space explosion

    this.shardMaterial = new THREE.MeshStandardMaterial({
      color: 0x363942, // Matte graphite shards
      roughness: 0.78,
      metalness: 0.18,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide
    });

    this.shards = [];
    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();
    var centroid = new THREE.Vector3();

    for (var i = 0; i < count; i++) {
      var idx = i * 9;
      pA.set(posAttr.array[idx], posAttr.array[idx + 1], posAttr.array[idx + 2]);
      pB.set(posAttr.array[idx + 3], posAttr.array[idx + 4], posAttr.array[idx + 5]);
      pC.set(posAttr.array[idx + 6], posAttr.array[idx + 7], posAttr.array[idx + 8]);

      centroid.copy(pA).add(pB).add(pC).multiplyScalar(1 / 3);

      var triGeo = new THREE.BufferGeometry();
      var triPos = new Float32Array([
        pA.x - centroid.x, pA.y - centroid.y, pA.z - centroid.z,
        pB.x - centroid.x, pB.y - centroid.y, pB.z - centroid.z,
        pC.x - centroid.x, pC.y - centroid.y, pC.z - centroid.z
      ]);
      triGeo.setAttribute('position', new THREE.BufferAttribute(triPos, 3));

      if (normAttr) {
        var triNorm = new Float32Array([
          normAttr.array[idx], normAttr.array[idx + 1], normAttr.array[idx + 2],
          normAttr.array[idx + 3], normAttr.array[idx + 4], normAttr.array[idx + 5],
          normAttr.array[idx + 6], normAttr.array[idx + 7], normAttr.array[idx + 8]
        ]);
        triGeo.setAttribute('normal', new THREE.BufferAttribute(triNorm, 3));
      } else {
        triGeo.computeVertexNormals();
      }

      var shardMesh = new THREE.Mesh(triGeo, this.shardMaterial);
      this.shardGroup.add(shardMesh);

      // Random rotation axis and angular velocity
      var rotAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      var rotSpeed = (Math.random() * 8 + 5) * (Math.random() < 0.5 ? 1 : -1);

      this.shards.push({
        mesh: shardMesh,
        localCentroid: centroid.clone(),
        velocity: new THREE.Vector3(),
        axis: rotAxis,
        rotSpeed: rotSpeed
      });
    }
  };

  /** Responsive scaling: scale V to ~40% viewport height */
  VegaIntroController.prototype.updateScale = function () {
    if (!this.camera || !this.vGroup) return;

    var width = window.innerWidth;
    var height = window.innerHeight;
    var aspect = width / height;

    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    // Visible height of camera frustum at z = 0
    var fovRad = (this.camera.fov * Math.PI) / 180;
    var visibleHeight = 2 * Math.tan(fovRad / 2) * this.baseDist;
    var visibleWidth = visibleHeight * aspect;

    // Vega V bounding box is ~280 units high, 310 units wide
    var logoHeight = 280;
    var logoWidth = 310;

    var targetHeight = 0.40 * visibleHeight;
    var maxAllowedWidth = 0.76 * visibleWidth; // Prevent clipping on narrow 375px screens

    var s = Math.min(targetHeight / logoHeight, maxAllowedWidth / logoWidth);
    this.vGroup.scale.set(s, s, s);
    this.currentScale = s;
  };

  VegaIntroController.prototype.setupListeners = function () {
    var self = this;

    this.onResize = function () {
      self.updateScale();
    };
    window.addEventListener('resize', this.onResize);

    // Skip on button click
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.skip();
      });
    }

    // Skip on click anywhere on overlay
    this.overlay.addEventListener('click', function () {
      self.skip();
    });

    // Skip on Esc key
    this.onKeyDown = function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        self.skip();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  };

  VegaIntroController.prototype.startAnimation = function () {
    var self = this;
    var lastTime = performance.now();
    this.startTime = performance.now();

    function tick(now) {
      if (self.isDisposed) return;

      var dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      var elapsed = (now - self.startTime) / 1000;

      self.updateFrame(elapsed, dt);

      self.renderer.render(self.scene, self.camera);

      if (elapsed < 3.6) {
        self.rafId = requestAnimationFrame(tick);
      } else {
        self.finish();
      }
    }

    this.rafId = requestAnimationFrame(tick);
  };

  VegaIntroController.prototype.updateFrame = function (elapsed, dt) {
    var SPIN_DURATION = 2.0;

    // 1. PHASE 1: 0–2.0s: V spins on Y axis, easing slow-to-fast (ease-in), camera push-in
    if (elapsed < SPIN_DURATION) {
      var p = Math.max(0, Math.min(1, elapsed / SPIN_DURATION));
      // Cubic ease-in for spin acceleration
      var ease = Math.pow(p, 2.5);

      // Rotate Y axis (2.25 full revolutions easing into a blur)
      this.vMesh.rotation.y = ease * Math.PI * 4.5;

      // Camera push-in: distance smoothly decreases by 18%
      var camZ = this.baseDist * (1.12 - 0.18 * ease);
      this.camera.position.set(0, 0, camZ);
    }
    // 2. PHASE 2: 2.0s EXPLODE
    else {
      if (!this.exploded) {
        this.triggerExplosion();
      }

      var expElapsed = elapsed - SPIN_DURATION;

      // Update shard physics: outward velocity + rotation + gravity
      var gravity = 320; // Downward gravity
      for (var i = 0; i < this.shards.length; i++) {
        var s = this.shards[i];
        s.mesh.position.addScaledVector(s.velocity, dt);
        s.velocity.y -= gravity * dt;
        s.mesh.rotateOnAxis(s.axis, s.rotSpeed * dt);

        // Individual shard scale shrink over time
        var fadeProgress = Math.min(1, Math.max(0, expElapsed / 1.0));
        var shardScale = Math.max(0.01, (1.0 - fadeProgress * 0.7) * (this.currentScale || 1));
        s.mesh.scale.set(shardScale, shardScale, shardScale);
      }

      // Shards fade out over ~1.0s (2.0s to 3.0s)
      var fadeProgressTotal = Math.min(1, Math.max(0, expElapsed / 1.0));
      if (this.shardMaterial) {
        this.shardMaterial.opacity = Math.max(0, 1.0 - fadeProgressTotal);
      }

      // Camera shake: ~220ms decaying shake
      if (expElapsed < 0.22) {
        var shakeDecay = 1.0 - expElapsed / 0.22;
        var shakeX = (Math.random() - 0.5) * 22 * shakeDecay;
        var shakeY = (Math.random() - 0.5) * 18 * shakeDecay;
        this.camera.position.set(shakeX, shakeY, this.baseDist * 0.94);
      } else {
        this.camera.position.set(0, 0, this.baseDist * 0.94);
      }

      // 3. PHASE 3: 2.4s peak explosion: Reveal site!
      if (elapsed >= 2.4 && !this.revealedSite) {
        this.revealSite();
      }
    }
  };

  /** Trigger explosion at 2.0s */
  VegaIntroController.prototype.triggerExplosion = function () {
    this.exploded = true;

    var scale = this.currentScale || 1;
    var currentRotY = this.vMesh ? this.vMesh.rotation.y : 0;

    // Hide solid V mesh and activate exploding shard group
    if (this.vMesh) this.vMesh.visible = false;
    if (this.shardGroup) this.shardGroup.visible = true;

    // Position each shard in world space based on current V rotation and scale
    for (var i = 0; i < this.shards.length; i++) {
      var s = this.shards[i];

      // Calculate world centroid
      var worldPos = s.localCentroid.clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotY)
        .multiplyScalar(scale);

      s.mesh.position.copy(worldPos);
      s.mesh.rotation.set(0, currentRotY, 0);
      s.mesh.scale.set(scale, scale, scale);

      // Outward 3D velocity
      var radial = worldPos.clone().normalize();
      var randomDir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      var dir = radial.multiplyScalar(0.7).add(randomDir.multiplyScalar(0.6)).normalize();
      var speed = 300 + Math.random() * 450;
      s.velocity = dir.multiplyScalar(speed);
    }

    // 80ms white flash frame
    if (this.flashEl) {
      this.flashEl.classList.add('flash-active');
      var self = this;
      setTimeout(function () {
        if (self.flashEl) self.flashEl.classList.remove('flash-active');
      }, 80);
    }
  };

  /** Reveal site at 2.4s peak of explosion */
  VegaIntroController.prototype.revealSite = function () {
    this.revealedSite = true;

    // Fade out overlay smoothly
    if (this.overlay) {
      this.overlay.classList.add('fade-out');
    }

    // Unlock page scroll & trigger reveal classes
    if (document.body) {
      document.body.classList.remove('intro-locked');
      document.body.classList.add('site-revealed');
    }

    // Mark session as visited
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    // Dispatch completion callbacks
    runCallbacks();
  };

  /** Skip handler (button, Esc, or click) */
  VegaIntroController.prototype.skip = function () {
    if (this.revealedSite && this.isDisposed) return;

    this.revealedSite = true;
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }

    if (document.body) {
      document.body.classList.remove('intro-locked', 'intro-active');
      document.body.classList.add('site-revealed');
    }

    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    runCallbacks();
    this.dispose();
  };

  /** Clean up and complete at ~3.5s */
  VegaIntroController.prototype.finish = function () {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
    if (document.body) {
      document.body.classList.remove('intro-active');
    }
    this.dispose();
  };

  /** Dispose Three.js objects & event listeners */
  VegaIntroController.prototype.dispose = function () {
    if (this.isDisposed) return;
    this.isDisposed = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);

    if (this.renderer) {
      if (typeof this.renderer.forceContextLoss === 'function') {
        this.renderer.forceContextLoss();
      }
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.canvas && this.canvas.parentElement) {
      this.canvas.remove();
      this.canvas = null;
    }

    if (this.scene) {
      this.scene.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(function (m) { m.dispose(); });
          } else {
            obj.material.dispose();
          }
        }
      });
    }

    window._vegaIntroInstance = null;
  };

  // Bootstrap when DOM is ready
  function startIntro() {
    if (window._vegaIntroInstance || hasSeenIntro || prefersReducedMotion) return;
    window._vegaIntroInstance = new VegaIntroController();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIntro);
  } else {
    startIntro();
  }

})();
