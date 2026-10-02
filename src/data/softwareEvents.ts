import type { SoftwareEvent } from "@/lib/types/software";

/** Placeholder records only. Replace with official Software domain events. */
export const softwareEvents: SoftwareEvent[] = [
  {
    id: "web-workshop",
    name: "Web Development Workshop",
    date: "Date TBA",
    description:
      "Placeholder. A session on building modern web interfaces and the foundations of shipping to the browser.",
    type: "Workshop",
    isPlaceholder: true,
  },
  {
    id: "git-workshop",
    name: "Git & GitHub Workshop",
    date: "Date TBA",
    description:
      "Placeholder. Version control, collaboration, and the workflows used on real codebases.",
    type: "Workshop",
    isPlaceholder: true,
  },
  {
    id: "hackathon",
    name: "Hackathon",
    date: "Date TBA",
    description:
      "Placeholder. A focused build window for turning an idea into a working prototype.",
    type: "Hackathon",
    isPlaceholder: true,
  },
  {
    id: "oss-sprint",
    name: "Open Source Sprint",
    date: "Date TBA",
    description:
      "Placeholder. Contribute together — issues, pull requests, and public collaboration.",
    type: "Sprint",
    isPlaceholder: true,
  },
  {
    id: "dev-talk",
    name: "Developer Talk",
    date: "Date TBA",
    description:
      "Placeholder. A technical talk on software practice, systems, or product thinking.",
    type: "Talk",
    isPlaceholder: true,
  },
];
