"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CyberIntroOverlay({ onComplete, force = false }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState("INITIALIZING SEC_CORE...");

  useEffect(() => {
    // Detect if the user simply reloaded the page (F5 / Ctrl+R)
    let isPageReload = false;
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries && navEntries.length > 0) {
        isPageReload = navEntries[0].type === "reload";
      }
    }

    // If it's a reload (and not forced), skip animation so the page remains as it is!
    // Whenever visiting from Blogs or other pages (navigation), play the animation!
    if (isPageReload && !force) {
      setVisible(false);
      if (onComplete) onComplete();
      return;
    }

    // Trigger animation for incoming navigation or force replay
    setVisible(true);

    // Dynamic terminal boot sequences in Blue/Cyan theme
    const timer1 = setTimeout(() => setBootStep("CONNECTING TO PCLUB SEC_NET..."), 800);
    const timer2 = setTimeout(() => setBootStep("DECRYPTING CIPHER SUITES [AES-256]..."), 1600);
    const timer3 = setTimeout(() => setBootStep("ACCESS GRANTED // WELCOME OPERATOR"), 2500);

    // Progress bar ticker
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 65);

    // Dismiss after animation finishes
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(dismissTimer);
      clearInterval(interval);
    };
  }, [force]);

  const handleDismiss = () => {
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden select-none"
        >
          {/* Cyber Video Layer */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              playsInline
              onEnded={handleDismiss}
              poster="https://i.pinimg.com/originals/e1/ee/2a/e1ee2a9c2e11023d95941b948a1726bc.jpg"
              className="w-full h-full object-cover opacity-60 filter contrast-125 hue-rotate-[-35deg]"
            >
              <source
                src="https://v1.pinimg.com/videos/mc/720p/29/f0/3b/29f03b8a1d164de3094d903405c34370.mp4"
                type="video/mp4"
              />
            </video>
            {/* Dark cyan/blue gradient and tech grid overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.2),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:35px_35px]" />
          </div>

          {/* Futuristic HUD Corners in Cyan */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-400 opacity-80" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-400 opacity-80" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-400 opacity-80" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-400 opacity-80" />

          {/* Top Status Bar */}
          <div className="absolute top-10 inset-x-12 flex items-center justify-between text-[11px] font-mono text-cyan-400/80 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SEC_DOMAIN // PCLUB-IITI</span>
            </div>
            <button
              onClick={handleDismiss}
              className="px-4 py-1.5 rounded-lg border border-cyan-500/40 bg-slate-900/90 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white text-cyan-300 font-mono text-xs font-bold transition-all tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              SKIP [ESC] ➔
            </button>
          </div>

          {/* Center Brand & Boot Animation */}
          <div className="relative z-10 text-center max-w-lg px-6 flex flex-col items-center">
            {/* Official PClub Crest with Holographic Glow Ring */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.92, 1.05, 1], opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-24 h-24 rounded-full p-1 bg-slate-900/90 border-2 border-cyan-400 shadow-[0_0_45px_rgba(6,182,212,0.5)] flex items-center justify-center mb-6 overflow-hidden"
            >
              <Image
                src="/images/pclub-logo.png"
                alt="PClub IIT Indore Logo"
                width={88}
                height={88}
                className="w-full h-full object-contain rounded-full"
                priority
              />
              <div className="absolute inset-0 rounded-full border border-cyan-300/40 animate-ping pointer-events-none" />
            </motion.div>

            {/* Glowing Domain Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mb-2 drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            >
              CYBERSECURITY{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                WING
              </span>
            </motion.h1>

            <p className="text-xs font-mono text-cyan-300/80 tracking-wider mb-8 uppercase">
              Programming Club · IIT Indore
            </p>

            {/* Terminal Status Text */}
            <div className="w-full max-w-xs mb-3 text-xs font-mono text-cyan-400 flex items-center justify-between">
              <span>{bootStep}</span>
              <span className="font-bold">{progress}%</span>
            </div>

            {/* Glowing Blue/Cyan Tech Progress Bar */}
            <div className="w-full max-w-xs h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Diagnostics Line */}
          <div className="absolute bottom-10 inset-x-12 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>MEM: 0x7FFF92A · PROTOCOL: SEC_TLS</span>
            <span>STATUS: READY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}