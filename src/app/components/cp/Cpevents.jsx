"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTS } from "./eventsData";

/* =====================================================================
   Competitive Programming events, shown as alternating split elements
   strung along a vertical timeline (Circle image on one side, details on the other).
   ===================================================================== */

const CARD_BG = "rgba(5, 15, 40, 0.8)";
const BORDER = "rgba(47, 107, 255, 0.28)";
const ACCENT = "#2f6bff";
const ACCENT_TEXT = "#6ea2ff";
const LIGHT = "#8fd3ff";
const MUTED = "#c9d8f5";
const SOFT = "#9db4de";
const DONE = "#4b5b82";

const DESC_CLAMP_LINES = 4;

/* ---------------- Icons ---------------- */
const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);
const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);
const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="11" opacity="0.35" />
    <path d="M10 8.3v7.4a.8.8 0 0 0 1.22.68l6-3.7a.8.8 0 0 0 0-1.36l-6-3.7A.8.8 0 0 0 10 8.3Z" />
  </svg>
);

/* ---------------- Reveal on scroll ---------------- */
/* ---------------- Reveal on scroll ---------------- */
function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Set offset based on requested direction
  const initialTransform =
    direction === "left"
      ? "translateX(-80px)"
      : direction === "right"
      ? "translateX(80px)"
      : "translateY(20px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : initialTransform,
        transition: `opacity 2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function classifyEvents(events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withDates = events.map((e) => ({ ...e, _date: new Date(`${e.date}T00:00:00`) }));
  const upcoming = withDates.filter((e) => e._date >= today).sort((a, b) => a._date - b._date);
  const nextId = upcoming[0]?.id;

  return withDates
    .sort((a, b) => a._date - b._date)
    .map((e) => ({
      ...e,
      status: e._date < today ? "past" : e.id === nextId ? "next" : "upcoming",
    }));
}

/* ---------------- Circular Media Component ---------------- */
function CircleMedia({ event }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border-2 shadow-lg transition-transform duration-300 hover:scale-105 animate-float"
      style={{
        borderColor: event.status === "next" ? LIGHT : BORDER,
        boxShadow: event.status === "next" ? `0 0 20px rgba(143,211,255,0.3)` : "none",
      }}
    >
      <div className="h-56 w-56 sm:h-64 sm:w-64">
        {event.video ? (
          <div className="relative h-full w-full">
            <video
              src={event.video}
              poster={event.image}
              muted
              loop
              playsInline
              controls={playing}
              onPlay={() => setPlaying(true)}
              className="h-full w-full object-cover"
            />
            {!playing && (
              <button
                type="button"
                onClick={(e) => {
                  const vid = e.currentTarget.parentElement.querySelector("video");
                  vid?.play();
                }}
                aria-label={`Play video for ${event.title}`}
                className="absolute inset-0 flex items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/45"
              >
                <PlayIcon />
              </button>
            )}
          </div>
        ) : event.image ? (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-center p-2"
            style={{ background: "linear-gradient(135deg, rgba(47,107,255,0.3), rgba(6,16,42,0.9))" }}
          >
            <span className="text-[11px] font-semibold text-white leading-tight">
              {event.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Status badge ---------------- */
function StatusBadge({ status }) {
  if (status === "next") {
    return (
      <span
        className="cp-pulse rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider"
        style={{ color: "#04121f", background: LIGHT }}
      >
        Next up
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span
        className="rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider"
        style={{ color: ACCENT_TEXT, border: `1px solid ${ACCENT}`, background: "rgba(47,107,255,0.1)" }}
      >
        Upcoming
      </span>
    );
  }
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider"
      style={{ color: SOFT, border: `1px solid ${BORDER}` }}
    >
      Completed
    </span>
  );
}

/* ---------------- Event Details Card ---------------- */
function EventDetails({ event, alignLeft = false }) {
  const [expanded, setExpanded] = useState(false);
  const isPast = event.status === "past";

  return (
    <div
      className={`group overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,107,255,0.35)] hover:-translate-y-1 ${
        alignLeft ? "sm:text-right" : "sm:text-left"
      }`}
      style={{
        background: CARD_BG,
        border: `1px solid ${event.status === "next" ? LIGHT : BORDER}`,
        boxShadow: event.status === "next" ? `0 0 26px rgba(143,211,255,0.25)` : "none",
        opacity: isPast ? 0.88 : 1,
      }}
    >
      <div className={`mb-2 flex flex-wrap items-center gap-2 ${alignLeft ? "sm:justify-end" : "sm:justify-start"}`}>
        <StatusBadge status={event.status} />
        <span className="flex items-center gap-1 text-[12px]" style={{ color: SOFT }}>
          <CalendarIcon /> {formatDate(event.date)}
        </span>
        {event.location && (
          <span className="flex items-center gap-1 text-[12px]" style={{ color: SOFT }}>
            <PinIcon /> {event.location}
          </span>
        )}
      </div>

      <h3 className="text-[17px] font-semibold text-white">{event.title}</h3>

      {event.tags?.length > 0 && (
        <ul className={`mt-2 flex flex-wrap gap-2 ${alignLeft ? "sm:justify-end" : "sm:justify-start"}`}>
          {event.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md px-2.5 py-1 text-[11.5px]"
              style={{ color: MUTED, background: "rgba(47,107,255,0.10)", border: `1px solid ${BORDER}` }}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <p
        className={`mt-3 text-[13.5px] leading-relaxed ${expanded ? "" : "cp-clamp"}`}
        style={{ color: SOFT, "--clamp-lines": DESC_CLAMP_LINES }}
      >
        {event.description}
      </p>

      <div className={`mt-3 flex items-center gap-4 ${alignLeft ? "sm:justify-end" : "sm:justify-start"}`}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[12.5px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
          style={{ color: ACCENT_TEXT }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noreferrer"
            className="text-[12.5px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
            style={{ color: LIGHT }}
          >
            Event link ↗
          </a>
        )}
      </div>
    </div>
  );
}

/* ---------------- Timeline marker ---------------- */
function Marker({ status }) {
  const color = status === "past" ? DONE : status === "next" ? LIGHT : ACCENT;
  return (
    <span
      className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
        status === "next" ? "cp-pulse-ring" : ""
      }`}
      style={{ background: color, boxShadow: status === "past" ? "none" : `0 0 10px ${color}` }}
      aria-hidden="true"
    />
  );
}

