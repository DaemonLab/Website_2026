"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getRank, hexToRgba, UNRATED } from "./memberUtils";

/* =====================================================================
   Members gallery: a draggable, centered coverflow strip with a
   Chroma-Grid-style colour spotlight on each card (no hover tilt).

   - The card nearest the container's centre is scaled up and treated
     as "selected" for sizing; position is measured from the real DOM
     (getBoundingClientRect), not guessed from index math, so centering
     stays correct no matter how wide the surrounding page section is.
   - Each card gets a distinct accent colour from a fixed palette (not
     tied to Codeforces rank), so the row reads as colourful rather than
     "mostly red/blue" just because most sample members are top-rated.
     The rank badge itself still uses the real Codeforces rank colour.
   ===================================================================== */

const CARD_W = 262; // px, summarized card width
const GAP = 40;

// Distinct accent colours cycled per card, independent of CF rank.
const GLOW_PALETTE = [
  "#2f6bff", // royal blue
  "#22d3ee", // cyan
  "#a78bfa", // violet
  "#f472b6", // pink
  "#34d399", // emerald
  "#facc15", // amber
  "#fb7185", // rose
  "#60a5fa", // sky blue
];

/* ---------------- Icons (inline, no icon package needed) ---------------- */
const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.63c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  codeforces: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <rect x="1.5" y="10.5" width="6" height="12" rx="1.6" />
      <rect x="9" y="5.5" width="6" height="17" rx="1.6" />
      <rect x="16.5" y="1.5" width="6" height="21" rx="1.6" />
    </svg>
  ),
};

const LINK_ORDER = [
  ["github", "GitHub"],
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["codeforces", "Codeforces"],
  ["email", "Email"],
];

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/* ---------------------------------------------------------------------
   Avatar: dataset picture -> Codeforces avatar -> initials
   --------------------------------------------------------------------- */
function Avatar({ member, size, accent }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = useMemo(
    () => [member.picture, member.cfAvatar].filter(Boolean),
    [member.picture, member.cfAvatar]
  );
  const src = sources[srcIndex];

  if (!src) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.36,
          background: `linear-gradient(135deg, ${accent}, #0a2a63)`,
        }}
      >
        {initials(member.name) || "?"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={member.name}
      loading="lazy"
      onError={() => setSrcIndex((i) => i + 1)}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size, border: `2px solid ${accent}` }}
    />
  );
}

