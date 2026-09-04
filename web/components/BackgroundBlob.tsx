"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

  const basePositions = useMemo(
    () => [
      [0.85, 0.22, -0.15],
      [-0.72, -0.35, 0.18],
      [0.25, 0.72, -0.35],
      [-0.25, 0.15, -0.65],
      [0.58, -0.62, 0.12],
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Continuous 3D rotation & ambient floating
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.35 + t * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.18;
    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.15;

    // Real-time viewport rect position calculation for exact section transitions:
    // Hero: x = 1.5, y = -0.05, scale = 1.2
    // Servicios: x = -1.35, y = -0.05, scale = 1.25
    // Vision: x = 0.4, y = 0.05, scale = 1.2
    // Contacto: x = 0.15, y = -0.35, scale = 1.6
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const vh = window.innerHeight;
      const serviciosEl = document.querySelector("#servicios");
      const visionEl = document.querySelector("#vision");
      const contactoEl = document.querySelector("#contacto");

      const sRect = serviciosEl?.getBoundingClientRect();
      const vRect = visionEl?.getBoundingClientRect();
      const cRect = contactoEl?.getBoundingClientRect();

      let targetX = 1.5;
      let targetY = -0.05;
      let targetScale = 1.2;
      let targetDistort = 0.28;
      let targetSpread = 0.95;

      if (cRect && cRect.top < vh) {
        const progress = Math.min(1, Math.max(0, (vh - cRect.top) / (vh * 0.7)));
        targetX = 0.4 + (0.15 - 0.4) * progress;
        targetY = 0.05 + (-0.35 - 0.05) * progress;
        targetScale = 1.2 + (1.6 - 1.2) * progress;
        targetDistort = 0.32 + (0.45 - 0.32) * progress;
        targetSpread = 1.05 + (1.2 - 1.05) * progress;
      } else if (vRect && vRect.top < vh) {
        const progress = Math.min(1, Math.max(0, (vh - vRect.top) / (vh * 0.7)));
        targetX = -1.35 + (0.4 - (-1.35)) * progress;
        targetY = -0.05 + (0.05 - (-0.05)) * progress;
        targetScale = 1.25 + (1.2 - 1.25) * progress;
        targetDistort = 0.3 + (0.32 - 0.3) * progress;
        targetSpread = 1.35 + (1.05 - 1.35) * progress;
      } else if (sRect && sRect.top < vh) {
        const progress = Math.min(1, Math.max(0, (vh - sRect.top) / (vh * 0.7)));
        targetX = 1.5 + (-1.35 - 1.5) * progress;
        targetY = -0.05;
        targetScale = 1.2 + (1.25 - 1.2) * progress;
        targetDistort = 0.28 + (0.3 - 0.28) * progress;
        targetSpread = 0.95 + (1.35 - 0.95) * progress;
      }

      // Calculate scroll Y progress for continuous rotation
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      // Lerp group position and scale smoothly at 60fps
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.12;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.12;

      const currentScale = groupRef.current.scale.x;
      const lerpedScale = currentScale + (targetScale - currentScale) * 0.12;
      groupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

      if (materialRef.current) {
        materialRef.current.distort += (targetDistort - materialRef.current.distort) * 0.12;
      }

      // Continuous 3D rotation & ambient floating + scroll tilt
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.35 + t * 0.12 + scrollProgress * Math.PI * 1.5;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.18 + Math.sin(scrollProgress * Math.PI) * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.15;

      // Active 3D orbital revolution of satellite spheres around central blob
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const orbitAngle = t * (0.45 + (i % 3) * 0.18) + (i * Math.PI * 2) / 5 + scrollProgress * Math.PI;
        const radius = targetSpread;

        node.position.set(
          Math.cos(orbitAngle) * (0.85 + (i % 2) * 0.25) * radius,
          Math.sin(t * 1.2 + i * 1.5) * 0.25 * radius,
          Math.sin(orbitAngle) * (0.85 + (i % 2) * 0.25) * radius
        );
      });
    }
  });

  return (
    <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef}>
        <Sphere args={[0.78, 96, 96]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#3b0b82"
            distort={0.28}
            speed={1.1}
            roughness={0.08}
            metalness={0.75}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.6}
          />
        </Sphere>

        {basePositions.map((position, index) => (
          <Sphere
            key={index}
            ref={(el) => {
              nodesRef.current[index] = el;
            }}
            args={[
              index === 1 ? 0.48 : index === 4 ? 0.28 : 0.36,
              64,
              64,
            ]}
            position={position as [number, number, number]}
          >
            <MeshDistortMaterial
              color="#2a0066"
              distort={0.35}
              speed={1.4}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
              clearcoatRoughness={0.08}
              envMapIntensity={1.5}
            />
          </Sphere>
        ))}
      </group>
    </Float>
  );
}

export default function BackgroundBlob() {
  return (
    <div className="background-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 4.7], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 5]} intensity={1.4} />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={0.45}
          color="#8b5cf6"
        />
        <pointLight position={[0, 1.8, 2]} intensity={1.2} color="#a855f7" />

        <Environment preset="city" />
        <Blob />
      </Canvas>
    </div>
  );
}