/* ---------------- Main Section ---------------- */
export default function CPEvents({ events = EVENTS }) {
  const classified = classifyEvents(events);

  return (
    <section id="events" className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <style>{`
        .cp-clamp {
          display: -webkit-box;
          -webkit-line-clamp: var(--clamp-lines, 4);
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes cp-pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,211,255,0.55); }
          50%      { box-shadow: 0 0 0 6px rgba(143,211,255,0); }
        }
        .cp-pulse { animation: cp-pulse-badge 2.2s ease-in-out infinite; }

        /* --- Floating animation --- */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes cp-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,211,255,0.55); }
          50%      { box-shadow: 0 0 0 7px rgba(143,211,255,0); }
        }
        .cp-pulse-ring { animation: cp-pulse-ring 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cp-pulse, .cp-pulse-ring, .animate-float { animation: none; }
        }
      `}</style>

      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: LIGHT, border: `1px solid ${BORDER}`, background: "rgba(47,107,255,0.10)" }}
        >
          Events
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Domain <span style={{ color: LIGHT }}>Timeline</span>
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SOFT }}>
          Everything we've run and everything coming up next, from beginner
          workshops to full contest simulations.
        </p>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        {/* Central Vertical Line */}
        <div
          className="absolute top-0 bottom-0 left-[7px] w-[2px] sm:left-1/2 sm:-translate-x-1/2"
          style={{ background: `linear-gradient(${ACCENT}, ${hexAlpha(ACCENT, 0.15)})` }}
          aria-hidden="true"
        />

        <ol className="space-y-12 sm:space-y-16">
          {classified.map((event, i) => {
            const isLeftImage = i % 2 === 0;

            return (
              <li key={event.id} className="relative">
                {/* Mobile View Layout */}
                <div className="flex gap-4 sm:hidden">
                  <div className="pt-2">
                    <Marker status={event.status} />
                  </div>
                  <Reveal delay={i * 60} className="flex-1 space-y-3">
                    <div className="flex justify-center">
                      <CircleMedia event={event} />
                    </div>
                    <EventDetails event={event} />
                  </Reveal>
                </div>

                {/* Desktop Split View Layout */}
                <div className="hidden sm:grid sm:grid-cols-2 sm:items-center sm:gap-x-12">
                  {/* Timeline Marker Center Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Marker status={event.status} />
                  </div>

                  {isLeftImage ? (
                    <>
                      {/* Left Side: Circular Image */}
                      <Reveal delay={i * 60} direction="left" className="flex justify-end">
                        <CircleMedia event={event} />
                      </Reveal>
                      {/* Right Side: Details Card */}
                      <Reveal delay={i * 60} direction="right">
                        <EventDetails event={event} alignLeft={false} />
                      </Reveal>
                    </>
                  ) : (
                    <>
                      {/* Left Side: Details Card */}
                      <Reveal delay={i * 60} direction="left">
                        <EventDetails event={event} alignLeft={true} />
                      </Reveal>
                      {/* Right Side: Circular Image */}
                      <Reveal delay={i * 60} direction="right" className="flex justify-start">
                        <CircleMedia event={event} />
                      </Reveal>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function hexAlpha(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}