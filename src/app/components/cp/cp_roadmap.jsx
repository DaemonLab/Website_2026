"use client";

import { useEffect, useRef, useState } from "react";

/* =====================================================================
   Competitive Programming roadmap, drawn as a flowchart.
   Stages 1-3 are sequential, stage 4 splits into three parallel tracks
   that merge again, then stages 5-6 finish the path.
   Click any card to expand practice tips and resources.
   All content lives in the data objects below; edit them freely.
   ===================================================================== */

// ---- Theme (matches the IIT Indore club navy/blue) ----
const CARD_BG = "rgba(5, 15, 40, 0.78)";
const BORDER = "rgba(47, 107, 255, 0.28)";
const ACCENT = "#2f6bff";
const ACCENT_TEXT = "#6ea2ff";
const LIGHT = "#8fd3ff";
const MUTED = "#c9d8f5";
const SOFT = "#9db4de";

// ---------------------------------------------------------------------
// Content
// "level" is the approximate Codeforces rating you should be aiming for.
// ---------------------------------------------------------------------
const FOUNDATION = [
  {
    id: "basics",
    step: "01",
    title: "Programming Basics",
    level: "Rating 0 – 800",
    desc: "Get comfortable in one language (C++ is the standard for CP) and solve your first problems.",
    topics: ["C++ syntax", "Fast I/O", "Loops & conditions", "Functions", "Arrays", "Basic math"],
    practice: [
      "Solve 30–50 problems rated 800 on Codeforces",
      "Finish the Introductory Problems section on CSES",
      "Join one beginner contest (Div. 4 / Starters) every week",
    ],
    resources: [
      { label: "Codeforces Problemset", href: "https://codeforces.com/problemset" },
      { label: "CSES Problem Set", href: "https://cses.fi/problemset/" },
    ],
    milestone: "You can read a problem, code it cleanly and get Accepted on 800-rated problems.",
  },
  {
    id: "ds",
    step: "02",
    title: "Data Structures & STL",
    level: "Rating 800 – 1000",
    desc: "Learn the containers you will use in almost every solution, and how to judge if a solution is fast enough.",
    topics: ["Big-O complexity", "vector & string", "set & map", "stack, queue, deque", "priority_queue", "pair & sort"],
    practice: [
      "Solve 40+ problems rated 800–1000, tagged implementation, sortings or data structures",
      "Practise estimating time complexity before you submit",
    ],
    resources: [
      { label: "USACO Guide", href: "https://usaco.guide/" },
      { label: "CSES Sorting & Searching", href: "https://cses.fi/problemset/" },
    ],
    milestone: "You pick the right container without thinking and avoid Time Limit Exceeded on easy problems.",
  },
  {
    id: "algos",
    step: "03",
    title: "Core Algorithms",
    level: "Rating 1000 – 1200",
    desc: "The techniques behind most Div. 2 A–C problems.",
    topics: ["Binary search", "Two pointers", "Prefix sums", "Recursion & backtracking", "Bit manipulation", "GCD, sieve, modular arithmetic"],
    practice: [
      "Solve 10–15 problems per technique before moving on",
      "Start virtual contests: Div. 3 first, then Div. 2",
    ],
    resources: [
      { label: "cp-algorithms", href: "https://cp-algorithms.com/" },
      { label: "Codeforces Contests", href: "https://codeforces.com/contests" },
    ],
    milestone: "You regularly solve the first three problems of a Div. 2 round.",
  },
];

