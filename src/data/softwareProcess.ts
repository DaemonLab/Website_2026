import type { ProcessStep } from "@/lib/types/software";

export const softwareProcess: ProcessStep[] = [
  {
    id: "idea",
    title: "Idea",
    description: "Define the problem, the user, and the smallest useful version.",
  },
  {
    id: "design",
    title: "Design",
    description: "Shape structure, interfaces, and the contracts between systems.",
  },
  {
    id: "build",
    title: "Build",
    description: "Write the product: clients, APIs, data, and the glue in between.",
  },
  {
    id: "test",
    title: "Test",
    description: "Prove behaviour, catch edge cases, and keep the system honest.",
  },
  {
    id: "deploy",
    title: "Deploy",
    description: "Ship it somewhere real — observable, reversible, and usable.",
  },
  {
    id: "iterate",
    title: "Iterate",
    description: "Learn from usage, then refine the next version with intent.",
  },
];
