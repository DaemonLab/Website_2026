"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { softwareProcess } from "@/data/softwareProcess";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export function DevelopmentProcess() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="System Pipeline Lifecycle"
          title="From a sketch to a shipped system"
          description="A working engineering loop. Each phase feeds the next."
        />

        <div ref={ref} className="relative mt-16">
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {softwareProcess.map((step, index) => (
              <motion.li
                key={step.id}
                variants={fadeUp}
                initial={reduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={viewportOnce}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(59, 130, 246, 0.25)"
                  className="h-full flex flex-col justify-between border border-white/10 bg-navy-card/90 p-6 transition-all duration-300 hover:border-brand-blue/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-blue/50 bg-navy font-mono text-xs font-bold text-brand-light shadow-[0_0_10px_rgba(37,99,235,0.25)]">
                        0{index + 1}
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-widest text-brand-light uppercase">
                        PHASE 0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-foreground group-hover:text-brand-light transition-colors">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-3 flex items-center justify-between font-mono text-[10px] text-muted-dim uppercase tracking-wider">
                    <span>PIPELINE STAGE</span>
                    <span className="text-brand-light font-semibold">ACTIVE</span>
                  </div>
                </SpotlightCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
