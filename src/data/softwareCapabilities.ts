import type { DomainCapability } from "@/lib/types/software";

export const softwareCapabilities: DomainCapability[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Build modern, responsive web experiences.",
    icon: "globe",
  },
  {
    id: "app",
    title: "App Development",
    description: "Turn ideas into useful mobile applications.",
    icon: "smartphone",
  },
  {
    id: "backend",
    title: "Backend & Systems",
    description: "Design APIs, databases and reliable backend systems.",
    icon: "server",
  },
  {
    id: "oss",
    title: "Open Source",
    description: "Collaborate, contribute and build in public.",
    icon: "git",
  },
  {
    id: "ai",
    title: "AI-Powered Software",
    description: "Explore software enhanced by modern AI systems.",
    icon: "spark",
  },
  {
    id: "tools",
    title: "Developer Tools",
    description: "Build tools that improve the developer experience.",
    icon: "wrench",
  },
];