const TRACKS = [
  {
    id: "dp",
    step: "4A",
    title: "Greedy & DP",
    level: "Rating 1200 – 1600",
    desc: "Optimal choices and overlapping subproblems.",
    topics: ["Greedy & proofs", "1D / 2D DP", "Knapsack", "LIS & LCS", "Divide & conquer"],
    practice: [
      "Work through the CSES Dynamic Programming section",
      "Do the AtCoder Educational DP Contest",
      "Always write the DP state and transition on paper first",
    ],
    resources: [
      { label: "CSES DP", href: "https://cses.fi/problemset/" },
      { label: "AtCoder DP Contest", href: "https://atcoder.jp/contests/dp" },
    ],
    milestone: "You can define a DP state on your own for standard problems.",
  },
  {
    id: "graphs",
    step: "4B",
    title: "Graphs",
    level: "Rating 1200 – 1700",
    desc: "Networks, paths and connectivity.",
    topics: ["BFS & DFS", "Dijkstra", "DSU", "MST", "Topological sort", "Tree basics"],
    practice: [
      "Work through CSES Graph Algorithms",
      "Practise turning a word problem into a graph",
    ],
    resources: [
      { label: "CSES Graphs", href: "https://cses.fi/problemset/" },
      { label: "cp-algorithms Graphs", href: "https://cp-algorithms.com/" },
    ],
    milestone: "You spot graph problems quickly and know which algorithm fits.",
  },
  {
    id: "math",
    step: "4C",
    title: "Math & Strings",
    level: "Rating 1200 – 1700",
    desc: "Number theory, counting and text processing.",
    topics: ["Combinatorics", "Modular inverse", "Primes & divisors", "Hashing", "KMP / Z-function", "Tries"],
    practice: [
      "Work through CSES Mathematics and String Algorithms",
      "Learn nCr mod p and fast exponentiation by heart",
    ],
    resources: [
      { label: "cp-algorithms Number Theory", href: "https://cp-algorithms.com/" },
      { label: "CSES Mathematics", href: "https://cses.fi/problemset/" },
    ],
    milestone: "Counting and modular-arithmetic problems no longer feel like magic.",
  },
];

const ADVANCED = {
  id: "advanced",
  step: "05",
  title: "Advanced Topics",
  level: "Rating 1600 – 1900+",
  desc: "The tools that separate Expert from Specialist.",
  topics: ["Segment tree", "Fenwick tree", "LCA & binary lifting", "Bitmask & digit DP", "DP on trees", "Network flow", "Game theory", "Geometry"],
  practice: [
    "Work through CSES Range Queries and Tree Algorithms",
    "Read editorials for problems you could not solve, then re-solve them later",
  ],
  resources: [
    { label: "USACO Guide (Gold / Platinum)", href: "https://usaco.guide/" },
    { label: "cp-algorithms", href: "https://cp-algorithms.com/" },
  ],
  milestone: "You can solve Div. 2 D and E problems in contest time.",
};

const CONTEST = {
  id: "contest",
  step: "06",
  title: "Contest Mastery",
  level: "Team & long-term goals",
  desc: "Turn your skills into results: rated rounds, team contests and interview-level speed.",
  topics: ["Codeforces rounds", "AtCoder ABC / ARC", "ICPC-style team contests", "Speed & debugging", "Upsolving"],
  practice: [
    "Compete in every rated round you can",
    "Practise team contests with your club mates",
    "Review your mistakes in a log after every contest",
  ],
  resources: [
    { label: "Codeforces Contests", href: "https://codeforces.com/contests" },
    { label: "AtCoder", href: "https://atcoder.jp/" },
  ],
  milestone: "You compete confidently and keep improving your rating.",
};

const LOOP = ["Compete", "Upsolve", "Find weak topics", "Revisit"];

// ---------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------

// Fades and slides an element in once it scrolls into view.
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const lineStyle = {
  background: `linear-gradient(${ACCENT}, ${LIGHT})`,
  boxShadow: "0 0 10px rgba(47, 107, 255, 0.7)",
};

// Vertical arrow with a small light travelling down it.
function Connector({ height = 56 }) {
  return (
    <div
      className="relative mx-auto w-[2px]"
      style={{ height, ...lineStyle }}
      aria-hidden="true"
    >
      <span
        className="cp-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
        style={{ background: "#fff", boxShadow: `0 0 10px ${LIGHT}` }}
      />
      <span
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -8,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `8px solid ${LIGHT}`,
        }}
      />
    </div>
  );
}

