"use client";

import { useReducedMotion } from "framer-motion";

interface SoftwareSectionBackgroundProps {
  className?: string;
}

export function SoftwareSectionBackground({ className = "" }: SoftwareSectionBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Subtle Radial Blue Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_70%)]" />

      {/* Low-Opacity Technical Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Subtle horizontal data telemetry line */}
      {!reduceMotion && (
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-light/15 to-transparent animate-pulse" />
      )}
    </div>
  );
}
