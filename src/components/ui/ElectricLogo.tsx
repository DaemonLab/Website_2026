"use client";

import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./ElectricLogo.css";

export interface ElectricLogoProps {
  color?: string;
  glowColor?: string;
  scale?: number;
  intensity?: number;
  glow?: number;
  thickness?: number;
  strands?: number;
  bend?: number;
  crackle?: number;
  arcs?: number;
  flicker?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

export function ElectricLogo({
  color = "#FFFFFF",
  glowColor = "#2563EB",
  scale = 0.65,
  intensity = 0.85,
  glow = 0.75,
  thickness = 1.5,
  strands = 3,
  bend = 0.45,
  crackle = 1.0,
  speed = 1.5,
  interactive = true,
  className = "",
}: ElectricLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || reduceMotion) return;

    let animFrameId: number;
    let time = 0;
    let isVisible = true;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      if (isVisible) {
        time += 0.016 * speed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) * 0.38 * scale;

        // Draw subtle electric plasma arcs & strands tracing around logo center
        const currentStrands = isHovered ? strands + 2 : strands;
        const currentGlow = isHovered ? glow * 1.3 : glow;

        for (let s = 0; s < currentStrands; s++) {
          const offsetAngle = (s * Math.PI * 2) / currentStrands + time * 0.5;
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = thickness * (isHovered ? 1.4 : 1);
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 20 * currentGlow;

          for (let a = 0; a <= Math.PI * 2; a += 0.1) {
            const noise = Math.sin(a * 6 + time * 3 + s) * crackle * 6;
            const currentR = r + noise + Math.sin(a * 2 + time * 2) * 10 * bend;
            const x = cx + Math.cos(a + offsetAngle) * currentR;
            const y = cy + Math.sin(a + offsetAngle) * currentR;

            if (a === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, [color, glowColor, scale, intensity, glow, thickness, strands, bend, crackle, speed, isHovered, reduceMotion]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      className={`electric-logo ${className}`}
    >
      {/* Canvas layer for electric strands and plasma aura */}
      {!reduceMotion && (
        <canvas ref={canvasRef} className="electric-logo__canvas" />
      )}

      {/* Official Programming Club IIT Indore SVG Logo Emblem */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="electric-logo__svg transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <radialGradient id="pclubEmblemGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="pclubLogoGradient" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <filter id="pclubElectricFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow ring */}
        <circle cx="100" cy="100" r="85" fill="url(#pclubEmblemGlow)" />

        {/* Hexagonal Outer Circuit Border */}
        <polygon
          points="100,18 170,58 170,142 100,182 30,142 30,58"
          stroke="url(#pclubLogoGradient)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          filter="url(#pclubElectricFilter)"
          opacity={isHovered ? "1" : "0.85"}
        />

        {/* Inner Circuit Node Traces */}
        <path
          d="M 100,18 L 100,45 M 170,58 L 145,72 M 170,142 L 145,128 M 100,182 L 100,155 M 30,142 L 55,128 M 30,58 L 55,72"
          stroke="#60a5fa"
          strokeWidth="1.8"
          strokeOpacity="0.6"
          strokeDasharray="3 3"
        />

        {/* Central Geometric PClub Emblem: 'P' & 'C' with Terminal Symbol '>_' */}
        <g filter="url(#pclubElectricFilter)">
          {/* P-Shape Curve */}
          <path
            d="M 65,65 H 115 C 130,65 130,105 115,105 H 65 V 140"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Terminal Code Cursor '>_' */}
          <path
            d="M 105,118 L 120,128 L 105,138"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="126"
            y1="138"
            x2="140"
            y2="138"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
