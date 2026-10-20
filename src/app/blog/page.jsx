"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Home_nav from "./components/Home_nav";
import BlogCard from "./components/BlogCard";
import BlogFilter from "./components/BlogFilter";
import Footer from "./components/Footer";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    slug: "getting-started-with-web3",
    title: "Getting Started with Web3: A Beginner's Roadmap for 2024",
    excerpt:
      "Dive into the world of decentralised applications, smart contracts, and blockchain fundamentals. This guide walks you through everything you need to start building on Ethereum.",
    tags: ["Web3", "Development"],
    coverImage: null,
    author: { name: "Aryan Sharma", role: "3rd Year, CSE", avatar: null },
    date: "Sep 12, 2026",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "llm-fine-tuning-guide",
    title: "Fine-Tuning LLMs on Custom Datasets: Practical Walkthrough",
    excerpt:
      "Learn how to fine-tune open-source large language models using LoRA and QLoRA adapters on your own domain-specific dataset with limited GPU resources.",
    tags: ["AI/ML"],
    coverImage: null,
    author: { name: "Priya Menon", role: "4th Year, EE", avatar: null },
    date: "Sep 18, 2026",
    readTime: "12 min read",
  },
  {
    id: 3,
    slug: "ctf-buffer-overflow-exploit",
    title: "Cracking CTF Challenges: Buffer Overflow Exploitation Deep Dive",
    excerpt:
      "A step-by-step breakdown of a real CTF challenge involving stack-based buffer overflows, return-oriented programming (ROP) chains, and ASLR bypass techniques.",
    tags: ["CyberSecurity"],
    coverImage: null,
    author: { name: "Karan Joshi", role: "3rd Year, CSE", avatar: null },
    date: "Sep 5, 2026",
    readTime: "15 min read",
  },
  {
    id: 4,
    slug: "system-design-url-shortener",
    title: "Designing a URL Shortener at Scale: From 0 to 1 Billion Requests",
    excerpt:
      "A comprehensive system design walkthrough covering consistent hashing, caching strategies, database sharding, and observability for a URL shortening service.",
    tags: ["System Design", "Development"],
    coverImage: null,
    author: { name: "Neha Agarwal", role: "4th Year, CSE", avatar: null },
    date: "Aug 28, 2026",
    readTime: "10 min read",
  },
  {
    id: 5,
    slug: "cp-segment-trees",
    title: "Mastering Segment Trees: From Basics to Lazy Propagation",
    excerpt:
      "A thorough guide to segment trees with detailed explanations, visualisations, and competitive programming problems to practice range queries and point updates.",
    tags: ["Competitive Programming"],
    coverImage: null,
    author: { name: "Rahul Verma", role: "2nd Year, CSE", avatar: null },
    date: "Sep 22, 2026",
    readTime: "18 min read",
  },
  {
    id: 6,
    slug: "contributing-to-open-source",
    title: "Your First Open Source PR: A Complete Contributor's Guide",
    excerpt:
      "From forking a repository to getting your pull request merged — a practical, anxiety-free guide to contributing to large open source projects like Linux and VS Code.",
    tags: ["Open Source", "Development"],
    coverImage: null,
    author: { name: "Aditya Kumar", role: "3rd Year, CSE", avatar: null },
    date: "Sep 1, 2026",
    readTime: "6 min read",
  },
  {
    id: 7,
    slug: "transformers-from-scratch",
    title: "Building Transformers from Scratch in PyTorch",
    excerpt:
      "Understand attention mechanisms and the transformer architecture by implementing multi-head attention, positional encoding, and the encoder-decoder stack from zero.",
    tags: ["AI/ML"],
    coverImage: null,
    author: { name: "Sneha Patel", role: "4th Year, EE", avatar: null },
    date: "Aug 15, 2026",
    readTime: "20 min read",
  },
  {
    id: 8,
    slug: "web3-smart-contract-security",
    title: "Common Smart Contract Vulnerabilities and How to Avoid Them",
    excerpt:
      "Explore reentrancy attacks, integer overflows, and access control flaws with real Solidity examples and best practices to write production-grade secure contracts.",
    tags: ["Web3", "CyberSecurity"],
    coverImage: null,
    author: { name: "Vikram Singh", role: "3rd Year, ME", avatar: null },
    date: "Sep 10, 2026",
    readTime: "11 min read",
  },
  {
    id: 9,
    slug: "competitive-programming-roadmap",
    title: "The IIT Student's Roadmap to Competitive Programming",
    excerpt:
      "A semester-by-semester structured roadmap covering DSA topics, online judges, contest strategy, and how to go from beginner to Codeforces Expert in 18 months.",
    tags: ["Competitive Programming"],
    coverImage: null,
    author: { name: "Deepak Nair", role: "2nd Year, CSE", avatar: null },
    date: "Jul 30, 2026",
    readTime: "9 min read",
  },
];

// ─── Animated Particle Background ────────────────────────────────────────────
function ParticleField({ count = 50 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[65vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(99,102,241,0.08),transparent)]" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <ParticleField count={45} />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Programming Club · IIT Indore
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-white">PClub </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Blog
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Deep dives, tutorials, and insights from the brightest minds at IIT Indore —
          covering AI, Web3, CyberSec, Competitive Programming, and beyond.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "50+", label: "Articles" },
            { value: "20+", label: "Contributors" },
            { value: "5", label: "Domains" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-slate-600">scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchTag = activeTag === "All" || post.tags.includes(activeTag);
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchSearch;
    });
  }, [activeTag, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Home_nav />

      {/* Hero */}
      <HeroSection />

      {/* Blog Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter */}
        <div className="mb-10">
          <BlogFilter
            activeTag={activeTag}
            onTagChange={setActiveTag}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Result count */}
        <motion.p
          key={`${activeTag}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-500 mb-6"
        >
          {filteredPosts.length === 0
            ? "No articles found."
            : `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""}${activeTag !== "All" ? ` in "${activeTag}"` : ""}${searchQuery ? ` matching "${searchQuery}"` : ""}`}
        </motion.p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${activeTag}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-slate-300 font-semibold mb-1">No articles found</h3>
              <p className="text-sm text-slate-500">
                Try a different search term or category filter.
              </p>
              <button
                onClick={() => { setActiveTag("All"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 text-sm text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
