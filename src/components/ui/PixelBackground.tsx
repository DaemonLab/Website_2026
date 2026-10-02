"use client";

import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./PixelBackground.css";

export interface PixelBackgroundProps {
  color?: string;
  flakeSize?: number;
  minFlakeSize?: number;
  pixelResolution?: number;
  speed?: number;
  density?: number;
  direction?: number; // degrees, default 135
  brightness?: number;
  depthFade?: number;
  farPlane?: number;
  variant?: "square" | "circle";
  className?: string;
}

export function PixelBackground({
  color = "#3B82F6",
  flakeSize = 0.006,
  minFlakeSize = 1,
  pixelResolution = 180,
  speed = 0.3,
  density = 0.06,
  direction = 135,
  brightness = 0.4,
  depthFade = 10,
  farPlane = 18,
  variant = "square",
  className = "",
}: PixelBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect mobile viewport
    const isMobile = window.innerWidth < 768;
    const effectiveDensity = isMobile ? Math.min(density * 0.5, 0.035) : density;
    const effectiveSpeed = reduceMotion ? 0.03 : isMobile ? speed * 0.75 : speed;
    const effectiveBrightness = isMobile ? brightness * 0.75 : brightness;

    // Set up Three.js Scene, Camera, Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, farPlane + 10);
    camera.position.z = 12;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);

    // Calculate total particle count based on screen area & density
    const particleCount = Math.floor((width * height * effectiveDensity) / 1200);

    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // PClub Royal Blue Palette
    const baseColor = new THREE.Color(color);
    const royalDark = new THREE.Color("#2563EB");
    const royalLight = new THREE.Color("#60A5FA");
    const whiteAccent = new THREE.Color("#FFFFFF");

    const boundsX = 18;
    const boundsY = 14;
    const boundsZ = farPlane;

    for (let i = 0; i < particleCount; i++) {
      // Random 3D space distribution
      positions[i * 3] = (Math.random() - 0.5) * boundsX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * boundsY;
      positions[i * 3 + 2] = -Math.random() * boundsZ;

      sizes[i] = 0.5 + Math.random() * 1.5;
      speeds[i] = 0.6 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;

      // Color variation: 75% Primary Royal Blue, 15% Royal Light, 5% Royal Dark, 5% White Dust
      const rand = Math.random();
      let pColor = baseColor;
      if (rand > 0.95) pColor = whiteAccent;
      else if (rand > 0.90) pColor = royalLight;
      else if (rand > 0.80) pColor = royalDark;

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const dirRad = (direction * Math.PI) / 180;

    // Custom Shader Material for Square Data Packets / Digital Pixel Particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: effectiveSpeed },
        uFlakeSize: { value: flakeSize },
        uMinFlakeSize: { value: minFlakeSize },
        uPixelResolution: { value: pixelResolution },
        uBrightness: { value: effectiveBrightness },
        uDepthFade: { value: depthFade },
        uFarPlane: { value: farPlane },
        uDir: { value: new THREE.Vector2(Math.cos(dirRad), Math.sin(dirRad)) },
        uVariant: { value: variant === "square" ? 1.0 : 0.0 },
        uPixelRatio: { value: dpr },
        uBounds: { value: new THREE.Vector3(boundsX, boundsY, boundsZ) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uFlakeSize;
        uniform float uMinFlakeSize;
        uniform float uPixelResolution;
        uniform float uPixelRatio;
        uniform vec2 uDir;
        uniform vec3 uBounds;

        attribute float aSize;
        attribute float aSpeed;
        attribute float aPhase;
        attribute vec3 aColor;

        varying vec3 vColor;
        varying float vDepth;

        void main() {
          vColor = aColor;

          vec3 pos = position;

          // Continuous drifting movement along direction vector
          vec2 offset = uDir * (uTime * uSpeed * aSpeed * 0.4);
          pos.x += offset.x;
          pos.y += offset.y;

          // Gentle z-wave float
          pos.z += sin(uTime * 0.4 + aPhase) * 0.15;

          // Wrap around bounding box boundaries seamlessly
          float halfX = uBounds.x * 0.5;
          float halfY = uBounds.y * 0.5;

          pos.x = mod(pos.x + halfX, uBounds.x) - halfX;
          pos.y = mod(pos.y + halfY, uBounds.y) - halfY;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vDepth = -mvPosition.z;

          // Compute square point size with pixel resolution scaling
          float pSize = max(uMinFlakeSize, aSize * uFlakeSize * (uPixelResolution / -mvPosition.z) * uPixelRatio * 30.0);
          gl_PointSize = pSize;
        }
      `,
      fragmentShader: `
        uniform float uBrightness;
        uniform float uDepthFade;
        uniform float uFarPlane;
        uniform float uVariant;

        varying vec3 vColor;
        varying float vDepth;

        void main() {
          // Sharp square pixel rendering (software data packets)
          if (uVariant > 0.5) {
            vec2 coord = gl_PointCoord - vec2(0.5);
            if (abs(coord.x) > 0.46 || abs(coord.y) > 0.46) {
              discard;
            }
          } else {
            vec2 coord = gl_PointCoord - vec2(0.5);
            if (length(coord) > 0.5) {
              discard;
            }
          }

          // Depth-based fading towards far plane
          float fade = clamp(1.0 - (vDepth / uFarPlane), 0.0, 1.0);
          float alpha = pow(fade, max(0.1, uDepthFade * 0.15)) * uBrightness;

          gl_FragColor = vec4(vColor * uBrightness * 1.2, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop with Visibility Handling
    let animFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      if (document.visibilityState === "visible") {
        const delta = clock.getDelta();
        material.uniforms.uTime.value += delta;
        renderer.render(scene, camera);
      }
      animFrameId = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(newDpr);
      material.uniforms.uPixelRatio.value = newDpr;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // WebGL Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.remove(particles);
    };
  }, [color, flakeSize, minFlakeSize, pixelResolution, speed, density, direction, brightness, depthFade, farPlane, variant, reduceMotion]);

  return (
    <div ref={containerRef} className={`pixel-background ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="pixel-background__canvas" />
    </div>
  );
}
