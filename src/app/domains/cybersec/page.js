"use client";

import { useState } from "react";
// Remove global blog navbar, use cybersecurity local navbar instead
import CyberNavbar from "../../components/cybersec/Navbar"; 
import CyberHero from "../../components/cybersec/CyberHero";
import ProjectCard from "../../components/cybersec/ProjectCard";
import AchievementsSection from "../../components/cybersec/AchievementsSection";
import TeamSection from "../../components/cybersec/TeamSection";
import CyberIntroOverlay from "../../components/cybersec/CyberIntroOverlay";

// Sample CyberSec Projects Data
const CYBER_PROJECTS = [
  {
    name: "Aegis-IDS",
    tagline: "real-time packet interception & deep anomaly analysis",
    category: "Network Defense",
    description:
      "A high-throughput Intrusion Detection System built using eBPF and Rust for sub-millisecond network traffic classification and automated zero-day signature mitigation.",
    techStack: ["Rust", "eBPF", "Wireshark", "Linux Kernel", "Docker"],
    stars: 142,
    githubUrl: "https://github.com/pclub-iiti",
    demoUrl: "https://pclub.iiti.ac.in",
    contributors: [
      { name: "Karan Joshi", role: "Lead", github: "#", linkedin: "#" },
      { name: "Aarav Sharma", role: "Contributor", github: "#", linkedin: "#" },
    ],
  },
  {
    name: "ShadowPwn Suite",
    tagline: "automated memory corruption & ROP exploit generator",
    category: "Binary Exploitation",
    description:
      "A framework designed for CTF players and binary auditors that inspects ELF binaries, calculates stack offsets, extracts gadgets, and crafts weaponized ROP chains.",
    techStack: ["Python", "pwntools", "GDB", "Ghidra", "Assembly"],
    stars: 98,
    githubUrl: "https://github.com/pclub-iiti",
    demoUrl: "https://pclub.iiti.ac.in",
    contributors: [
      { name: "Vikram Singh", role: "Author", github: "#", linkedin: "#" },
    ],
  },
  {
    name: "WebSentry Scanner",
    tagline: "API vulnerability auditor & JWT tamper engine",
    category: "Web Security",
    description:
      "A lightweight CLI security scanner that detects IDOR vulnerabilities, broken access controls, and flawed cryptographic implementations across GraphQL and REST endpoints.",
    techStack: ["Go", "Burp Suite API", "Zap", "Docker"],
    stars: 87,
    githubUrl: "https://github.com/pclub-iiti",
    demoUrl: "https://pclub.iiti.ac.in",
    contributors: [
      { name: "Neha Agarwal", role: "Security Dev", github: "#", linkedin: "#" },
      { name: "Rohan Patel", role: "Dev", github: "#", linkedin: "#" },
    ],
  },
  {
    name: "Cortex Forensics",
    tagline: "cross-platform memory triage & timeline reconstruction",
    category: "Digital Forensics",
    description:
      "An automated volatility-based digital forensic toolkit for rapid memory dump parsing, malicious DLL injection identification, and rootkit behavior reconstruction.",
    techStack: ["Python", "Volatility 3", "YARA", "Rekall"],
    stars: 64,
    githubUrl: "https://github.com/pclub-iiti",
    demoUrl: "https://pclub.iiti.ac.in",
    contributors: [
      { name: "Sneha Sen", role: "Researcher", github: "#", linkedin: "#" },
    ],
  },
];

