"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Crisp SVG Icons instead of emojis
const TrophyIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2 0h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const FlagTargetIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const STATS = [
  { label: "CTFs Won / Top 10", value: "24+", icon: <TrophyIcon /> },
  { label: "Vulnerabilities Discovered", value: "65+", icon: <ShieldCheckIcon /> },
  { label: "Active Open-Source Projects", value: "12", icon: <TerminalIcon /> },
  { label: "Flags Captured", value: "1,400+", icon: <FlagTargetIcon /> },
];

export default function CyberHero() {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "initiating protocol: sec_ops --target=pclub.iiti --stealth=1";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-slate-950 text-white">
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Blue / Cyan Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,6,23,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Terminal Header Prompt */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-cyan-400 font-mono text-xs sm:text-sm mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-500">[root@pclub-iiti:~]$</span>
          <span className="text-cyan-300 font-semibold">{terminalText}</span>
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-mono mb-6"
        >
          <span className="text-white">Cybersecurity</span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
            Domain
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl font-mono text-slate-300 max-w-2xl mb-4"
        >
          Protecting the Bytes |{" "}
          <span className="text-cyan-400 font-medium">PClub IIT Indore</span>{" "}
          Cybersecurity Wing
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed mb-10"
        >
          Breaching defenses, dissecting binaries, securing architectures, and training elite ethical hackers through hands-on Capture The Flag (CTF) competitions and cutting-edge security research.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 text-white font-mono font-bold text-sm transition-all duration-200"
          >
            Explore Projects_
          </a>
          <a
            href="#resources"
            className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-mono text-sm transition-all duration-200"
          >
            Access Roadmaps & Tools
          </a>
        </motion.div>

        {/* Stats Ticker with clean SVGs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors" />
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 mb-3 group-hover:border-cyan-500/30 transition-colors">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}