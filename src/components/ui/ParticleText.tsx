"use client";

import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./ParticleText.css";

export interface ParticleTextProps {
  text: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover";
  fontSize?: string;
  fontWeight?: number;
  glow?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  staggerDelay: number;
}

export function ParticleText({
  text,
  particleSize = 2,
  density = 3,
  color = "#FFFFFF",
  highlightColor = "#2563EB",
  scatter = 160,
  gatherDuration = 1500,
  stagger = 300,
  pointerRepel = 30,
  repelRadius = 100,
  idleDrift = 0.3,
  trigger = "mount",
  fontSize = "clamp(2.5rem, 6vw, 5rem)",
  fontWeight = 800,
  glow = true,
  className = "",
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let particles: Particle[] = [];
    let startTime = performance.now();
    let mouse = { x: -9999, y: -9999, active: false };
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Offscreen Canvas for Text Pixel Sampling
    const sampleParticles = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      
      const computedStyle = window.getComputedStyle(container);
      let computedFontSize = parseFloat(computedStyle.fontSize);
      if (isNaN(computedFontSize) || computedFontSize < 20) {
        computedFontSize = 52;
      }

      // Extract resolved font family without CSS variables
      let fontFamily = computedStyle.fontFamily || "sans-serif";
      // Clean up var(--...) fallback if present in string
      if (fontFamily.includes("var(")) {
        fontFamily = 'Syne, Geist, system-ui, -apple-system, sans-serif';
      }

      const fontSpec = `${fontWeight} ${computedFontSize}px ${fontFamily}`;

      // Measure text width using temporary canvas
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      tempCtx.font = fontSpec;
      const metrics = tempCtx.measureText(text);
      const measuredWidth = Math.ceil(metrics.width);

      const width = Math.max(rect.width, measuredWidth + 60);
      const height = Math.max(computedFontSize * 1.8, 110);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Create offscreen canvas
      const offCanvas = document.createElement("canvas");
      offCanvas.width = width * dpr;
      offCanvas.height = height * dpr;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.scale(dpr, dpr);
      offCtx.font = fontSpec;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#ffffff";

      // Render text in center
      const centerX = width / 2;
      const centerY = height / 2;
      offCtx.fillText(text, centerX, centerY);

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, width * dpr, height * dpr);
      const data = imgData.data;

      particles = [];
      const step = Math.max(2, Math.floor(6 / density));

      for (let y = 0; y < height * dpr; y += step) {
        for (let x = 0; x < width * dpr; x += step) {
          const index = (y * width * dpr + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const posX = x / dpr;
            const posY = y / dpr;

            // Random initial scatter vector bounded safely within canvas
            const angle = Math.random() * Math.PI * 2;
            const dist = (0.2 + Math.random() * 0.8) * Math.min(scatter, 140);
            const sX = posX + Math.cos(angle) * dist;
            const sY = posY + Math.sin(angle) * dist;

            // Stagger delay based on horizontal position
            const staggerDelay = (Math.random() * 0.5 + (posX / width) * 0.5) * stagger;

            // Color selection (85% base color, 15% highlight)
            const pColor = Math.random() > 0.82 ? highlightColor : color;

            particles.push({
              x: trigger === "mount" ? sX : posX,
              y: trigger === "mount" ? sY : posY,
              originX: posX,
              originY: posY,
              scatterX: sX,
              scatterY: sY,
              vx: 0,
              vy: 0,
              size: particleSize * (0.85 + Math.random() * 0.3),
              color: pColor,
              staggerDelay,
            });
          }
        }
      }

      startTime = performance.now();
    };

    sampleParticles();

    // Mouse Event Listeners for Cursor Repel & Hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Render Animation Loop
    const render = (now: number) => {
      if (isVisible) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.clearRect(0, 0, width, height);

        const elapsed = now - startTime;

        if (glow) {
          ctx.shadowColor = highlightColor;
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (reduceMotion) {
            p.x = p.originX;
            p.y = p.originY;
          } else {
            let targetX = p.originX;
            let targetY = p.originY;

            if (trigger === "mount") {
              const particleElapsed = Math.max(0, elapsed - p.staggerDelay);
              const progress = Math.min(1, particleElapsed / gatherDuration);
              // Smooth cubic ease out
              const ease = 1 - Math.pow(1 - progress, 3);
              targetX = p.scatterX + (p.originX - p.scatterX) * ease;
              targetY = p.scatterY + (p.originY - p.scatterY) * ease;
            } else if (trigger === "hover") {
              if (isHovered) {
                targetX = p.scatterX;
                targetY = p.scatterY;
              } else {
                targetX = p.originX;
                targetY = p.originY;
              }
            }

            // Ambient idle drift wave
            if (idleDrift > 0 && Math.abs(p.x - p.originX) < 10) {
              targetY += Math.sin((now * 0.002) + i * 0.2) * idleDrift;
              targetX += Math.cos((now * 0.0015) + i * 0.3) * (idleDrift * 0.5);
            }

            // Pointer Repel Force
            if (mouse.active) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < repelRadius && dist > 0) {
                const force = ((repelRadius - dist) / repelRadius) * pointerRepel;
                targetX += (dx / dist) * force;
                targetY += (dy / dist) * force;
              }
            }

            // Spring physics easing
            const spring = 0.14;
            const friction = 0.75;

            p.vx = (p.vx + (targetX - p.x) * spring) * friction;
            p.vy = (p.vy + (targetY - p.y) * spring) * friction;

            p.x += p.vx;
            p.y += p.vy;
          }

          // Draw Particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // Resize handling & font readiness
    const handleResize = () => {
      sampleParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    if (document.fonts) {
      document.fonts.ready.then(() => sampleParticles());
    }

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [
    text,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontWeight,
    glow,
    isHovered,
    reduceMotion,
  ]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => trigger === "hover" && setIsHovered(true)}
      onMouseLeave={() => trigger === "hover" && setIsHovered(false)}
      className={`particle-text-container ${className}`}
      style={{ fontSize }}
    >
      <span className="sr-only">{text}</span>
      <canvas ref={canvasRef} className="particle-text-canvas" aria-hidden="true" />
    </div>
  );
}