// Horizontal bar segment used where the flow splits or merges.
// pos: 0 = left column, 1 = middle, 2 = right.
function barSides(pos) {
  return { left: pos === 0 ? "50%" : 0, right: pos === 2 ? "50%" : 0 };
}

function StageCard({ stage, open, onToggle }) {
  const panelId = `${stage.id}-panel`;

  return (
    <div
      className="rounded-2xl p-5 transition-[border-color,box-shadow] duration-300"
      style={{
        background: CARD_BG,
        border: `1px solid ${open ? ACCENT : BORDER}`,
        boxShadow: open
          ? "0 0 28px rgba(47, 107, 255, 0.35)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold"
          style={{
            background: "rgba(47, 107, 255, 0.14)",
            border: `1.5px solid ${ACCENT}`,
            color: LIGHT,
            boxShadow: "0 0 12px rgba(47, 107, 255, 0.35)",
          }}
        >
          {stage.step}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[16px] font-semibold text-white">
              {stage.title}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide"
              style={{
                color: LIGHT,
                border: `1px solid ${BORDER}`,
                background: "rgba(47, 107, 255, 0.10)",
              }}
            >
              {stage.level}
            </span>
          </span>
          <span
            className="mt-1.5 block text-[13.5px] leading-relaxed"
            style={{ color: SOFT }}
          >
            {stage.desc}
          </span>
        </span>

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT_TEXT}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul className="mt-4 flex flex-wrap gap-2">
        {stage.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md px-2.5 py-1 text-[12px]"
            style={{
              color: MUTED,
              background: "rgba(47, 107, 255, 0.10)",
              border: `1px solid ${BORDER}`,
            }}
          >
            {topic}
          </li>
        ))}
      </ul>

      {/* Expandable details */}
      <div
        id={panelId}
        aria-hidden={!open}
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 pt-5 text-[13.5px]">
            <div>
              <h4
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: ACCENT_TEXT }}
              >
                Practice
              </h4>
              <ul className="space-y-1.5">
                {stage.practice.map((item) => (
                  <li key={item} className="flex gap-2" style={{ color: MUTED }}>
                    <span style={{ color: LIGHT }} aria-hidden="true">
                      ▹
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: ACCENT_TEXT }}
              >
                Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {stage.resources.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? 0 : -1}
                    className="rounded-full px-3 py-1 text-[12px] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
                    style={{
                      color: LIGHT,
                      border: `1px solid ${ACCENT}`,
                      background: "rgba(47, 107, 255, 0.12)",
                    }}
                  >
                    {r.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <p
              className="border-l-2 pl-3 leading-relaxed"
              style={{ borderColor: ACCENT, color: MUTED }}
            >
              <span className="font-semibold" style={{ color: LIGHT }}>
                Milestone:{" "}
              </span>
              {stage.milestone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// The roadmap
// ---------------------------------------------------------------------
export default function CPRoadmap() {
  const [openId, setOpenId] = useState("basics");
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section
      id="roadmap"
      className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:px-8"
    >
      <style>{`
        @keyframes cp-flow {
          0%   { top: -4px; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: calc(100% - 4px); opacity: 0; }
        }
        .cp-dot { animation: cp-flow 2.4s linear infinite; }
        @keyframes cp-pulse {
          0%, 100% { box-shadow: 0 0 14px rgba(47,107,255,0.5); }
          50%      { box-shadow: 0 0 30px rgba(143,211,255,0.8); }
        }
        .cp-start { animation: cp-pulse 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cp-dot { animation: none; opacity: 0; }
          .cp-start { animation: none; }
        }
      `}</style>

      {/* Heading */}
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{
            color: LIGHT,
            border: `1px solid ${BORDER}`,
            background: "rgba(47, 107, 255, 0.10)",
          }}
        >
          Roadmap
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Competitive Programming{" "}
          <span style={{ color: LIGHT }}>Roadmap</span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SOFT }}>
          A step-by-step path from your first accepted solution to rated
          contests. Ratings are approximate Codeforces targets. Click any
          step for practice tips and resources.
        </p>
      </Reveal>

      {/* Start */}
      <Reveal className="flex justify-center">
        <span
          className="cp-start rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, #1f4fa8)`,
            border: `1px solid ${LIGHT}`,
          }}
        >
          Start here
        </span>
      </Reveal>
      <Connector height={40} />

      {/* Stages 1-3 */}
      {FOUNDATION.map((stage, i) => (
        <div key={stage.id}>
          <Reveal className="mx-auto max-w-2xl" delay={60}>
            <StageCard
              stage={stage}
              open={openId === stage.id}
              onToggle={() => toggle(stage.id)}
            />
          </Reveal>
          <Connector height={i === FOUNDATION.length - 1 ? 44 : 56} />
        </div>
      ))}

      {/* Stage 4: three parallel tracks */}
      <Reveal className="mb-6 text-center">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[12px] font-medium"
          style={{
            color: LIGHT,
            border: `1px dashed ${ACCENT}`,
            background: "rgba(47, 107, 255, 0.08)",
          }}
        >
          Choose your track, or learn all three in any order
        </span>
      </Reveal>

      <div className="grid grid-cols-1 items-stretch md:grid-cols-3">
        {TRACKS.map((track, i) => (
          <div key={track.id} className="flex flex-col px-0 md:px-2">
            {/* split connector (desktop) */}
            <div className="relative hidden h-10 md:block" aria-hidden="true">
              <span
                className="absolute top-0 h-[2px]"
                style={{ ...barSides(i), background: ACCENT, boxShadow: "0 0 8px rgba(47,107,255,0.7)" }}
              />
              <span
                className="absolute bottom-0 left-1/2 top-0 w-[2px] -translate-x-1/2"
                style={lineStyle}
              />
            </div>
            {/* small connector between stacked cards (mobile) */}
            {i > 0 && (
              <div className="py-1 md:hidden">
                <Connector height={28} />
              </div>
            )}

            <Reveal delay={i * 90}>
              <StageCard
                stage={track}
                open={openId === track.id}
                onToggle={() => toggle(track.id)}
              />
            </Reveal>

            {/* merge connector (desktop): stretches so all bars line up */}
            <div
              className="relative hidden min-h-10 flex-1 md:block"
              aria-hidden="true"
            >
              <span
                className="absolute bottom-0 left-1/2 top-0 w-[2px] -translate-x-1/2"
                style={lineStyle}
              />
              <span
                className="absolute bottom-0 h-[2px]"
                style={{ ...barSides(i), background: ACCENT, boxShadow: "0 0 8px rgba(47,107,255,0.7)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <Connector height={44} />

      {/* Stages 5-6 */}
      <Reveal className="mx-auto max-w-2xl" delay={60}>
        <StageCard
          stage={ADVANCED}
          open={openId === ADVANCED.id}
          onToggle={() => toggle(ADVANCED.id)}
        />
      </Reveal>
      <Connector height={56} />

      <Reveal className="mx-auto max-w-2xl" delay={60}>
        <StageCard
          stage={CONTEST}
          open={openId === CONTEST.id}
          onToggle={() => toggle(CONTEST.id)}
        />
      </Reveal>

      {/* Improvement loop */}
      <Reveal className="mx-auto mt-10 max-w-2xl" delay={80}>
        <div
          className="rounded-2xl px-5 py-4 text-center"
          style={{ border: `1px dashed ${ACCENT}`, background: "rgba(47, 107, 255, 0.06)" }}
        >
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: ACCENT_TEXT }}
          >
            Then repeat, this loop is how ratings grow
          </p>
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            {LOOP.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-[12.5px] font-medium"
                  style={{
                    color: "#fff",
                    background: "rgba(47, 107, 255, 0.18)",
                    border: `1px solid ${ACCENT}`,
                  }}
                >
                  {item}
                </span>
                <span style={{ color: LIGHT }} aria-hidden="true">
                  {i < LOOP.length - 1 ? "→" : "↻"}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}