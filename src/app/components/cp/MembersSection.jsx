"use client";

import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import BinaryRain from "./BinaryRain";
import MembersScene from "./MembersScene";
import MemberModal from "./MemberModal";
import CodeDiscScene from "./ThreeDcode";
import { cpMembers } from "./members.data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

// TODO: once the Postgres table is ready, fetch server-side and pass the
// result in as a `members` prop instead of importing `cpMembers` directly.
export default function MembersSection({ members = cpMembers }) {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <section className={`${spaceGrotesk.variable} relative h-screen w-full overflow-hidden`}>
      <BinaryRain />
      <CodeDiscScene />
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-full p-8 md:p-16">
        <p className="font-mono text-xs uppercase tracking-wide text-[#7c5cff]">
          Domain
        </p>
        <h2 className="mt-2 max-w-xl font-[var(--font-space-grotesk)] text-4xl font-medium leading-tight text-[#ece9fb] md:text-6xl">
          Competitive Programming
        </h2>
        <p className="mt-4 max-w-md text-[#8b85ab]">
          Twelve members, one leaderboard. Scroll inside this section to meet
          the people behind the ratings.
        </p>
      </div>

      {/* ScrollControls below creates its own internal scroll region sized
          to this container — scrolling here does not scroll the outer page. */}
      <div className="relative z-0 h-full w-full">
        <MembersScene members={members} onOpenDetails={setActiveMember} />
      </div>

      <MemberModal member={activeMember} onClose={() => setActiveMember(null)} />
    </section>
  );
}