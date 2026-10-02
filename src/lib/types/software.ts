export interface SoftwareProject {
  id: string;
  name: string;
  description: string;
  stack: string[];
  team: string[];
  year: string;
  githubUrl?: string;
  demoUrl?: string;
  imageSrc?: string;
  featured?: boolean;
  isPlaceholder: boolean;
}

export interface SoftwareEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  type: "Workshop" | "Hackathon" | "Sprint" | "Talk" | "Other";
  detailsUrl?: string;
  isPlaceholder: boolean;
}

export interface SoftwareTeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  rollNumber?: string;
  email?: string;
  year?: string;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  imageSrc?: string;
  isPlaceholder?: boolean;
}

export interface SoftwareAchievement {
  id: string;
  title: string;
  year: string;
  description: string;
  category: string;
  imageSrc?: string;
  linkUrl?: string;
  isPlaceholder: boolean;
}

export interface DomainCapability {
  id: string;
  title: string;
  description: string;
  icon: "globe" | "smartphone" | "server" | "git" | "spark" | "wrench";
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}
