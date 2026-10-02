"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  className?: string;
  encryptedClassName?: string;
  animateOnHover?: boolean;
}

const CHARACTERS = "01#@$%&*<>~/[]{}=";

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  className = "",
  encryptedClassName = "text-brand-light/60",
  animateOnHover = false,
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();

  const [displayText, setDisplayText] = useState(reduceMotion ? text : "");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    if (!isInView && !isHovered) return;

    let iteration = 0;
    const length = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            if (sequential) {
              const progress = (iteration / maxIterations) * length;
              if (index < progress) {
                return char;
              }
            } else {
              if (iteration >= maxIterations) {
                return char;
              }
            }

            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration > maxIterations + (sequential ? length : 0)) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, isHovered, text, speed, maxIterations, sequential, reduceMotion]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const handleMouseEnter = () => {
    if (animateOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOnHover) {
      setIsHovered(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-mono ${className}`}
    >
      {displayText.split("").map((char, index) => {
        const isOriginal = char === text[index];
        return (
          <span
            key={index}
            className={isOriginal ? undefined : encryptedClassName}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
