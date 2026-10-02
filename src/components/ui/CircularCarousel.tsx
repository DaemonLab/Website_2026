"use client";

import { useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface CircularCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  cardWidth?: number;
  gap?: number;
  speed?: number; // deg per second
  pauseOnHover?: boolean;
  draggable?: boolean;
  depthFade?: number;
  fadeColor?: string;
  onActiveChange?: (index: number) => void;
  className?: string;
}

export function CircularCarousel<T>({
  items,
  renderItem,
  cardWidth = 260,
  gap = 32,
  speed = 6,
  pauseOnHover = true,
  draggable = true,
  onActiveChange,
  className = "",
}: CircularCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const count = items.length;
  const angleStep = 360 / Math.max(1, count);
  // Radius of cylinder
  const radius = Math.max(260, ((cardWidth + gap) * count) / (2 * Math.PI));

  // Current rotation angle in degrees
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Calculate index closest to front (angle % 360 = 0)
  const getIndexFromAngle = useCallback(
    (angle: number) => {
      const normalized = ((-angle % 360) + 360) % 360;
      const index = Math.round(normalized / angleStep) % count;
      return (index + count) % count;
    },
    [angleStep, count]
  );

  const updateActiveIndex = useCallback(
    (angle: number) => {
      const idx = getIndexFromAngle(angle);
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        onActiveChange?.(idx);
      }
    },
    [activeIndex, getIndexFromAngle, onActiveChange]
  );

  const rotateTo = useCallback(
    (index: number) => {
      const targetDeg = -index * angleStep;
      let diff = (targetDeg - (currentAngleRef.current % 360) + 540) % 360 - 180;
      targetAngleRef.current = currentAngleRef.current + diff;
    },
    [angleStep]
  );

  // Animation Loop
  const tick = useCallback(
    (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const frozen = reduceMotion || isDraggingRef.current || (pauseOnHover && isHoveredRef.current);

      if (!frozen) {
        targetAngleRef.current += speed * delta;
      }

      // Smooth Lerp
      currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * (reduceMotion ? 1 : 0.1);

      updateActiveIndex(currentAngleRef.current);

      if (containerRef.current) {
        containerRef.current.style.setProperty("--carousel-rotation", `${currentAngleRef.current}deg`);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    },
    [reduceMotion, pauseOnHover, speed, updateActiveIndex]
  );

  useEffect(() => {
    animFrameIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [tick]);

  // Pointer & Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    const targetEl = e.target as HTMLElement;
    if (targetEl.closest("a, button")) {
      return;
    }
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = currentAngleRef.current;
    targetEl.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const sensitivity = 0.35;
    targetAngleRef.current = dragStartAngleRef.current + dx * sensitivity;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    const nearestIdx = getIndexFromAngle(targetAngleRef.current);
    rotateTo(nearestIdx);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      rotateTo((activeIndex - 1 + count) % count);
    } else if (e.key === "ArrowRight") {
      rotateTo((activeIndex + 1) % count);
    } else if (e.key === "Home") {
      rotateTo(0);
    } else if (e.key === "End") {
      rotateTo(count - 1);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative w-full overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[520px] w-full max-w-6xl items-center justify-center [perspective:1200px] [transform-style:preserve-3d]"
      >
        {/* 3D Ring Container */}
        <div
          className="relative flex h-full w-full items-center justify-center transition-transform duration-75 ease-out [transform-style:preserve-3d]"
          style={{
            transform: `translateZ(-${radius}px) rotateY(var(--carousel-rotation, 0deg))`,
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * angleStep;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => rotateTo(index)}
                className="absolute flex cursor-pointer flex-col items-center justify-center transition-all duration-300 [transform-style:preserve-3d]"
                style={{
                  width: `${cardWidth}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                }}
              >
                {renderItem(item, index, isActive)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
