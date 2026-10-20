"use client";

import { useState } from "react";

/* =====================================================================
   Achievements Section (Stacked Deck Layout)
   Left: 3D Stacked Image Deck
   Center: Vertical Divider Line
   Right: Achievement Details & Navigation Controls
   ===================================================================== */

const ACHIEVEMENTS_DATA = [
  {
    id: "icpc-regionals-2025",
    title: "ICPC Regional Finalists",
    category: "Competitive Programming",
    rank: "Rank 14",
    date: "2025",
    description:
      "Secured top ranks among 500+ teams nationwide at the ICPC Asia-Kanpur Regional Contest with outstanding performance in dynamic programming and graph algorithms.",
    tags: ["ICPC", "Algorithms", "Teamwork"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "codeforces-master",
    title: "3 Master Candidates",
    category: "Global Platforms",
    rank: "2100+ Rating",
    date: "2024 - 2025",
    description:
      "3 active domain members reached the Candidate Master title on Codeforces within a single season through continuous contest grit and algorithmic practice.",
    tags: ["Codeforces", "Rating", "Individual"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "inter-iit-gold",
    title: "Inter-IIT Tech Meet Gold",
    category: "Inter-College Challenge",
    rank: "1st Place",
    date: "2024",
    description:
      "Won 1st position in the High-Performance Computing & CP problem statement among all 23 IITs, solving complex multi-threaded speedups.",
    tags: ["Inter-IIT", "Gold Medal", "HPC"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hackathon-winners",
    title: "National Hackathon Champions",
    category: "Open Source & Algorithmic Design",
    rank: "Grand Winners",
    date: "2024",
    description:
      "Built a real-time competitive programming code runner and analytics dashboard, beating 120+ teams to claim the top cash prize.",
    tags: ["Hackathon", "System Design", "Web3"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
];

/* ---------------- Icons ---------------- */
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Achievements({ achievements = ACHIEVEMENTS_DATA }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const total = achievements.length;

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setAnimating(false), 500);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setAnimating(false), 500);
  };

  const currentItem = achievements[currentIndex];

  return (
    <section id="achievements" className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8">
      {/* Background Cyber Grid Lines Effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(6,182,212,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Header */}
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
          Milestones
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Domain <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Achievements</span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
          A snapshot of our contest triumphs, international rankings, and platform honors.
        </p>
      </div>

      {/* Split Layout Section */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        
        {/* LEFT HALF: Stacked Image Deck (5 cols) */}
        <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[380px] lg:col-span-5">
          <div className="relative h-64 w-full max-w-[340px] sm:h-80 sm:max-w-[400px]">
            {achievements.map((item, index) => {
              // Calculate relative offset from current active card
              const offset = (index - currentIndex + total) % total;

              // Display only up to 3 cards in the visual deck stack
              if (offset > 2) return null;

              // Dynamic transformations for depth effect
              const transforms = [
                "translate-x-0 translate-y-0 scale-100 rotate-0 z-30 opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(6,182,212,0.25)]",
                "translate-x-4 translate-y-4 scale-[0.94] rotate-[4deg] z-20 opacity-80 shadow-[0_15px_30px_rgba(0,0,0,0.5)]",
                "translate-x-8 translate-y-8 scale-[0.88] rotate-[8deg] z-10 opacity-50 shadow-[0_10px_20px_rgba(0,0,0,0.4)]",
              ];

              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-slate-900 transition-all duration-500 ease-out ${transforms[offset]}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER: Vertical Divider Line (1 col) */}
        <div className="hidden justify-center lg:col-span-1 lg:flex">
          <div className="h-80 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
        </div>

        {/* RIGHT HALF: Achievement Details & Controls (6 cols) */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
          <div className="key-fade transition-all duration-500">
            {/* Category & Rank */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold tracking-wide text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {currentItem.rank}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {currentItem.category} • {currentItem.date}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {currentItem.title}
            </h3>

            {/* Description */}
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {currentItem.description}
            </p>

            {/* Tags */}
            {currentItem.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-700/60 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300 border-cyan-500/30 text-cyan-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            {/* Step Counter */}
            <div className="text-xs font-semibold tracking-wider text-slate-400">
              <span className="text-cyan-400">{String(currentIndex + 1).padStart(2, "0")}</span>
              {" / "}
              <span>{String(total).padStart(2, "0")}</span>
            </div>

            {/* Left / Right Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Achievement"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-white transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Achievement"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-white transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}