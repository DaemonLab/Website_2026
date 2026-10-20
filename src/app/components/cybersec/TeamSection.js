"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamSection({ members = [] }) {
  // Current active page index (0 is Domain Lead)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward (flip next), -1 = backward (flip back)

  const currentMember = members[currentIndex] || members[0];

  const handleNext = () => {
    if (currentIndex < members.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to the start (close the book)
      setDirection(-1);
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const jumpTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>// CLASSIFIED_DOSSIER_</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight mb-4">
          Operatives & Domain Leads
        </h2>
        <p className="text-sm sm:text-base font-mono text-slate-400 max-w-xl mx-auto">
          Explore the strike team defending IIT Indore. Click on the stacked card to flip through member dossiers like the pages of a book.
        </p>
      </div>

      {/* Stacked Book-Page Container */}
      <div className="relative max-w-2xl mx-auto min-h-[520px] flex flex-col items-center">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 📚 THE STACK OF PAGES */}
        <div className="relative w-full h-[450px] sm:h-[420px] flex items-center justify-center [perspective:1400px]">
          {/* Decorative Peeking Stack Pages (Pages waiting underneath) */}
          {[3, 2, 1].map((offset) => {
            const peekIndex = currentIndex + offset;
            if (peekIndex >= members.length) return null;

            return (
              <div
                key={`peek-${offset}`}
                style={{
                  transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.045})`,
                  zIndex: 10 - offset,
                  opacity: 0.6 - offset * 0.15,
                }}
                className="absolute inset-x-4 sm:inset-x-8 top-0 h-full rounded-2xl bg-slate-900 border border-slate-800 pointer-events-none shadow-xl transition-all duration-300"
              >
                {/* Book Page Spine Accent */}
                <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-r from-slate-950 to-transparent rounded-l-2xl border-r border-slate-800" />
                <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-600 uppercase">
                  Page {String(peekIndex + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}

          {/* 🌟 ACTIVE FLIPPING CARD */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              // 3D Book page turn animation
              initial={(dir) => ({
                opacity: 0,
                x: dir > 0 ? 120 : -120,
                rotateY: dir > 0 ? 30 : -30,
                scale: 0.92,
              })}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 85,
                  damping: 17,
                },
              }}
              exit={(dir) => ({
                opacity: 0,
                x: dir > 0 ? -200 : 200,
                rotateY: dir > 0 ? -65 : 65,
                scale: 0.88,
                transition: { duration: 0.35, ease: "easeInOut" },
              })}
              onClick={handleNext}
              className="absolute inset-x-2 sm:inset-x-6 top-0 h-full z-20 cursor-pointer select-none rounded-2xl bg-slate-900/95 border border-cyan-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-colors backdrop-blur-md"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-t-2xl" />

              {/* Book Spine / Binding Left Border */}
              <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-slate-950 to-transparent rounded-l-2xl border-r border-slate-800/80 pointer-events-none" />

              {/* Header: Page Badge & Role */}
              <div className="flex items-center justify-between mb-4 pl-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                    [FILE {String(currentIndex + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}]
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {currentMember.roleType || "Strike Member"}
                </span>
              </div>

              {/* Member Profile Main Section */}
              <div className="pl-3 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-5 mb-5">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {currentMember.avatar ? (
                      <img
                        src={currentMember.avatar}
                        alt={currentMember.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-2xl text-white">
                        {currentMember.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950" />
                  </div>

                  {/* Name & Titles */}
                  <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight truncate">
                      {currentMember.name}
                    </h3>
                    <p className="text-sm font-mono text-cyan-400 font-semibold mt-0.5">
                      {currentMember.domainRole}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {currentMember.yearDept}
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    <span className="text-cyan-400 font-bold">// Focus Area:</span>{" "}
                    {currentMember.specialization}
                  </p>
                </div>

                {/* CTF Handles */}
                {currentMember.ctfHandles && (
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      Handles:
                    </span>
                    {currentMember.ctfHandles.map((handle) => (
                      <span
                        key={handle.platform}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800/80 border border-slate-700 text-slate-200"
                      >
                        <span className="text-cyan-400">{handle.platform}:</span>{" "}
                        {handle.username}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Socials & Flip Prompt */}
              <div
                onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking links
                className="pl-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  {currentMember.github && (
                    <a
                      href={currentMember.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {currentMember.linkedin && (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                  {currentMember.ctftime && (
                    <a
                      href={currentMember.ctftime}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1"
                    >
                      CTFtime ↗
                    </a>
                  )}
                </div>

                {/* Turn Page Prompt */}
                <div
                  onClick={handleNext}
                  className="cursor-pointer text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold group/hint"
                >
                  <span>{currentIndex < members.length - 1 ? "Turn Page" : "Close Book"}</span>
                  <span className="group-hover/hint:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🎮 CONTROLS & JUMP PILLS */}
        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 border ${
                currentIndex === 0
                  ? "bg-slate-900/50 text-slate-600 border-slate-800/50 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800 text-cyan-400 border-slate-800 hover:border-cyan-500/40 shadow-md"
              }`}
            >
              <span>← Prev Page</span>
            </button>

            <span className="text-xs font-mono text-slate-400 px-2">
              Page <span className="text-cyan-400 font-bold">{currentIndex + 1}</span> of{" "}
              {members.length}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>{currentIndex === members.length - 1 ? "Close Book ↺" : "Next Page →"}</span>
            </button>
          </div>

          {/* Quick Member Jump Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {members.map((member, idx) => (
              <button
                key={member.name}
                onClick={() => jumpTo(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 border ${
                  currentIndex === idx
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-105"
                    : "bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {member.name.split(" ")[0]} {idx === 0 ? "★" : ""}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}