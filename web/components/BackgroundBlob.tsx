"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Sophisticated Corporate Lighting (Emerald & Slate)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x059669, 2.2); // Corporate Emerald Rim Light
    dirLight2.position.set(-4, -2, 3);
    scene.add(dirLight2);

    const pointLight1 = new THREE.PointLight(0x10b981, 2.8, 15); // Mint Emerald Light
    pointLight1.position.set(0, 1.8, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x334155, 2.0, 15); // Slate Light
    pointLight2.position.set(3, -2, 2);
    scene.add(pointLight2);

    // 3. 3D Objects Setup
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Sphere (Corporate Elegant Deep Emerald)
    const mainGeo = new THREE.IcosahedronGeometry(0.78, 12);
    const mainMat = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      emissive: 0x064e3b,
      emissiveIntensity: 0.35,
      roughness: 0.22,
      metalness: 0.12,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    });
    const mainSphere = new THREE.Mesh(mainGeo, mainMat);
    mainGroup.add(mainSphere);

    // Satellite Spheres (Alternating Emerald & Slate)
    const basePositions = [
      { x: 0.85, y: 0.22, z: -0.15, size: 0.36 },
      { x: -0.72, y: -0.35, z: 0.18, size: 0.48 },
      { x: 0.25, y: 0.72, z: -0.35, size: 0.36 },
      { x: -0.25, y: 0.15, z: -0.65, size: 0.36 },
      { x: 0.58, y: -0.62, z: 0.12, size: 0.28 },
    ];

    const satMeshes: THREE.Mesh[] = [];

    basePositions.forEach((pos, idx) => {
      const geo = new THREE.IcosahedronGeometry(pos.size, 8);
      const isEmerald = idx % 2 === 0;
      const mat = new THREE.MeshPhysicalMaterial({
        color: isEmerald ? 0x10b981 : 0x334155,
        emissive: isEmerald ? 0x064e3b : 0x0f172a,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.12,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mainGroup.add(mesh);
      satMeshes.push(mesh);
    });

    // Save initial vertex positions for CPU wave deformation
    const mainPosAttr = mainGeo.attributes.position;
    const initialMainPositions = mainPosAttr.array.slice();

    // 4. Smooth Lerp State
    let currentX = 1.15;
    let currentY = -0.05;
    let currentScale = 1.05;
    let currentSpread = 0.95;

    // 5. Native Render Loop (60 FPS Guaranteed)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // CPU Wave Deformation for Organic Blob Distortion
      const posArray = mainPosAttr.array as Float32Array;
      for (let i = 0; i < posArray.length; i += 3) {
        const vx = initialMainPositions[i];
        const vy = initialMainPositions[i + 1];
        const vz = initialMainPositions[i + 2];
        const wave = Math.sin(vx * 2.5 + elapsedTime * 2.0) * Math.cos(vy * 2.5 + elapsedTime * 1.8) * 0.08;
        posArray[i] = vx + vx * wave;
        posArray[i + 1] = vy + vy * wave;
        posArray[i + 2] = vz + vz * wave;
      }
      mainPosAttr.needsUpdate = true;
      mainGeo.computeVertexNormals();

      // Scroll Position Tracking
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      // Calculate Target Position safely within bounds
      let targetX = 1.15;
      let targetY = -0.05;
      let targetScale = 1.05;
      let targetSpread = 0.95;

      if (scrollProgress < 0.30) {
        const p = scrollProgress / 0.30;
        const easeP = 0.5 - Math.cos(p * Math.PI) / 2;
        targetX = 1.15 + (-0.50 - 1.15) * easeP;
        targetY = -0.05 + (-0.08 - (-0.05)) * easeP;
        targetScale = 1.05 + (1.15 - 1.05) * easeP;
        targetSpread = 0.95 + (1.10 - 0.95) * easeP;
      } else if (scrollProgress < 0.70) {
        const p = (scrollProgress - 0.30) / 0.40;
        const easeP = 0.5 - Math.cos(p * Math.PI) / 2;
        targetX = -0.50 + (0.55 - (-0.50)) * easeP;
        targetY = -0.08 + (0.05 - (-0.08)) * easeP;
        targetScale = 1.15 + (1.08 - 1.15) * easeP;
        targetSpread = 1.10 + (0.95 - 1.10) * easeP;
      } else {
        const p = (scrollProgress - 0.70) / 0.30;
        const easeP = 0.5 - Math.cos(p * Math.PI) / 2;
        targetX = 0.55 + (0.00 - 0.55) * easeP;
        targetY = 0.05 + (-0.20 - 0.05) * easeP;
        targetScale = 1.08 + (1.35 - 1.08) * easeP;
        targetSpread = 0.95 + (1.15 - 0.95) * easeP;
      }

      // Smooth Lerp Group Position & Scale
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentScale += (targetScale - currentScale) * 0.08;
      currentSpread += (targetSpread - currentSpread) * 0.08;

      mainGroup.position.set(currentX, currentY, 0);
      mainGroup.scale.set(currentScale, currentScale, currentScale);

      // Continuous 3D Ambient Float & Rotation
      mainGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.35 + elapsedTime * 0.15 + scrollProgress * Math.PI * 1.5;
      mainGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.2 + Math.sin(scrollProgress * Math.PI) * 0.25;
      mainGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.15;

      // Active 3D Orbital Revolution of Satellite Spheres
      satMeshes.forEach((mesh, idx) => {
        const base = basePositions[idx];
        const orbitAngle = elapsedTime * (0.55 + (idx % 3) * 0.2) + (idx * Math.PI * 2) / 5 + scrollProgress * Math.PI;
        const radius = Math.sqrt(base.x * base.x + base.z * base.z) * currentSpread * 1.2;

        mesh.position.x = Math.cos(orbitAngle) * radius;
        mesh.position.z = Math.sin(orbitAngle) * radius;
        mesh.position.y = base.y * currentSpread + Math.sin(elapsedTime * 1.4 + idx * 1.5) * 0.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      mainGeo.dispose();
      mainMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="background-canvas-container">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
