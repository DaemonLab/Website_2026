"use client";

import { SoftwareSectionBackground } from "@/components/software/SoftwareSectionBackground";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const pipeline = [
  { step: "01", title: "IDEA", desc: "Problem discovery & framing" },
  { step: "02", title: "DESIGN", desc: "Interface & UX systems" },
  { step: "03", title: "ARCHITECTURE", desc: "APIs, databases & schemas" },
  { step: "04", title: "BUILD", desc: "Clean, performant codebase" },
  { step: "05", title: "DEPLOY", desc: "Cloud & CI/CD infrastructure" },
  { step: "06", title: "ITERATE", desc: "Observability & feedback" },
];

export function SoftwareOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <SoftwareSectionBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <SectionHeading
            eyebrow="About Software"
            title="Where Ideas Become Software"
          />

          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5 text-base leading-relaxed text-muted sm:text-lg"
          >
            <p>
              The Software domain is a collaborative engineering environment to explore the
              complete development lifecycle — taking abstract ideas and turning them into
              resilient, production-ready software.
            </p>
            <p>
              Students work across the entire technology stack: frontend interfaces, distributed
              backends, REST & GraphQL APIs, data models, developer tooling, and open-source systems.
              The focus is practical: shipping well-engineered software with architectural rigor.
            </p>
          </motion.div>
        </div>

        {/* Connected System Pipeline Flow */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-brand-light/70 uppercase">
            System Pipeline Lifecycle
          </p>

          <motion.div
            variants={staggerChildren(0.08)}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {pipeline.map((item, index) => (
              <motion.div key={item.step} variants={fadeUp}>
                <BorderGlow glowIntensity={0.55} borderRadius={14} className="h-full">
                  <div className="group relative flex h-full flex-col justify-between p-4 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-brand-light">
                        {item.step}
                      </span>
                      {index < pipeline.length - 1 && (
                        <span className="hidden font-mono text-xs text-muted-dim lg:block">→</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-sm font-semibold tracking-wide text-foreground group-hover:text-brand-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-muted-dim leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
