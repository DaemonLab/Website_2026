"use client";

import { useEffect, useState } from "react";
import { SoftwareSectionBackground } from "@/components/software/SoftwareSectionBackground";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { softwareAchievements as fallbackSoftwareAchievements } from "@/data/softwareAchievements";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";
import type { SoftwareAchievement } from "@/lib/types/software";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function AchievementsSection() {
  const reduceMotion = useReducedMotion();
  const [achievements, setAchievements] = useState<SoftwareAchievement[]>(fallbackSoftwareAchievements);

  useEffect(() => {
    let isMounted = true;
    async function loadAchievementsFromApi() {
      try {
        const res = await fetch("/api/achievements?domain=software");
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: SoftwareAchievement[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            year: item.year || (item.createdAt ? new Date(item.createdAt).getFullYear().toString() : "2026"),
            description: item.description,
            category: item.domain?.name || "Software",
            imageSrc: item.image || undefined,
            linkUrl: item.link || undefined,
            isPlaceholder: false,
          }));
          setAchievements(mapped);
        }
      } catch {
        // Silently retain static fallback
      }
    }
    loadAchievementsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative border-t border-white/5 py-24 sm:py-32">
      <SoftwareSectionBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones and records"
          description="Verified achievements and major milestones from Software domain projects and competitions."
        />
        <motion.ol
          variants={staggerChildren(0.08)}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 space-y-4"
        >
          {achievements.map((item) => (
            <motion.li key={item.id} variants={fadeUp}>
              <BorderGlow glowIntensity={0.5} borderRadius={16}>
                <div className="grid gap-4 p-6 sm:grid-cols-[7rem_1fr_10rem] sm:items-start transition-colors duration-200">
                  <p className="font-mono text-xs font-bold tracking-wider text-brand-light uppercase">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    {item.linkUrl ? (
                      <a
                        href={item.linkUrl}
                        className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-medium text-brand-light hover:underline"
                      >
                        <span>Read record</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : null}
                  </div>
                  <div className="flex sm:justify-end">
                    <span className="rounded-full border border-white/10 bg-navy-mid/80 px-3 py-1 font-mono text-[10px] font-medium tracking-wider text-muted-dim uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>
              </BorderGlow>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
