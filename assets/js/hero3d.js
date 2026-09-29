/**
 * VEGA SPORTWEAR - THREE.JS 3D HERO CANVAS
 * High-performance kinetic athletic monolith with reactive lighting & particle velocity stream
 * Embodying dark, aggressive athlete energy blended with clean minimal luxury sportswear
 */

(function () {
  function initHero3D() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || window.innerWidth * 0.6;
    let height = container.clientHeight || window.innerHeight * 0.9;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Kinetic Athletic Monolith (Faceted Torus Knot + Dual Icosahedron Core)
    // Inner Solid Carbon Monolith
    const coreGeometry = new THREE.IcosahedronGeometry(2.1, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.18,
      metalness: 0.92,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // 2. High-Tech Performance Mesh Lattice (Aeroknit Micro-Wireframe)
    const latticeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFE492A,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const latticeMesh = new THREE.Mesh(coreGeometry, latticeMaterial);
    latticeMesh.scale.set(1.02, 1.02, 1.02);
    coreGroup.add(latticeMesh);

    // 3. Orbital Kinetic Aero Rings (Representing high velocity athletic performance)
    const ringGeo1 = new THREE.TorusGeometry(3.1, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xFE492A,
      emissive: 0xFE492A,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.35, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x2C0C14,
      emissive: 0xFE492A,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.9
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 4. Kinetic Embers & Velocity Stream Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.push({
        x: -0.035 - Math.random() * 0.04,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFE492A,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Lighting: Dramatic Dark Aggressive Athlete Glow
    const ambientLight = new THREE.AmbientLight(0x0E0D0E, 2.8);
    scene.add(ambientLight);

    // Primary Interactive Ignite Red Spotlight
    const igniteLight = new THREE.PointLight(0xFE492A, 5.0, 22);
    igniteLight.position.set(4, 3, 5);
    scene.add(igniteLight);

    // Deep Amarante Crimson Underglow
    const amaranteLight = new THREE.PointLight(0x2C0C14, 8.0, 25);
    amaranteLight.position.set(-5, -4, 3);
    scene.add(amaranteLight);

    // Frost Specular Rim Light
    const frostRimLight = new THREE.DirectionalLight(0xAEB8CF, 1.8);
    frostRimLight.position.set(2, 6, -6);
    scene.add(frostRimLight);

    // Mouse Interaction Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.00065;
      mouseY = (e.clientY - windowHalfY) * 0.00065;

      // Dynamic light tracking
      igniteLight.position.x = 4 + mouseX * 8;
      igniteLight.position.y = 3 - mouseY * 8;
    });

    // Scroll Reactive Speed Modifier
    let scrollSpeedMod = 1;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      scrollSpeedMod = 1 + Math.min(deltaY * 0.05, 4);
      lastScrollY = window.scrollY;
    }, { passive: true });

    // Resize Handler
    function onResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damped smooth mouse tracking
      targetRotationY = mouseX * 1.8;
      targetRotationX = mouseY * 1.4;

      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.06;

      // Autonomous continuous kinetic spin
      coreMesh.rotation.y += 0.004 * scrollSpeedMod;
      coreMesh.rotation.x += 0.002 * scrollSpeedMod;
      latticeMesh.rotation.y += 0.004 * scrollSpeedMod;
      latticeMesh.rotation.x += 0.002 * scrollSpeedMod;

      // Orbit kinetic rings in counter directions
      ring1.rotation.z += 0.008 * scrollSpeedMod;
      ring2.rotation.z -= 0.006 * scrollSpeedMod;

      // Smooth decay of scroll speed mod back to 1
      scrollSpeedMod += (1 - scrollSpeedMod) * 0.05;

      // Athletic breathing floating motion
      coreGroup.position.y = Math.sin(time * 1.4) * 0.16;

      // Pulsing Ignite light intensity
      igniteLight.intensity = 4.8 + Math.sin(time * 2.8) * 0.9;

      // Velocity Embers Streaming
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x * scrollSpeedMod;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Reset particle loop
        if (pos[i * 3] < -8) {
          pos[i * 3] = 8;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Export and initialize
  window.initHero3D = initHero3D;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }
})();
