"use client";

import { motion, useReducedMotion } from "framer-motion";

interface CodeItem {
  id: number;
  text: string;
  left: string;
  delay: number;
  duration: number;
  opacity: number;
  fontSize: number;
  top: string;
}

const FULL_ITEMS: CodeItem[] = [
  { id: 0, text: "const", left: "2.5%", delay: 0.5, duration: 24, opacity: 0.12, fontSize: 12, top: "0%" },
  { id: 1, text: "async", left: "7.2%", delay: 4.1, duration: 22, opacity: 0.22, fontSize: 14, top: "17%" },
  { id: 2, text: "await", left: "14.8%", delay: 1.8, duration: 26, opacity: 0.15, fontSize: 13, top: "34%" },
  { id: 3, text: "API", left: "19.5%", delay: 5.2, duration: 20, opacity: 0.19, fontSize: 16, top: "51%" },
  { id: 4, text: "git", left: "24.1%", delay: 2.3, duration: 25, opacity: 0.10, fontSize: 11, top: "68%" },
  { id: 5, text: "0x1", left: "29.7%", delay: 6.0, duration: 21, opacity: 0.17, fontSize: 15, top: "85%" },
  { id: 6, text: "gRPC", left: "34.3%", delay: 3.1, duration: 27, opacity: 0.14, fontSize: 12, top: "12%" },
  { id: 7, text: "docker", left: "39.0%", delay: 0.9, duration: 23, opacity: 0.21, fontSize: 14, top: "29%" },
  { id: 8, text: "PostgreSQL", left: "44.6%", delay: 4.7, duration: 29, opacity: 0.11, fontSize: 13, top: "46%" },
  { id: 9, text: "npm", left: "49.2%", delay: 1.5, duration: 22, opacity: 0.18, fontSize: 16, top: "63%" },
  { id: 10, text: "::", left: "54.8%", delay: 5.8, duration: 26, opacity: 0.13, fontSize: 11, top: "80%" },
  { id: 11, text: "=>", left: "59.4%", delay: 2.9, duration: 20, opacity: 0.20, fontSize: 15, top: "7%" },
  { id: 12, text: "build()", left: "64.1%", delay: 0.3, duration: 28, opacity: 0.16, fontSize: 14, top: "24%" },
  { id: 13, text: "deploy()", left: "69.7%", delay: 4.2, duration: 24, opacity: 0.10, fontSize: 12, top: "41%" },
  { id: 14, text: "system", left: "74.3%", delay: 1.9, duration: 21, opacity: 0.19, fontSize: 17, top: "58%" },
  { id: 15, text: "const", left: "79.0%", delay: 5.1, duration: 25, opacity: 0.14, fontSize: 13, top: "75%" },
  { id: 16, text: "async", left: "83.6%", delay: 3.4, duration: 27, opacity: 0.22, fontSize: 15, top: "92%" },
  { id: 17, text: "await", left: "88.2%", delay: 0.7, duration: 23, opacity: 0.12, fontSize: 11, top: "19%" },
  { id: 18, text: "API", left: "92.8%", delay: 4.5, duration: 29, opacity: 0.17, fontSize: 14, top: "36%" },
  { id: 19, text: "git", left: "96.4%", delay: 2.1, duration: 22, opacity: 0.15, fontSize: 16, top: "53%" },
];

const SPARSE_ITEMS: CodeItem[] = [
  FULL_ITEMS[1],
  FULL_ITEMS[3],
  FULL_ITEMS[5],
  FULL_ITEMS[7],
  FULL_ITEMS[9],
  FULL_ITEMS[11],
  FULL_ITEMS[13],
  FULL_ITEMS[15],
  FULL_ITEMS[17],
  FULL_ITEMS[19],
];

interface CodeBackgroundProps {
  density?: "full" | "sparse";
}

export function CodeBackground({ density = "full" }: CodeBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const items = density === "sparse" ? SPARSE_ITEMS : FULL_ITEMS;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className={`absolute font-mono ${
            reduceMotion ? "text-brand-light/30" : "text-brand-light"
          }`}
          style={{
            left: item.left,
            top: reduceMotion ? item.top : undefined,
            fontSize: item.fontSize,
            opacity: item.opacity,
          }}
          initial={reduceMotion ? false : { y: -40 }}
          animate={reduceMotion ? undefined : { y: ["-8%", "108%"] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}