function LinkIcons({ member, size = 32 }) {
  const active = LINK_ORDER.filter(([key]) => member.links[key]);
  if (!active.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {active.map(([key, label]) => (
        <a
          key={key}
          href={member.links[key]}
          target={key === "email" ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={`${member.name} on ${label}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center rounded-full text-white/85 outline-none transition-transform hover:scale-110 hover:text-white focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
          style={{
            width: size,
            height: size,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {ICONS[key]}
        </a>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Chroma-grid-style spotlight: a radial gradient that follows the
   pointer, tinted with the card's accent colour. No tilt — the card
   stays flat on hover, only the glow moves.
   --------------------------------------------------------------------- */
function useChroma(color) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      el.style.setProperty("--spot", hexToRgba(color, 0.55));
    },
    [color]
  );

  const onLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot", "rgba(0,0,0,0)");
  }, []);

  return { ref, onMove, onLeave };
}

/* ---------------------------------------------------------------------
   Summarized card
   --------------------------------------------------------------------- */
function MemberCard({ member, onOpen, cardRef, style }) {
  const rank = member.rating ? getRank(member.rating) : UNRATED;
  const chroma = useChroma(member.glowColor);

  const setRefs = (node) => {
    chroma.ref.current = node;
    if (cardRef) cardRef(node);
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      ref={setRefs}
      onPointerMove={chroma.onMove}
      onPointerLeave={chroma.onLeave}
      className="group relative shrink-0 overflow-hidden rounded-2xl p-5 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
      style={{
        width: CARD_W,
        background: "rgba(6, 16, 42, 0.85)",
        border: `1px solid ${hexToRgba(member.glowColor, 0.4)}`,
        ...style,
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mx,50%) var(--my,50%), var(--spot, rgba(0,0,0,0)), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <span className="relative flex flex-col items-center text-center">
        <Avatar member={member} size={92} accent={member.glowColor} />

        <span className="mt-4 text-[15.5px] font-semibold text-white">
          {member.name}
        </span>

        <span
          className="mt-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ color: rank.color, background: hexToRgba(rank.color, 0.14) }}
        >
          {member.rating ? `${rank.name} · ${member.rating}` : rank.name}
        </span>

        <span className="mt-4">
          <LinkIcons member={member} size={30} />
        </span>
      </span>
    </button>
  );
}

/* ---------------------------------------------------------------------
   Expanded profile
   --------------------------------------------------------------------- */
function MemberModal({ member, onClose }) {
  const rank = member.rating ? getRank(member.rating) : UNRATED;
  const chroma = useChroma(member.glowColor);
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#020814]/80 p-4 backdrop-blur-sm"
      style={{ animation: "cp-fade 0.25s ease" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name}'s profile`}
    >
      <div
        ref={chroma.ref}
        onPointerMove={chroma.onMove}
        onPointerLeave={chroma.onLeave}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl p-8 sm:p-10"
        style={{
          background: "rgba(6, 16, 42, 0.94)",
          border: `1px solid ${hexToRgba(member.glowColor, 0.45)}`,
          boxShadow: `0 0 60px ${hexToRgba(member.glowColor, 0.28)}`,
          animation: "cp-pop 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx,50%) var(--my,20%), var(--spot, rgba(0,0,0,0)), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#6ea2ff]"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="relative flex flex-col items-center text-center">
          <Avatar member={member} size={150} accent={member.glowColor} />

          <h3 className="mt-5 text-2xl font-bold text-white">{member.name}</h3>

          <span
            className="mt-2 rounded-full px-3.5 py-1 text-[13px] font-semibold"
            style={{ color: rank.color, background: hexToRgba(rank.color, 0.16) }}
          >
            {member.rating
              ? `${rank.name} · Rating ${member.rating}`
              : rank.name}
          </span>
          {member.maxRating && member.maxRating !== member.rating && (
            <span className="mt-1 text-[12px]" style={{ color: "#9db4de" }}>
              Max rating: {member.maxRating}
            </span>
          )}

          <div className="mt-6">
            <LinkIcons member={member} size={38} />
          </div>

          <div className="mt-7 grid w-full grid-cols-2 gap-3 text-left">
            {member.year && (
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-[10.5px] uppercase tracking-wider text-[#9db4de]">Year</p>
                <p className="mt-0.5 text-[14px] font-medium text-white">{member.year}</p>
              </div>
            )}
            {member.joined && (
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-[10.5px] uppercase tracking-wider text-[#9db4de]">Joined club</p>
                <p className="mt-0.5 text-[14px] font-medium text-white">{member.joined}</p>
              </div>
            )}
          </div>

          {member.skills.length > 0 && (
            <div className="mt-5 w-full text-left">
              <p className="mb-2 text-[10.5px] uppercase tracking-wider text-[#9db4de]">Skills</p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-2.5 py-1 text-[12px] text-[#c9d8f5]"
                    style={{ background: "rgba(47,107,255,0.12)", border: "1px solid rgba(47,107,255,0.28)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Draggable, centered coverflow strip
   --------------------------------------------------------------------- */
export default function CircularMembers({ members }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [selected, setSelected] = useState(null);
  const [, forceTick] = useState(0);

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const idleTimer = useRef(null);

  // Each card gets a fixed, distinct accent colour (not tied to CF rank),
  // so the strip reads as colourful even if most members share a rank.
  const withGlow = useMemo(
    () =>
      members.map((m, i) => ({
        ...m,
        glowColor: GLOW_PALETTE[i % GLOW_PALETTE.length],
      })),
    [members]
  );

  // Snap the card nearest the centre exactly into the centre.
  const snapToNearest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const containerRect = el.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    let nearest = null;
    let nearestDist = Infinity;
    cardRefs.current.forEach((node) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - centerX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = node;
      }
    });
    if (!nearest) return;
    const r = nearest.getBoundingClientRect();
    const offset = r.left + r.width / 2 - centerX;
    if (Math.abs(offset) > 1) {
      el.scrollTo({ left: el.scrollLeft + offset, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      forceTick((t) => t + 1);
      if (!drag.current.active) {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(snapToNearest, 140);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      clearTimeout(idleTimer.current);
    };
  }, [snapToNearest]);

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    snapToNearest();
  };

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: "smooth" });
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(snapToNearest, 400);
  };

  // Coverflow transform for each card, measured from its real position
  // relative to the container's centre (not guessed from index math),
  // so centering stays correct at any container width.
  const cardStyle = (index) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return {};

    const containerRect = track.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;

    const delta = (cardCenter - centerX) / (CARD_W + GAP);
    const absD = Math.min(Math.abs(delta), 1.6);
    const sign = Math.sign(delta);

    const scale = 1.18 - absD * 0.32; // centre card ~1.18x, fades down and out
    const rotateY = sign * absD * 10;
    const translateZ = -absD * 50;
    const translateY = absD * 12;
    const opacity = 1 - Math.min(absD * 0.32, 0.55);

    return {
      transform: `perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(100 - absD * 10),
      transition: drag.current.active ? "none" : "transform 0.35s ease, opacity 0.35s ease",
    };
  };

  if (!withGlow.length) {
    return (
      <p className="text-center text-[#9db4de]">No members to display yet.</p>
    );
  }

  return (
    <div className="relative">
      <style>{`
        @keyframes cp-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cp-pop { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
        .cp-track { scrollbar-width: none; -ms-overflow-style: none; }
        .cp-track::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Prev / next controls */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#6ea2ff] sm:flex"
        style={{ background: "rgba(6,16,42,0.8)", border: "1px solid rgba(47,107,255,0.3)" }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#6ea2ff] sm:flex"
        style={{ background: "rgba(6,16,42,0.8)", border: "1px solid rgba(47,107,255,0.3)" }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div
        ref={trackRef}
        className="cp-track flex cursor-grab select-none overflow-x-auto py-14"
        style={{
          gap: GAP,
          // Padding equals half the container's own width, so the first
          // and last cards can always reach the true centre of THIS
          // element, not just the viewport.
          paddingLeft: `calc(50% - ${CARD_W / 2}px)`,
          paddingRight: `calc(50% - ${CARD_W / 2}px)`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {withGlow.map((m, i) => (
          <div
            key={m.id}
            className="shrink-0"
            style={cardStyle(i)}
          >
            <MemberCard
              member={m}
              onOpen={setSelected}
              cardRef={(node) => (cardRefs.current[i] = node)}
            />
          </div>
        ))}
      </div>

      {selected && (
        <MemberModal member={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}