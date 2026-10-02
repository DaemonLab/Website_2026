import type { SoftwareProject } from "@/lib/types/software";

/** Placeholder records only. Replace with verified Programming Club projects. */
export const softwareProjects: SoftwareProject[] = [
  {
    id: "placeholder-featured",
    name: "Project name pending",
    description:
      "Placeholder. A featured Software-domain project will appear here once official details are provided — name, stack, team, and links.",
    stack: ["TypeScript", "Next.js", "API"],
    team: ["To be listed"],
    year: "TBA",
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "placeholder-secondary-a",
    name: "Project slot A",
    description:
      "Placeholder. Secondary showcase for a shipped or in-progress Software project.",
    stack: ["React", "Node.js"],
    team: ["To be listed"],
    year: "TBA",
    isPlaceholder: true,
  },
  {
    id: "placeholder-secondary-b",
    name: "Project slot B",
    description:
      "Placeholder. Secondary showcase for a shipped or in-progress Software project.",
    stack: ["Python", "PostgreSQL"],
    team: ["To be listed"],
    year: "TBA",
    isPlaceholder: true,
  },
];
