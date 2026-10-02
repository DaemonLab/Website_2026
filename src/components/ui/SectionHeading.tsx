"use client";

import {
  eyebrowVariants,
  headingVariants,
  paragraphVariants,
  sectionHeaderContainer,
  viewportOnce,
} from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={sectionHeaderContainer}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow ? (
        <motion.p
          variants={eyebrowVariants}
          className="mb-3 font-mono text-[11px] font-semibold tracking-[0.32em] text-brand-light uppercase"
        >
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h2
        variants={headingVariants}
        className="font-display text-3xl leading-[1.14] font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={paragraphVariants}
          className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
