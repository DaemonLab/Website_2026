"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, splitText } from "animejs";
import Club3DLogo from "./club3Dlogo";

/* =====================================================================
   Homepage hero: a text-only section meant to sit on top of your
   existing background (BinaryRain, the 3D disc, etc. — render those
   separately, underneath this).

   Heading: each word's characters bounce and spin in a loop (anime.js).
   Colours stay inside the site's navy/blue theme; the three words are
   tinted in three different blues to hint at the three domains.
   ===================================================================== */


// ---- Theme ----
import { Orbitron } from "next/font/google";

const headingFont = Orbitron({
  subsets: ["latin"],
  weight: ["700"], // only load weights you use
  display: "swap",
});

const BORDER = "rgba(47, 107, 255, 0.28)";
const LIGHT = "#8fd3ff"; // sky blue — "CODE."
const WHITE = "#f4f8ff"; // neutral — "BUILD."
const ROYAL = "#6ea2ff"; // royal/readable blue — "SECURE."
const SOFT = "#9db4de";

// ---- Copy ----
const EYEBROW = "Programming Club · IIT Indore";
const WORDS = [
  { text: "CODE.", color: LIGHT },
  { text: "BUILD.", color: WHITE },
  { text: "SECURE.", color: ROYAL },
];
const TAGLINE =
  "The Competitive Programming, Software Development and Cybersecurity community of IIT Indore — algorithms, products and defences, built by the same students, side by side.";

// ---- The three domains, shown as small cards under the tagline ----
// Point each "href" at your real domain page/section.
const DOMAINS = [
  {
    id: "cp",
    label: "Competitive Programming",
    blurb: "Algorithms, contests & ratings",
    href: "/cp",
    color: LIGHT,
    icon: "code",
  },
  {
    id: "swd",
    label: "Software Development",
    blurb: "Products, tools & open source",
    href: "/software-development",
    color: WHITE,
    icon: "layers",
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    blurb: "Offence, defence & CTFs",
    href: "/cybersecurity",
    color: ROYAL,
    icon: "shield",
  },
];

const DOMAIN_ICONS = {
  code: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
    </svg>
  ),
};

function hexAlpha(hex, alpha) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const READY_DELAY = 900; // ms after mount before the tagline + cards fade in

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------------------------------------------------------------------
   One word of the heading: its characters bounce and spin in a loop.
   --------------------------------------------------------------------- */
function TextAnim({ word, color }) {
  const wordRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // leave the word static

    const split = splitText(wordRef.current, { words: false, chars: true });
    split.chars.forEach((c) => {
      c.style.display = "inline-block"; // transforms need a non-inline box
    });

    const animation = animate(split.chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 10 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });

    return () => {
      animation.revert();
      split.revert();
    };
  }, []);

  return (
    <span ref={wordRef} className="inline-block" style={{ color }}>
      {word}
    </span>
  );
}

export default function HomeHero() {
  const [ready, setReady] = useState(false); // drives the tagline + cards fade-in

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), READY_DELAY);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative z-10 flex mt-22 flex-col items-center justify-center text-center sm:px-8"
    >
      <style>{`
        .cp-chip-pre { opacity: 0; transform: translateY(14px); }
        .cp-chip-in  { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
        .cp-chip:hover {
          transform: translateY(-4px);
          border-color: var(--d-color);
          box-shadow: 0 0 26px var(--d-glow);
        }
        @media (prefers-reduced-motion: reduce) {
          .cp-chip-pre { opacity: 1; transform: none; }
        }
      `}</style>

      
      <span
        className="mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: LIGHT, border: `1px solid ${BORDER}`, background: "rgba(47,107,255,0.10)" }}
      >
        {EYEBROW}
      </span>

      {/* Screen readers get the plain text via the sr-only span; the
          animated, split-up characters are hidden from them. */}
      <h1
        className={`${headingFont.className} max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl`}
      >
        <span className="sr-only">{WORDS.map((w) => w.text).join(" ")}</span>
        <span aria-hidden="true">
          {WORDS.map((w, i) => (
            <span key={w.text}>
              <TextAnim word={w.text} color={w.color} />
              {i < WORDS.length - 1 && " "}
            </span>
          ))}
        </span>
      </h1>

      <div className=" h-54 w-54 sm:h-70 sm:w-70">
        <Club3DLogo />
      </div>

      <p
        className="mt-7 max-w-2xl text-[15px] leading-relaxed sm:text-[17px]"
        style={{
          color: SOFT,
          opacity: ready ? 1 : 0,
          transform: ready ? "none" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {TAGLINE}
      </p>
    </section>
  );
}