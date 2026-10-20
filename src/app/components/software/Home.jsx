"use client";

import React from "react";
import Link from "next/link";
/* =====================================================================
   Glassmorphism Home Button (Navbar-Height Matched)
   Height: 48px (h-12) / 56px (sm:h-14)
   ===================================================================== */

export default function FloatingHomeButton() {

  return (
    <div className="fixed top-4 right-4 z-50 sm:top-5 sm:right-6">
      <Link
        href="/"
        /*
          Height matches navbar: h-12 (48px) mobile, sm:h-14 (56px) desktop.
          Glassmorphism styling:
          - bg-white/[0.07] + backdrop-blur-xl + backdrop-saturate-150
          - border border-white/20 with subtle top-highlight gradient
        */
        className="group relative flex h-12 items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.07] px-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/50 hover:bg-white/[0.12] hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.25)] active:scale-95 sm:h-14"
      >
        {/* Subtle Inner Glass Highlight Accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Home Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>

        {/* Label */}
        <span className="text-sm font-semibold tracking-wide text-white/90 transition-colors group-hover:text-white">
          Home
        </span>
      </Link>
    </div>
  );
}