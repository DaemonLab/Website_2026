"use client";

import { DecryptedText } from "@/components/ui/DecryptedText";
import { ElectricLogo } from "@/components/ui/ElectricLogo";
import SpecularButton from "@/components/ui/SpecularButton";
import { TechBackground } from "@/components/ui/TechBackground";
import {
  cubicBezierSmooth,
  heroWordContainer,
  heroWordItem,
} from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SoftwareEcosystemProps = {
  sparse?: boolean;
};

function SoftwareEcosystem({ sparse = false }: SoftwareEcosystemProps) {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (reduceMotion) return;

    let animFrameId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(() => {
          setTilt({
            rotateX: -targetY * 8,
            rotateY: targetX * 8,
          });
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

  const nodes = [
    {
      id: "ai",
      label: "AI ENGINE",
      short: "AI",
      subtext: "MODELS | INFERENCE",
      x: 50,
      y: 8,
    },
    {
      id: "database",
      label: "DATA LAYER",
      short: "DB",
      subtext: "STORAGE | ANALYTICS",
      x: 14,
      y: 26,
    },
    {
      id: "application",
      label: "APPLICATION",
      short: "APP",
      subtext: "WEB | PLATFORMS",
      x: 86,
      y: 26,
    },
    {
      id: "api",
      label: "API SERVICES",
      short: "API",
      subtext: "REST | GRAPHQL",
      x: 16,
      y: 74,
    },
    {
      id: "systems",
      label: "SYSTEMS",
      short: "SYS",
      subtext: "INFRA | DEVOPS",
      x: 84,
      y: 74,
    },
    {
      id: "cloud",
      label: "CLOUD INFRA",
      short: "CLD",
      subtext: "CONTAINERS | ORCHESTRATION",
      x: 50,
      y: 84,
    },
    {
      id: "interface",
      label: "INTERFACE",
      short: "UI",
      subtext: "DESIGN SYSTEMS | UX",
      x: 50,
      y: 96,
    },
  ];

  const visibleNodes = sparse ? nodes.slice(0, 5) : nodes;

  const connections: [number, number, number, number][] = [
    [50, 8, 50, 36],
    [14, 26, 40, 44],
    [86, 26, 60, 44],
    [16, 74, 40, 56],
    [84, 74, 60, 56],
    [50, 84, 50, 64],
    [50, 96, 50, 68],
  ];

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[580px] [perspective:1000px] [transform-style:preserve-3d] transition-transform duration-500 ease-out"
      style={
        reduceMotion
          ? undefined
          : {
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            }
      }
    >
      {/* Deep Royal Blue Ambient Glow */}
      <motion.div
        className="absolute inset-[8%] rounded-full bg-brand-blue/15 blur-[110px] pointer-events-none"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.65, 0.35],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-[22%] rounded-full bg-brand-dark/20 blur-[85px] pointer-events-none"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.25, 0.55, 0.25],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Radial Technical Grid Background */}
      <div
        className="absolute inset-[4%] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(circle, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 75%)",
        }}
      />

      {/* Restrained Corner Bracket Framing */}
      <div className="absolute top-[6%] left-[6%] h-8 w-8 border-t border-l border-brand-blue/25 pointer-events-none" />
      <div className="absolute top-[6%] right-[6%] h-8 w-8 border-t border-r border-brand-blue/25 pointer-events-none" />
      <div className="absolute bottom-[6%] left-[6%] h-8 w-8 border-b border-l border-brand-blue/25 pointer-events-none" />
      <div className="absolute right-[6%] bottom-[6%] h-8 w-8 border-r border-b border-brand-blue/25 pointer-events-none" />

      {/* Technical HUD Telemetry Labels */}
      <span className="absolute top-[7%] left-[10%] font-mono text-[8px] tracking-widest text-brand-light/35 pointer-events-none">
        SYS.8080 // 3D.ORBIT
      </span>
      <span className="absolute top-[7%] right-[10%] font-mono text-[8px] tracking-widest text-brand-light/35 pointer-events-none">
        NET.STATUS // ACTIVE
      </span>

      {/* =========================================================
          MAIN 3D REVOLVING ELLIPTICAL ORBITAL PLANES
      ========================================================= */}

      {/* ORBIT PLANE 1: Wide Horizontal 3D Ellipse Plane */}
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
        <motion.div
          className="relative h-[80%] w-[80%] rounded-full border border-brand-light/40 shadow-[0_0_25px_rgba(37,99,235,0.25)]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(70deg) rotateY(0deg)",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateZ: [0, 360],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-[-4px] rounded-full border border-dashed border-brand-blue/30" />

          {!reduceMotion && (
            <motion.div
              className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_#3b82f6]"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {!reduceMotion && (
            <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-light shadow-[0_0_10px_#60a5fa]" />
          )}
        </motion.div>
      </div>

      {/* ORBIT PLANE 2: Clockwise Diagonal 3D Ellipse Plane (+45° tilt) */}
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
        <motion.div
          className="relative h-[80%] w-[80%] rounded-full border border-brand-blue/60 shadow-[0_0_25px_rgba(37,99,235,0.3)]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(65deg) rotateY(45deg)",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateZ: [0, 360],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-[6px] rounded-full border border-brand-light/25" />

          {!reduceMotion && (
            <motion.div
              className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_#2563eb]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>

      {/* ORBIT PLANE 3: Counter-Clockwise Diagonal 3D Ellipse Plane (-45° tilt) */}
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
        <motion.div
          className="relative h-[80%] w-[80%] rounded-full border border-brand-glow/45 shadow-[0_0_22px_rgba(96,165,250,0.25)]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(65deg) rotateY(-45deg)",
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateZ: [360, 0],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-[-6px] rounded-full border border-dashed border-brand-light/20" />

          {!reduceMotion && (
            <motion.div
              className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-light shadow-[0_0_14px_#ffffff]"
              animate={{ scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>

      {/* PRESERVED OUTER BOUNDARY CIRCULAR TRACK WITH SPHERES */}
      <div className="absolute inset-[6%] rounded-full border border-brand-blue/30 pointer-events-none">
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_#ffffff]" />
            <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-light shadow-[0_0_14px_#3b82f6]" />
          </motion.div>
        )}
      </div>

      {/* SVG Architecture Diagram & Core Atomic Ellipses */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
        fill="none"
      >
        <defs>
          <radialGradient id="pclub3DCoreGlow">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="pclub3DConn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
          </linearGradient>

          <filter id="pclubGlowFilter" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="0.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Directional Arrow Marker pointing from Core to Module Boxes */}
          <marker
            id="coreArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 L 2 5 z" fill="#60a5fa" opacity="0.9" />
          </marker>
        </defs>

        {/* Faint Outer Alignment Guide Ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="#2563eb"
          strokeOpacity="0.08"
          strokeWidth="0.3"
          strokeDasharray="1 3"
        />

        {/* Connections with Arrow Markers from Core to System Module Boxes */}
        {connections.map(([x1, y1, x2, y2], index) => (
          <g key={index}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#pclub3DConn)"
              strokeWidth="0.45"
              markerEnd="url(#coreArrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.8 + index * 0.1,
                ease: "easeOut",
              }}
            />

            {!reduceMotion && (
              <motion.circle
                r="0.8"
                fill="#ffffff"
                filter="url(#pclubGlowFilter)"
                initial={{ cx: x1, cy: y1, opacity: 0 }}
                animate={{
                  cx: [x1, x2],
                  cy: [y1, y2],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.8 + (index % 3) * 0.4,
                  repeat: Infinity,
                  delay: 1.6 + index * 0.35,
                  ease: "linear",
                }}
              />
            )}
          </g>
        ))}

        {/* =========================================================
            2 PREMIUM ELEGANT ATOMIC ELLIPSES WRAPPING AROUND THE CORE
        ========================================================= */}

        {/* Inner Core Atomic Ellipse 1 (Tilted Right) */}
        <g style={{ transformOrigin: "50px 50px" }}>
          <motion.ellipse
            cx="50"
            cy="50"
            rx="14"
            ry="27"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="0.7"
            strokeOpacity="0.9"
            filter="url(#pclubGlowFilter)"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: [30, 390],
                    strokeOpacity: [0.7, 1, 0.7],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        </g>

        {/* Inner Core Atomic Ellipse 2 (Tilted Left) */}
        <g style={{ transformOrigin: "50px 50px" }}>
          <motion.ellipse
            cx="50"
            cy="50"
            rx="14"
            ry="27"
            fill="none"
            stroke="#2563eb"
            strokeWidth="0.75"
            strokeOpacity="0.95"
            filter="url(#pclubGlowFilter)"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: [-30, -390],
                    strokeOpacity: [0.75, 1, 0.75],
                  }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        </g>

        {/* Layered Central Software Core */}
        <g style={{ transformOrigin: "50px 50px" }}>
          <motion.circle
            cx="50"
            cy="50"
            r="24"
            fill="url(#pclub3DCoreGlow)"
            animate={
              reduceMotion
                ? undefined
                : {
                    r: [24, 26, 24],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke="#60a5fa"
            strokeOpacity="0.45"
            strokeWidth="0.4"
            strokeDasharray="3 6"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />

        </g>
      </svg>

      {/* Central Official PClub Electric Logo Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-auto">
        <ElectricLogo
          className="w-32 h-32 sm:w-40 sm:h-40"
          color="#FFFFFF"
          glowColor="#2563EB"
          scale={0.7}
        />
      </div>

      {/* System Module Nodes */}
      {visibleNodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.9 + index * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <motion.div
            className="group relative flex cursor-pointer flex-col items-center"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={{
              duration: 4.5 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            whileHover={{ scale: 1.08 }}
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/40 bg-navy-card/95 shadow-[0_0_20px_rgba(37,99,235,0.22)] backdrop-blur-md transition-all duration-300 group-hover:border-brand-light group-hover:bg-brand-blue/20 group-hover:shadow-[0_0_28px_rgba(59,130,246,0.38)]">
              <span className="font-mono text-[9px] font-bold tracking-wider text-brand-light group-hover:text-white transition-colors">
                {node.short}
              </span>
            </div>

            <span className="mt-1.5 whitespace-nowrap font-mono text-[9px] font-semibold tracking-[0.2em] text-foreground group-hover:text-brand-light transition-colors uppercase">
              {node.label}
            </span>
            <span className="whitespace-nowrap font-mono text-[7px] tracking-wider text-muted-dim transition-colors group-hover:text-muted">
              {node.subtext}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Central Identity Label */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[64px] text-center z-20">
        <p className="font-mono text-[9px] font-bold tracking-[0.35em] text-brand-light uppercase">
          SOFTWARE CORE
        </p>
        <p className="font-mono text-[7px] tracking-[0.25em] text-muted-dim uppercase">
          BUILD • CONNECT • SCALE
        </p>
      </div>
    </motion.div>
  );
}

export function SoftwareHero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [sparse, setSparse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setSparse(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-20 pb-16">
      {/* React Bits Tech Background */}
      <TechBackground />

      {/* Radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(29,78,216,0.12),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* LEFT COLUMN: Sequential Motion Typography */}
        <div className="max-w-xl">
          {/* Step 1: Eyebrow with DecryptedText */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: cubicBezierSmooth }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.32em] text-brand-light uppercase">
              <DecryptedText text="Software Domain" speed={30} maxIterations={8} />
            </span>
          </motion.div>

          {/* Steps 2-4: Sequential Headline Reveal ("Build.", "Ship.", "Innovate.") */}
          <motion.div
            variants={heroWordContainer}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="mt-6 font-display text-4xl leading-[1.08] font-bold tracking-tight text-foreground sm:text-6xl"
          >
            <span className="block">
              <motion.span variants={heroWordItem} className="inline-block">
                <DecryptedText text="Build." speed={50} maxIterations={10} />
              </motion.span>{" "}
              <motion.span variants={heroWordItem} className="inline-block text-brand-light">
                <DecryptedText text="Ship." speed={50} maxIterations={12} />
              </motion.span>
            </span>
            <span className="block">
              <motion.span variants={heroWordItem} className="inline-block">
                <DecryptedText text="Innovate." speed={50} maxIterations={14} />
              </motion.span>
            </span>
          </motion.div>

          {/* Step 5: Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: cubicBezierSmooth }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            From ideas to interfaces, APIs to infrastructure — we architect and
            build software that solves real engineering problems.
          </motion.p>

          {/* Step 6: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: cubicBezierSmooth }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <SpecularButton
              size="md"
              radius={24}
              tint="#2563eb"
              tintOpacity={0.25}
              lineColor="#60a5fa"
              baseColor="#2563eb"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Projects
            </SpecularButton>

            <SpecularButton
              size="md"
              radius={24}
              tint="#ffffff"
              tintOpacity={0.05}
              lineColor="#ffffff"
              baseColor="#3b82f6"
              onClick={() => {
                router.push("/join/software");
              }}
            >
              Join the Domain
            </SpecularButton>
          </motion.div>
        </div>

        {/* Step 7: Ecosystem Architecture Visualization */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.95,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4,
          }}
          className="relative"
        >
          <SoftwareEcosystem sparse={sparse} />
        </motion.div>
      </div>
    </section>
  );
}