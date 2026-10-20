"use client";

import React, { useState } from "react";

/* =====================================================================
   Resource & Tutorial Logo Loop Component
   Row 1: Practice Websites with Logos (Left to Right)
   Row 2: YouTube Playlists without Images (Right to Left)
   ===================================================================== */

// Row 1: Top Practice Websites & Platforms
const CP_WEBSITES = [
  {
    name: "GeeksforGeeks",
    desc: "DSA Articles & Practice",
    url: "https://www.geeksforgeeks.org/",
    avatar: "https://www.svgrepo.com/show/516604/geeksforgeeks.svg",
    color: "from-green-500/20 to-emerald-500/10 border-green-500/30",
  },
  {
    name: "CSES Problem Set",
    desc: "CP Problem Collection",
    url: "https://cses.fi/problemset/",
    avatar: "https://cses.fi/logo.png",
    color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
  },
  {
    name: "TakeUForward",
    desc: "Striver's SDE Sheets",
    url: "https://takeuforward.org/",
    avatar: "📃",
    color: "from-red-500/20 to-orange-500/10 border-red-500/30",
  },
  {
    name: "LeetCode",
    desc: "Interview Prep & Contests",
    url: "https://leetcode.com/",
    avatar: "https://assets.leetcode.com/static_assets/public/images/LeetCode_logo_rvs.png",
    color: "from-orange-500/20 to-yellow-500/10 border-orange-500/30",
  },
  {
    name: "Codeforces",
    desc: "Competitive Contests",
    url: "https://codeforces.com/",
    avatar: "https://cdn.iconscout.com/icon/free/png-256/free-codeforces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-2-pack-logos-icons-3029920.png",
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  },
  {
    name: "CP-Algorithms",
    desc: "Advanced CP Theory",
    url: "https://cp-algorithms.com/",
    avatar: "https://cp-algorithms.com/favicon.ico",
    color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
  },
  {
    name: "HackerRank",
    desc: "Domain Skill Badges",
    url: "https://www.hackerrank.com/",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  },
];

// Row 2: YouTube Creators & Famous Playlists (Text-Only Cards)
const YOUTUBE_TUTORIALS = [
  {
    name: "Striver A2Z DSA",
    channel: "take U forward",
    url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    color: "from-red-600/20 to-rose-500/10 border-red-500/30",
  },
  {
    name: "Shraddha Khapra",
    channel: "Apna College DSA",
    url: "https://www.youtube.com/playlist?list=PLGjplA1ZmsPE84bN6Xv3bX5Ue5H1B8B33",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
  },
  {
    name: "CodeWithHarry",
    channel: "C++ / Java DSA Playlist",
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
  },
  {
    name: "Luv CP Playlist",
    channel: "Luv CP Course",
    url: "https://www.youtube.com/playlist?list=PLauivoElc3ggagradg8pA11zylcK5a7yW",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
  },
  {
    name: "Abdul Bari",
    channel: "Algorithm Masterclass",
    url: "https://www.youtube.com/results?search_query=abdul+bari+algorithms",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  },
  {
    name: "NeetCode",
    channel: "LeetCode Solutions",
    url: "https://www.youtube.com/@NeetCode",
    color: "from-green-500/20 to-lime-500/10 border-green-500/30",
  },
];

/* ---------------- Logo Loop Row Sub-Component ---------------- */
function LogoLoopRow({ items, reverse = false, speed = "35s", showAvatar = true }) {
  const [isPaused, setIsPaused] = useState(false);

  // Triplicate array for smooth infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex min-w-full shrink-0 gap-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <a
            key={`${item.name}-${idx}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3.5 rounded-xl border bg-gradient-to-r px-5 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] ${item.color}`}
          >
            {/* Show image only if enabled for row */}
            {showAvatar && item.avatar && (
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/20 bg-slate-900 p-1 shadow-md transition-transform duration-300 group-hover:scale-110">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://www.svgrepo.com/show/516604/geeksforgeeks.svg";
                  }}
                />
              </div>
            )}

            {/* Content Details */}
            <div className="whitespace-nowrap">
              <h4 className="text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
                {item.name}
              </h4>
              <p className="text-[11px] font-medium text-slate-400">
                {item.desc || item.channel}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main Component ---------------- */
export default function CPResourcesLoop() {
  return (
    <section id="resources" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
      {/* Background Cyber Grid Effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(6,182,212,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

      {/* Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
          Resource Vault
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Top <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Platforms & Playlists</span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
          Handpicked practice platforms, Sheets, and YouTube courses recommended by top coders.
        </p>
      </div>

      {/* Infinite Scrolling Loops */}
      <div className="space-y-4">
        {/* Row 1: Platforms (With Logos, Left to Right) */}
        <LogoLoopRow items={CP_WEBSITES} reverse={false} speed="40s" showAvatar={true} />

        {/* Row 2: YouTube Playlists (Text-Only, Right to Left) */}
        <LogoLoopRow items={YOUTUBE_TUTORIALS} reverse={true} speed="45s" showAvatar={false} />
      </div>

      {/* Tailwind Keyframe Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}</style>
    </section>
  );
}