"use client";

import { useEffect, useRef } from "react";

// Raw binary plus symbols you actually see in competitive programming.
const CHARSET = "01{}<>()[]O(n)O(logn)+-*/%^&|".split("");

// ---- Theme (matches the IIT Indore club navy/blue) ----
const BG_COLOR = "#030a1a";
const MAIN_COLOR = "#2f6bff"; // royal blue
const LIGHT_COLOR = "#8fd3ff"; // occasional bright character
const MAX_ALPHA = 0.85; // lower this if the rain competes with your content

// ---- Performance knobs ----
const FONT_SIZE = 18; // bigger = fewer columns = fewer draws
const TRAIL_LENGTH = 10; // characters kept visible per column
const FPS = 15;
const LEVELS = 8; // alpha steps, so only a small glyph cache is needed
const FADE_EXPONENT = 1.6; // higher = steeper fade toward the tail

// Alpha level for each trail position, computed once instead of every frame.
const LEVEL_BY_K = Array.from({ length: TRAIL_LENGTH }, (_, k) => {
  const t = 1 - k / TRAIL_LENGTH; // 1 at the head, near 0 at the tail
  return Math.min(LEVELS - 1, Math.floor(Math.pow(t, FADE_EXPONENT) * LEVELS));
});

export default function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let rows = 0;
    let columns = [];

    // ---- Glyph cache: each character is rendered once, then reused ----
    const glyphCache = new Map();

    function getGlyph(ch, light, level) {
      const key = `${ch}|${light ? 1 : 0}|${level}`;
      let glyph = glyphCache.get(key);
      if (glyph) return glyph;

      glyph = document.createElement("canvas");
      glyph.width = FONT_SIZE;
      glyph.height = FONT_SIZE + 4;
      const g = glyph.getContext("2d");
      g.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      g.globalAlpha = ((level + 1) / LEVELS) * MAX_ALPHA;
      g.fillStyle = light ? LIGHT_COLOR : MAIN_COLOR;
      g.fillText(ch, 0, FONT_SIZE);
      glyphCache.set(key, glyph);
      return glyph;
    }

    const randChar = () => ({
      ch: CHARSET[Math.floor(Math.random() * CHARSET.length)],
      light: Math.random() > 0.94,
    });

    function setup() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      rows = Math.ceil(height / FONT_SIZE);
      const count = Math.floor(width / FONT_SIZE);
      columns = Array.from({ length: count }, () => ({
        // negative start so drops enter at staggered times
        head: -Math.floor(Math.random() * rows * 1.5),
        trail: [],
      }));
    }

    function drawFrame() {
      // Full clear every frame: nothing is left behind, so the background
      // stays exactly the CSS color (no ghost digits).
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * FONT_SIZE;

        for (let k = 0; k < col.trail.length; k++) {
          const row = col.head - k;
          if (row < 0 || row > rows) continue;

          const { ch, light } = col.trail[k];
          const glyph = getGlyph(ch, light, LEVEL_BY_K[k]);
          ctx.drawImage(glyph, x, row * FONT_SIZE - FONT_SIZE);
        }
      }
    }

    function step() {
      for (const col of columns) {
        col.head++;
        if (col.head >= 0) {
          col.trail.unshift(randChar());
          if (col.trail.length > TRAIL_LENGTH) col.trail.pop();
        }
        // restart once the whole trail has left the screen
        if (col.head - TRAIL_LENGTH > rows && Math.random() > 0.975) {
          col.head = 0;
          col.trail = [];
        }
      }
    }

    setup();

    // Debounced resize so dragging the window doesn't rebuild every frame.
    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        drawFrame();
      }, 150);
    }
    window.addEventListener("resize", onResize);

    let rafId;
    let lastTime = 0;
    const frameInterval = 1000 / FPS;

    function loop(time) {
      rafId = requestAnimationFrame(loop);
      if (time - lastTime < frameInterval) return;
      lastTime = time;
      step();
      drawFrame();
    }

    if (prefersReducedMotion) {
      // Single static frame, no animation.
      columns.forEach((col) => {
        col.head = Math.floor(Math.random() * rows);
        col.trail = Array.from({ length: TRAIL_LENGTH }, randChar);
      });
      drawFrame();
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      glyphCache.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ background: BG_COLOR }}
      aria-hidden="true"
    />
  );
}