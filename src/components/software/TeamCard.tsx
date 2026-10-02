"use client";

import { TeamProfileCard } from "@/components/software/TeamProfileCard";
import type { SoftwareTeamMember } from "@/lib/types/software";

interface TeamCardProps {
  member: SoftwareTeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return <TeamProfileCard member={member} />;
}
