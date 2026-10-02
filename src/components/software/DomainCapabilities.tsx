"use client";

import { SoftwareSectionBackground } from "@/components/software/SoftwareSectionBackground";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { softwareCapabilities } from "@/data/softwareCapabilities";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";
import type { DomainCapability } from "@/lib/types/software";
import { motion, useReducedMotion } from "framer-motion";
import {
  GitBranch,
  Globe,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

const icons = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  git: GitBranch,
  spark: Sparkles,
  wrench: Wrench,
} as const;

const capTags: Record<string, string[]> = {
  web: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  app: ["React Native", "Flutter", "iOS / Android"],
  backend: ["Node.js", "Go", "PostgreSQL", "Redis", "gRPC"],
  oss: ["Git Workflows", "CI/CD", "Public Repositories"],
  ai: ["LLM APIs", "Embeddings", "Agent Frameworks"],
  tools: ["CLI Utilities", "Developer Tooling", "Bundlers"],
};

function CapabilityCard({ item, index }: { item: DomainCapability; index: number }) {
  const Icon = icons[item.icon];
  const tags = capTags[item.id] || [];

  return (
    <BorderGlow glowIntensity={0.6} borderRadius={20} className="h-full">
      <div className="group relative flex h-full flex-col justify-between p-7 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-light/60 transition-colors group-hover:text-brand-light">
              0{index + 1}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-mid/80 text-brand-light transition-all duration-300 group-hover:border-brand-blue/50 group-hover:bg-brand-blue/15 group-hover:text-white">
              <Icon size={20} strokeWidth={1.75} />
            </div>
          </div>

          <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-brand-light transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/8 bg-navy-mid/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-dim transition-colors group-hover:border-brand-blue/25 group-hover:text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BorderGlow>
  );
}

export function DomainCapabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32">
      <SoftwareSectionBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we build"
          title="Surfaces, systems, and tools"
          description="Key technical capability areas explored within the Software domain."
        />
        <motion.div
          variants={staggerChildren(0.06)}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {softwareCapabilities.map((item, index) => (
            <motion.div key={item.id} variants={fadeUp}>
              <CapabilityCard item={item} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
