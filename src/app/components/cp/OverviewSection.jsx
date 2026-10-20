'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Custom inline SVG icons for platforms with external link issues
const CustomIcons = {
  CodeChef: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"
        fill="#D1A054"
      />
      <circle cx="12" cy="12" r="9" stroke="#D1A054" strokeWidth="1.5" fill="none" />
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  SPOJ: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#00529B" />
      <text x="12" y="16" fontSize="10" fontWeight="800" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">
        SPOJ
      </text>
    </svg>
  ),
  UVa: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l7 16h2l7-16h-3.5L12 15.5 7.5 4H4z" fill="#EF4444" />
      <path d="M12 2L2 22h20L12 2zm0 5.5l5.5 11h-11L12 7.5z" fill="#38BDF8" opacity="0.4" />
    </svg>
  ),
};

const activities = [
  'Regular contests & practice sessions',
  'Discussion & editorial sessions',
  'Roadmap & resource guidance',
  'Mentorship & peer learning',
];

const platforms = [
  {
    name: 'Codeforces',
    type: 'img',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-codeforces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-2-pack-logos-icons-3029920.png',
    url: 'https://codeforces.com/',
  },
  {
    name: 'AtCoder',
    type: 'img',
    logo: 'https://img.atcoder.jp/assets/atcoder.png',
    url: 'https://atcoder.jp/',
  },
  {
    name: 'LeetCode',
    type: 'img',
    logo: 'https://assets.leetcode.com/static_assets/public/images/LeetCode_logo_rvs.png',
    url: 'https://leetcode.com/',
  },
  {
    name: 'CodeChef',
    type: 'svg',
    SvgIcon: CustomIcons.CodeChef,
    url: 'https://www.codechef.com/',
  },
  {
    name: 'HackerRank',
    type: 'img',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
    url: 'https://www.hackerrank.com/',
  },
  {
    name: 'SPOJ',
    type: 'svg',
    SvgIcon: CustomIcons.SPOJ,
    url: 'https://www.spoj.com/',
  },
  {
    name: 'UVa',
    type: 'svg',
    SvgIcon: CustomIcons.UVa,
    url: 'https://onlinejudge.org/',
  },
];

export default function DomainOverview() {
  return (
    <section id="overview" className="w-full px-4 py-12 bg-[#020617] text-slate-100">
      {/* Outer Single Horizontal Glassmorphism Card */}
      <div className="w-full max-w-7xl mx-auto bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-800/80 shadow-2xl shadow-blue-950/40 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Part 1: About CP Domain */}
          <div className="lg:col-span-4 flex flex-col justify-center pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              ABOUT CP DOMAIN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2 mb-3 leading-tight">
              More Than Just <br />
              <span className="text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                Code.
              </span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We believe in consistent practice, healthy competition, and collaborative learning.
              From beginners to grandmasters, we grow together.
            </p>
          </div>

          {/* Part 2: What We Do */}
          <div className="lg:col-span-4 relative bg-slate-950/50 backdrop-blur-lg rounded-2xl border border-slate-800/70 p-6 shadow-md">
            {/* Glowing 3D Cube Icon */}
            <div className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <div className="w-4 h-4 border-2 border-blue-400 rotate-45" />
            </div>

            <h3 className="text-xs font-bold tracking-widest text-slate-300 uppercase mb-5">
              WHAT WE DO
            </h3>

            <ul className="space-y-3.5">
              {activities.map((activity, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300 text-xs sm:text-sm font-medium">
                    {activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Part 3: Platforms We Compete On */}
          <div className="lg:col-span-4 bg-slate-950/50 backdrop-blur-lg rounded-2xl border border-slate-800/70 p-6 shadow-md">
            <h3 className="text-xs font-bold tracking-widest text-slate-300 uppercase mb-5">
              PLATFORMS WE COMPETE ON
            </h3>

            <div className="grid grid-cols-4 gap-3">
              {platforms.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.name}`}
                  className="flex flex-col items-center gap-2 group cursor-pointer transition-transform active:scale-95"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center group-hover:border-blue-500/60 group-hover:bg-blue-950/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 shadow-sm overflow-hidden">
                    {item.type === 'svg' ? (
                      <item.SvgIcon />
                    ) : (
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="h-full w-full object-contain filter drop-shadow brightness-110"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-300 transition-colors text-center truncate w-full">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}