// Sample Team Data
const CYBER_MEMBERS = [
  {
    name: "Karan Joshi",
    domainRole: "Domain Head & CTF Captain",
    yearDept: "B.Tech 4th Year, CSE",
    roleType: "Lead",
    specialization: "Binary Exploitation & Linux Kernel Hardening",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    ctftime: "https://ctftime.org",
    ctfHandles: [
      { platform: "CTFtime", username: "0xK4r4n" },
      { platform: "HTB", username: "Rank #124" },
    ],
  },
  {
    name: "Vikram Singh",
    domainRole: "Co-Head & Reverse Engineer",
    yearDept: "B.Tech 3rd Year, EE",
    roleType: "Lead",
    specialization: "Malware Analysis, Ghidra & Firmware Reverse Engineering",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    ctftime: "https://ctftime.org",
    ctfHandles: [
      { platform: "TryHackMe", username: "v1kr4m_re" },
      { platform: "Pwnable", username: "RootSeeker" },
    ],
  },
  {
    name: "Sneha Patel",
    domainRole: "Cryptanalyst & Security Researcher",
    yearDept: "B.Tech 3rd Year, CSE",
    roleType: "Core Member",
    specialization: "Post-Quantum Cryptography & Zero-Knowledge Proofs",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    ctftime: "https://ctftime.org",
    ctfHandles: [
      { platform: "CryptoHack", username: "sn3h4_c" },
      { platform: "CTFtime", username: "PClub_Cipher" },
    ],
  },
  {
    name: "Aditya Kumar",
    domainRole: "Web Security Lead",
    yearDept: "B.Tech 2nd Year, CSE",
    roleType: "Core Member",
    specialization: "Cloud Security, IAM Pentesting & OWASP Top 10",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    ctftime: "https://ctftime.org",
    ctfHandles: [
      { platform: "PortSwigger", username: "Certified" },
      { platform: "Bugcrowd", username: "HackerOne MVP" },
    ],
  },
  {
    name: "Rahul Verma",
    domainRole: "CTF Player & Toolsmith",
    yearDept: "B.Tech 2nd Year, ME",
    roleType: "Active Member",
    specialization: "Network Forensics, Wireshark & Defensive Engineering",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    ctftime: "https://ctftime.org",
    ctfHandles: [
      { platform: "HTB", username: "ByteGhost" },
      { platform: "TryHackMe", username: "Top 1%" },
    ],
  },
];

export default function CybersecurityPage() {
  const [replayIntro, setReplayIntro] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* 🚀 Cinematic Intro Animation Overlay */}
      <CyberIntroOverlay
        force={replayIntro}
        onComplete={() => setReplayIntro(false)}
      />

      {/* Domain Specific Floating Island Navbar */}
      <CyberNavbar />

      {/* SECTION: Overview / Hero */}
      <section id="overview">
        <CyberHero />
      </section>

      {/* Replay Intro Trigger Button */}
      <div className="flex justify-center -mt-6 mb-8 relative z-20">
        <button
          onClick={() => setReplayIntro(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 shadow-md"
        >
          <span>▶ Replay Cyber Intro</span>
        </button>
      </div>

      {/* SECTION: Featured Projects */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-3">
              <span>// ARSENAL_</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              Featured Security Projects
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Open-source offensive and defensive security tooling engineered by members of the PClub Cybersecurity Wing.
            </p>
          </div>
          <a
            href="https://github.com/pclub-iiti"
            target="_blank"
            rel="noreferrer"
            className="mt-4 md:mt-0 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All on GitHub</span>
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CYBER_PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* 🏆 SECTION: Club Achievements */}
      <section id="achievements" className="border-t border-slate-800/80">
        <AchievementsSection />
      </section>

      {/* SECTION: Team Spotlight */}
      <section id="team" className="border-t border-slate-800/80">
        <TeamSection members={CYBER_MEMBERS} />
      </section>

      {/* SECTION: Call to Action / Terminal Join Banner */}
      <section className="py-16 px-4 max-w-5xl mx-auto mb-20">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 text-center overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-4">
              Ready to Capture Your First Flag?
            </h3>
            <p className="text-sm sm:text-base font-mono text-slate-400 max-w-xl mx-auto mb-8">
              Whether you are an aspiring reverse engineer, penetration tester, or curious programmer, PClub IIT Indore invites you to hack with us.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 text-white font-mono font-bold text-sm transition-all"
              >
                Join PClub Discord_
              </a>
              <a
                href="/blog"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-sm transition-all"
              >
                Read CyberSec Writeups
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}