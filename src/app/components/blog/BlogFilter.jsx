"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const TAGS = [
  "All",
  "Development",
  "CyberSecurity",
  "AI/ML",
  "Competitive Programming",
  "Web3",
  "Open Source",
  "System Design",
];

export default function BlogFilter({ activeTag, onTagChange, searchQuery, onSearchChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full space-y-5"
    >
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
            focused
              ? "ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/10"
              : "ring-1 ring-slate-700"
          }`}
        />
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className={`w-4 h-4 transition-colors duration-300 ${
              focused ? "text-cyan-400" : "text-slate-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search articles, topics, authors…"
          className="w-full bg-slate-900/80 backdrop-blur-sm text-slate-200 placeholder-slate-500 text-sm rounded-xl pl-11 pr-10 py-3.5 outline-none transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-3 flex items-center px-1 text-slate-500 hover:text-slate-300"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {TAGS.map((tag, i) => {
          const isActive = activeTag === tag;
          return (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagChange(tag)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-600"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTag"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tag}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
