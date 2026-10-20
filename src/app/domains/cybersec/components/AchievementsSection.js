"use client";

import { motion } from "framer-motion";

// Clean SVG Icons for achievements
const TrophyIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2 0h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const MedalIcon = () => (
  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldLockIcon = () => (
  <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TargetFlagIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const CertificateIcon = () => (
  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ACHIEVEMENTS_DATA = [
  {
    year: "2026",
    badge: "1st Place · Gold",
    title: "Inter-IIT Tech Meet CTF Champions",
    event: "Inter-IIT Technology Meet",
    description:
      "Secured 1st Place out of 23 participating Indian Institutes of Technology in the Flagship Cybersecurity CTF, solving real-world challenges in heap exploitation, kernel mitigation, and side-channel cryptanalysis.",
    stats: "Gold Medal · Score: 3,450 pts",
    icon: <TrophyIcon />,
    link: "https://pclub.iiti.ac.in",
  },
  {
    year: "2025",
    badge: "Global Top 50",
    title: "CTFtime Global Leaderboard Top 50",
    event: "International CTF Circuit",
    description:
      "Ranked among the top 50 competitive hacking teams worldwide on CTFtime after podium finishes in Google CTF, DEF CON Quals, and VolgaCTF over 12 consecutive months.",
    stats: "Top 1% Worldwide · 4,200+ Teams",
    icon: <TargetFlagIcon />,
    link: "https://ctftime.org",
  },
  {
    year: "2025",
    badge: "Hall of Fame",
    title: "Critical CVE Discoveries & Responsible Disclosures",
    event: "Open-Source Security Research",
    description:
      "Discovered and responsibly disclosed 3 critical Common Vulnerabilities and Exposures (CVEs) in widely deployed enterprise Kubernetes operators and cloud gateway proxies.",
    stats: "3 CVEs Assigned · Hall of Fame",
    icon: <ShieldLockIcon />,
    link: "https://cve.mitre.org",
  },
  {
    year: "2024",
    badge: "Winner · 1st Place",
    title: "Hardware & IoT Pentesting Challenge",
    event: "National Cyber Security Conclave",
    description:
      "Extracted firmware via JTAG, reverse engineered proprietary CAN bus automotive communication, and successfully injected arbitrary commands to claim the national IoT security title.",
    stats: "1st / 120 Teams · Hardware Lab",
    icon: <MedalIcon />,
    link: "https://pclub.iiti.ac.in",
  },
  {
    year: "2024",
    badge: "Published Research",
    title: "Paper on eBPF Kernel Defense Isolation",
    event: "International Conference on Security & Privacy",
    description:
      "Authored and published research detailing runtime bypass protection mechanisms for containerized microservices using Linux eBPF security hooks and memory introspection.",
    stats: "Peer-Reviewed · IEEE Citation",
    icon: <CertificateIcon />,
    link: "https://ieeexplore.ieee.org",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>// HALL_OF_VALOR_</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight mb-4">
          Club Achievements & Honors
        </h2>
        <p className="text-sm sm:text-base font-mono text-slate-400 max-w-2xl mx-auto">
          From winning prestigious national CTFs to discovering zero-days and publishing cutting-edge research, here is how PClub Cybersecurity represents IIT Indore on the global stage.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Central Neon Line on Desktop (shifts to left on mobile) */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/10 via-cyan-500/50 to-indigo-600/10 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />

        {/* Achievement Items */}
        <div className="space-y-12 md:space-y-16">
          {ACHIEVEMENTS_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.title}
                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
              >
                {/* Center Timeline Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>

                {/* Left Side Content Container */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  {isLeft ? (
                    <motion.div
                      // 👉 Slide from outer left towards the center!
                      initial={{ opacity: 0, x: -90 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 16,
                        delay: 0.1,
                      }}
                      className="group relative p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]"
                    >
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/40 transition-colors">
                            {item.icon}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            {item.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/80 mb-3">
                        // {item.event}
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{item.stats}</span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/link"
                        >
                          <span>Details</span>
                          <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Right Side Content Container */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  {!isLeft ? (
                    <motion.div
                      // 👉 Slide from outer right towards the center!
                      initial={{ opacity: 0, x: 90 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 16,
                        delay: 0.1,
                      }}
                      className="group relative p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]"
                    >
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/40 transition-colors">
                            {item.icon}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            {item.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/80 mb-3">
                        // {item.event}
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{item.stats}</span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/link"
                        >
                          <span>Details</span>
                          <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}