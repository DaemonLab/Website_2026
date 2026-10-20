"use client";

import React from "react";

export default function StrokeTextHeading({ className = "" }) {
  return (
    <div className={`relative inline-block w-full ${className}`}>
      <style>{`
        /* Step 1: Draw outline */
        @keyframes drawOutline {
          0% {
            stroke-dashoffset: 3000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        /* Step 2: Fill color left-to-right */
        @keyframes sweepFillLeftToRight {
          0% {
            width: 0px;
          }
          100% {
            width: 1800px;
          }
        }

        .animated-stroke {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: drawOutline 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animated-fill-rect {
          animation: sweepFillLeftToRight 2.5s ease-out 1s forwards;
        }
      `}</style>

      <svg
        className="w-full h-auto overflow-visible select-none"
        viewBox="0 0 1800 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="headingGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Left-to-Right Clip Mask */}
          <clipPath id="leftToRightClip" clipPathUnits="userSpaceOnUse">
            <rect
              x="0"
              y="0"
              height="180"
              className="animated-fill-rect"
            />
          </clipPath>
        </defs>

        {/* LAYER 1: Outline stroke drawing */}
        <g stroke="url(#headingGradient)" strokeWidth="2.5" fill="none">
          <text
            x="0"
            y="125"
            className="animated-stroke"
            fontSize="130"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-2"
          >
            Competitive Programming
          </text>
        </g>

        {/* LAYER 2: Solid gradient fill revealed progressively */}
        <g clipPath="url(#leftToRightClip)" fill="url(#headingGradient)">
          <text
            x="0"
            y="125"
            fontSize="130"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-2"
          >
            Competitive Programming
          </text>
        </g>
      </svg>
    </div>
  );
}