"use client";

import { TeamProfileCard } from "@/components/software/TeamProfileCard";
import { CircularCarousel } from "@/components/ui/CircularCarousel";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { softwareTeam as fallbackSoftwareTeam } from "@/data/softwareTeam";
import type { SoftwareTeamMember } from "@/lib/types/software";
import { useEffect, useState } from "react";

export function SoftwareTeamCarousel() {
  const [teamMembers, setTeamMembers] = useState<SoftwareTeamMember[]>(fallbackSoftwareTeam);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadMembersFromDb() {
      try {
        const res = await fetch("/api/members?domain=software");
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedMembers: SoftwareTeamMember[] = json.data.map((m: any) => ({
            id: m.id || m.name.toLowerCase().replace(/\s+/g, "-"),
            name: m.name,
            role: m.role || "Member",
            rollNumber: m.rollNumber || undefined,
            email: m.email || undefined,
            year: m.year || undefined,
            skills: m.skills || [],
            githubUrl: m.github || undefined,
            instagramUrl: m.instagram || undefined,
            linkedinUrl: m.linkedin || undefined,
            imageSrc: m.profileImage || undefined,
          }));
          setTeamMembers(mappedMembers);
        }
      } catch {
        // Silently retain verified static fallback
      }
    }
    loadMembersFromDb();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeMember = teamMembers[activeIndex] || teamMembers[0] || fallbackSoftwareTeam[0];

  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const totalCount = String(teamMembers.length).padStart(2, "0");

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Header with Title and Counter */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Software Team"
            title="The people behind the commits"
            description="Members and contributors powering the Software domain initiatives."
          />
          <div className="rounded-2xl border border-brand-blue/30 bg-navy-card/90 px-6 py-4 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            <Counter
              to={teamMembers.length}
              label="Software Developers"
              sublabel="Domain Members & Volunteers"
            />
          </div>
        </div>

        {/* Dynamic Carousel Indicator & Active Member Highlight */}
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-blue/30 bg-[#070e1e]/90 px-5 py-1.5 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <span className="font-mono text-xs font-bold text-brand-light">
              {formattedIndex} / {totalCount}
            </span>
            <span className="h-3 w-[1px] bg-white/15" />
            <span className="font-mono text-xs font-semibold text-white">
              {activeMember?.name}
            </span>
            {activeMember?.role && (
              <span className="rounded-full bg-brand-blue/20 px-2 py-0.5 font-mono text-[9px] font-bold text-brand-light uppercase">
                {activeMember.role}
              </span>
            )}
          </div>
        </div>

        {/* 3D CIRCULAR TEAM CAROUSEL */}
        <div className="mt-10 relative">
          <CircularCarousel<SoftwareTeamMember>
            items={teamMembers}
            cardWidth={270}
            gap={28}
            speed={6}
            pauseOnHover={true}
            draggable={true}
            onActiveChange={(idx) => setActiveIndex(idx)}
            renderItem={(member, index, isActive) => (
              <div
                className={`w-full transition-all duration-500 ${
                  isActive
                    ? "scale-105 opacity-100 z-30 filter-none"
                    : "scale-90 opacity-60 z-10 brightness-75 hover:opacity-85"
                }`}
              >
                <TeamProfileCard member={member} />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
