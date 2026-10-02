"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface TechBackgroundProps {
  className?: string;
  gridSize?: number;
  particleCount?: number;
}

export function TechBackground({
  className = "",
  gridSize = 48,
  particleCount = 12,
}: TechBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    let animFrameId: number | null = null;
    let targetX = 50;
    let targetY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.background = `radial-gradient(600px circle at ${targetX}% ${targetY}%, rgba(37, 99, 235, 0.12), transparent 80%)`;
          }
          animFrameId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [reduceMotion]);

  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 92}%`,
    top: `${(i * 23 + 11) % 88}%`,
    duration: 12 + (i % 5) * 4,
    delay: (i % 4) * 1.5,
    size: 2 + (i % 3),
  }));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Interactive Cursor Ambient Radial Spotlight */}
      {!reduceMotion && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, rgba(37, 99, 235, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* Drifting Royal Blue Particles */}
      {!reduceMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-light/40 shadow-[0_0_8px_#3b82f6]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
