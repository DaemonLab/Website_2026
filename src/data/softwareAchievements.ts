import type { SoftwareAchievement } from "@/lib/types/software";

/**
 * Empty of invented club awards. Placeholder entries exist only so the
 * section layout can be reviewed. Replace with verified achievements.
 */
export const softwareAchievements: SoftwareAchievement[] = [
  {
    id: "placeholder-1",
    title: "Achievement title pending",
    year: "Year TBA",
    description:
      "Placeholder. Official Software-domain achievements will be listed here when the club provides them. Nothing here is a claimed result.",
    category: "To be classified",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Achievement title pending",
    year: "Year TBA",
    description:
      "Placeholder. Structure is ready for title, year, description, category, and an optional link or image.",
    category: "To be classified",
    isPlaceholder: true,
  },
];
