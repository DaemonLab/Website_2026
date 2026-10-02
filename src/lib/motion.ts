import type { Easing, Transition, Variants } from "framer-motion";

export const cubicBezierSoft: Easing = [0.22, 1, 0.36, 1];
export const cubicBezierSmooth: Easing = [0.16, 1, 0.3, 1];

export const easeOutSoft: Transition = {
  duration: 0.7,
  ease: cubicBezierSoft,
};

export const easeOutSmooth: Transition = {
  duration: 0.9,
  ease: cubicBezierSmooth,
};

// Section Header Stagger Container
export const sectionHeaderContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Eyebrow Reveal
export const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezierSoft },
  },
};

// Heading Reveal (Masked upward + subtle blur -> sharp)
export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: cubicBezierSmooth },
  },
};

// Paragraph Reveal
export const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicBezierSoft },
  },
};

// Hero Sequential Word Reveal Variants
export const heroWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

export const heroWordItem: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: cubicBezierSmooth },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: easeOutSoft },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: easeOutSoft },
};

export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -8% 0px",
} as const;
