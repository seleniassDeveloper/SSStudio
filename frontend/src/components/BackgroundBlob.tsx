import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!groupRef.current) return;

      const proxy = {
        distort: 0.28,
        speed: 1.1,
        spread: 0.95,
        envIntensity: 1.6,
      };

      const updateMaterial = () => {
        if (!materialRef.current) return;
        materialRef.current.distort = proxy.distort;
        materialRef.current.speed = proxy.speed;
        materialRef.current.envMapIntensity = proxy.envIntensity;
      };

      gsap.set(groupRef.current.position, {
        x: 1.5,
        y: -0.05,
        z: 0,
      });

      gsap.set(groupRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
      });

      gsap.fromTo(
        groupRef.current.position,
        { x: 2.5, y: 0.25 },
        {
          x: 1.5,
          y: -0.05,
          duration: 1.8,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.4, y: 0.4, z: 0.4 },
        {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      groupRef.current.userData.proxy = proxy;

      const sections = [
        {
          trigger: "#productos",
          bg: "#0d0912", // deep purple
          x: 0.8,
          y: -0.1,
          scale: 1.45,
          distort: 0.4,
          spread: 1.1,
        },
        {
          trigger: "#como-colaboramos",
          bg: "#0a0a14", // dark navy
          x: -1.35,
          y: -0.05,
          scale: 1.25,
          distort: 0.3,
          spread: 1.35,
        },
        {
          trigger: "#filosofia",
          bg: "#08070b", // black-purple
          x: 1.3,
          y: -0.2,
          scale: 1.1,
          distort: 0.35,
          spread: 0.9,
        },
        {
          trigger: "#contacto",
          bg: "#100918", // premium warm violet
          x: 0.15,
          y: -0.35,
          scale: 1.6,
          distort: 0.45,
          spread: 1.2,
        },
      ];

      sections.forEach((section) => {
        if (!document.querySelector(section.trigger)) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.trigger,
              start: "top 90%",
              end: "top 20%",
              scrub: 1,
            },
          })
          .to(document.body, { backgroundColor: section.bg }, 0)
          .to(
            groupRef.current.position,
            {
              x: section.x,
              y: section.y,
              duration: 1,
              ease: "sine.inOut",
            },
            0
          )
          .to(
            groupRef.current.scale,
            {
              x: section.scale,
              y: section.scale,
              z: section.scale,
              duration: 1,
              ease: "sine.inOut",
            },
            0
          )
          .to(
            proxy,
            {
              distort: section.distort,
              spread: section.spread,
              speed: 1.6,
              envIntensity: 1.8,
              duration: 1,
              ease: "sine.inOut",
              onUpdate: updateMaterial,
            },
            0
          );
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.35 + t * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.18;
    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.15;

    const proxy = groupRef.current.userData.proxy;

    if (proxy) {
      nodesRef.current.forEach((node, i) => {
        if (!node) return;

        node.position.set(
          basePositions[i][0] * proxy.spread,
          basePositions[i][1] * proxy.spread,
          basePositions[i][2] * proxy.spread
        );
      });
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.45}>
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

        {basePositions.map((position: any, index) => (
          <Sphere
            key={index}
            ref={(el) => (nodesRef.current[index] = el)}
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

export default function BackgroundBlob({ hide }: { hide: boolean }) {
  if (hide) return null;

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
