"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 transition-all duration-500 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out border ${
          isScrolled
            ? "w-full max-w-2xl px-5 py-2.5 rounded-full bg-transparent backdrop-blur-md border-blue-500/30 shadow-[0_0_25px_rgba(37,99,235,0.2)]"
            : "w-full max-w-7xl px-8 py-4 rounded-2xl bg-transparent border-transparent"
        }`}
      >
        {/* Brand Logo - Animates & scales seamlessly inside the navbar */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md group-hover:scale-105 transition-transform">
            &lt;/&gt;
          </div>
          <motion.span
            className="font-bold text-white tracking-wide text-sm sm:text-base"
            animate={{ scale: isScrolled ? 0.95 : 1 }}
            transition={{ duration: 0.3 }}
          >
            P CLUB <span className="text-blue-400 font-normal">IITI</span>
          </motion.span>
        </Link>

        {/* Central Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Home
          </Link>

          {/* Domains Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1">
              Domains
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-blue-400" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 rounded-xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col z-50"
                >
                  <Link
                    href="/domains/cp"
                    className="px-4 py-2 text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 hover:border-l-2 hover:border-blue-500 transition-all"
                  >
                    Competitive Programming
                  </Link>
                  <Link
                    href="/domains/cybersec"
                    className="px-4 py-2 text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-purple-600/20 hover:border-l-2 hover:border-purple-500 transition-all"
                  >
                    Cybersecurity
                  </Link>
                  <Link
                    href="/domains/software"
                    className="px-4 py-2 text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-cyan-600/20 hover:border-l-2 hover:border-cyan-500 transition-all"
                  >
                    Software Development
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Explore Domains CTA - Disappears on Scroll */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block overflow-hidden"
            >
              <a
                href="#domains"
                className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all whitespace-nowrap block"
              >
                Explore Domains
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}