"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  label,
  sublabel,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? to : from);

  useEffect(() => {
    if (reduceMotion) {
      setCount(to);
      return;
    }

    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [from, to, duration, isInView, reduceMotion]);

  return (
    <div ref={ref} className={`inline-flex flex-col items-center text-center ${className}`}>
      <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        <span className="text-brand-light">{count}</span>
      </span>
      {label && (
        <span className="mt-1 font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="font-mono text-[10px] tracking-wider text-muted-dim uppercase">
          {sublabel}
        </span>
      )}
    </div>
  );
}
