/**
 * VEGA REDESIGN - THREE.JS 3D HERO CANVAS
 * Renders an aerodynamic aerodynamic helmet / shield with wind-tunnel particle stream
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
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups
    const helmetGroup = new THREE.Group();
    scene.add(helmetGroup);

    // 1. Aerodynamic Outer Shell (Stylized Icosahedron / Geodesic Helm)
    const shellGeometry = new THREE.IcosahedronGeometry(2.2, 3);
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x1E1D1F,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    helmetGroup.add(shellMesh);

    // 2. Shell Wireframe Overlay for Cyber/Aero Look
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xFE492A,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const wireframeMesh = new THREE.Mesh(shellGeometry, wireframeMaterial);
    wireframeMesh.scale.set(1.002, 1.002, 1.002);
    helmetGroup.add(wireframeMesh);

    // 3. Curved Ignite Visor Arc
    const visorGeometry = new THREE.TorusGeometry(2.25, 0.28, 16, 64, Math.PI * 0.85);
    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFE492A,
      emissive: 0xFE492A,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85
    });
    const visorMesh = new THREE.Mesh(visorGeometry, visorMaterial);
    visorMesh.rotation.x = Math.PI / 2.2;
    visorMesh.rotation.z = -Math.PI * 0.42;
    visorMesh.position.set(0, 0.3, 0.2);
    helmetGroup.add(visorMesh);

    // 4. Wind Tunnel Aerodynamic Stream Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities.push({
        x: -0.04 - Math.random() * 0.05,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFE492A,
      size: 0.05,
      transparent: true,
      opacity: 0.65
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0E0D0E, 2.5);
    scene.add(ambientLight);

    const igniteLight = new THREE.PointLight(0xFE492A, 4.5, 20);
    igniteLight.position.set(4, 3, 5);
    scene.add(igniteLight);

    const amaranteLight = new THREE.PointLight(0x2C0C14, 6.0, 20);
    amaranteLight.position.set(-5, -3, 2);
    scene.add(amaranteLight);

    const frostRimLight = new THREE.DirectionalLight(0xAEB8CF, 1.2);
    frostRimLight.position.set(0, 5, -5);
    scene.add(frostRimLight);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0006;
      mouseY = (e.clientY - windowHalfY) * 0.0006;
    });

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

      // Smooth damped rotation to mouse
      targetRotationY = mouseX * 1.5;
      targetRotationX = mouseY * 1.2;

      helmetGroup.rotation.y += (targetRotationY - helmetGroup.rotation.y) * 0.05;
      helmetGroup.rotation.x += (targetRotationX - helmetGroup.rotation.x) * 0.05;

      // Subtle breathing floating motion
      helmetGroup.position.y = Math.sin(time * 1.2) * 0.12;

      // Pulse ignite light intensity
      igniteLight.intensity = 4.2 + Math.sin(time * 2.5) * 0.8;

      // Update Wind Stream Particles
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Reset if particle flew past left side
        if (pos[i * 3] < -7) {
          pos[i * 3] = 7;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Export and auto-mount
  window.initHero3D = initHero3D;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }
})();
