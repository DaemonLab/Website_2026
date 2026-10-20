"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"; // if you use the older package: from "framer-motion"
import DepthText from "./DepthText";

// TODO: replace `image` with the URL coming from your database later.
const DOMAINS = [
  {
    name: "Competitive Programming",
    slug: "cp",
    image: "https://picsum.photos/seed/competitive-code/1200/900",
    description:
      "Train on algorithms and data structures, compete in weekly contests, and prepare for ICPC and global rating ladders together.",
    tags: ["Algorithms", "Data Structures", "ICPC", "Codeforces"],
    accent: "#38bdf8",
  },
  {
    name: "Software Development",
    slug: "software",
    image: "https://picsum.photos/seed/software-dev/1200/900",
    description:
      "Design, build and ship real products, from web and app projects to open-source work, with code reviews from peers.",
    tags: ["Web", "App Dev", "Open Source", "System Design"],
    accent: "#a78bfa",
  },
  {
    name: "Cybersecurity",
    slug: "cybersec",
    image: "https://picsum.photos/seed/cyber-security/1200/900",
    description:
      "Learn how systems break and how to defend them through CTFs, hands-on labs and security research.",
    tags: ["CTF", "Pentesting", "Cryptography", "Reverse Engineering"],
    accent: "#34d399",
  },
];

/* ---------- Scramble / decrypt title ---------- */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

function ScrambleTitle({ text, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setOut(
        text
          .split("")
          .map((ch, i) =>
            ch === " " || frame > i * 1.5 + 10
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame > text.length * 1.5 + 10) {
        clearInterval(id);
        setOut(text);
      }
    }, 40);
    return () => clearInterval(id);
  }, [inView, reduce, text]);

  return (
    <h3
      ref={ref}
      aria-label={text}
      className="flex flex-col items-start gap-1"
    >
      {/* one DepthText per word so long names wrap instead of overflowing */}
      {out.split(" ").map((word, i) => (
        <DepthText
          key={i}
          text={word}
          layers={18}
          depth={1.8}
          faceColor="#f8fafc"
          depthColor={accent}
          tilt={6}
          perspective={900}
          autoOrbit
          orbitSpeed={0.25}
          fontSize="clamp(2.25rem, 4.6vw, 4rem)"
          fontWeight={900}
          shadow
          className="py-2 pr-3"
        />
      ))}
    </h3>
  );
}

/* ---------- Tilted glass image card ---------- */
function TiltCard({ d, side }) {
  const ref = useRef(null);
  const base = side === "left" ? 14 : -14; // resting tilt (deg), faces the text
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 16 });
  const sy = useSpring(my, { stiffness: 140, damping: 16 });
  const rotateY = useTransform(sx, (v) => base + v * 10);
  const rotateX = useTransform(sy, (v) => 4 - v * 10);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <Link
        href={`/domains/${d.slug}`}
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-label={`Open ${d.name} domain`}
        className="group block rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ outlineColor: d.accent }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow: `0 30px 60px -30px ${d.accent}55`,
          }}
          whileHover={{ y: -12, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="rounded-[28px] border border-white/15 bg-transparent p-4 backdrop-blur-xl md:p-5"
        >
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${d.accent}55, #0a0f2c)`,
            }}
          >
            {/* plain <img> so no next.config image domains are needed yet */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.image}
              alt={`${d.name} illustration`}
              loading="lazy"
              className="h-full w-full object-cover brightness-[0.7] saturate-[0.7] transition duration-500 group-hover:brightness-100 group-hover:saturate-100"
            />
            {/* dull overlay that fades away on hover */}
            <div className="pointer-events-none absolute inset-0 bg-[#040617]/40 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

/* ---------- One domain row ---------- */
function DomainRow({ d, index }) {
  const imageLeft = index % 2 === 0;
  const reduce = useReducedMotion();
  const dist = reduce ? 0 : 90;

   const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      className={`group relative flex flex-col items-center gap-10 rounded-[48px] border border-[0.5px] border-white/15 bg-transparent p-5 backdrop-blur-xl ${
        imageLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
        
      {/* cursor-following coloured glow, clipped to the row's shape */}
<div
  aria-hidden
  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[48px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
>
  <div
    className="absolute inset-0"
    style={{
      background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), ${d.accent}40, transparent 60%)`,
    }}
  />
</div>

      <motion.div
        className="w-full md:w-[44%]"
        initial={{ opacity: 0, x: imageLeft ? -dist : dist }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <TiltCard d={d} side={imageLeft ? "left" : "right"} />
      </motion.div>

      <motion.div
        className="flex w-full flex-col gap-5 md:flex-1"
        initial={{ opacity: 0, x: imageLeft ? dist : -dist }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <ScrambleTitle text={d.name} />
        <p className="max-w-[52ch] text-base leading-relaxed text-white/70 md:text-lg">
          {d.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {d.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border px-3 py-1 text-sm text-white/85"
              style={{
                borderColor: `${d.accent}66`,
                background: `${d.accent}14`,
              }}
            >
              {t}
            </li>
          ))}
        </ul>
        <Link
          href={`/domains/${d.slug}`}
          className="mt-2 inline-flex w-fit items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        >
          Explore {d.name}
        </Link>
      </motion.div>
    </div>
  );
}

export default function DomainsOverview() {
  return (
    <section
      id="domains"
      className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12"
    >
      <motion.div
        className="mx-auto mb-20 max-w-2xl text-center md:mb-28"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Our Domains
        </h2>
        <p className="mt-4 text-base text-white/60 md:text-lg">
          Three tracks, one community. Pick the one you want to get better at.
        </p>
      </motion.div>

      <div className="flex flex-col gap-18 md:gap-40">
        {DOMAINS.map((d, i) => (
          <DomainRow key={d.slug} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}