"use client";

import { GithubIcon } from "@/components/ui/Icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { SoftwareProject } from "@/lib/types/software";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: SoftwareProject;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <SpotlightCard
      className={`group flex h-full flex-col !p-0 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.25),transparent_70%),linear-gradient(160deg,#091024_0%,#040711_100%)] ${
          featured ? "min-h-60 lg:w-[46%]" : "min-h-44"
        }`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#60a5fa_1px,transparent_1px)] [background-size:16px_16px] transition-transform duration-700 group-hover:scale-105" />
        
        {/* SVG architecture graphic representation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
          <svg className="w-3/4 h-3/4" viewBox="0 0 100 60" fill="none">
            <path d="M10 30 H40 L50 15 L60 45 L70 30 H90" stroke="#60a5fa" strokeWidth="0.75" strokeDasharray="2 2" />
            <circle cx="50" cy="15" r="3" fill="#2563eb" />
            <circle cx="60" cy="45" r="3" fill="#2563eb" />
            <circle cx="40" cy="30" r="3" fill="#60a5fa" />
            <circle cx="70" cy="30" r="3" fill="#60a5fa" />
          </svg>
        </div>

        {project.isPlaceholder ? (
          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-navy/80 px-3 py-1 font-mono text-[10px] font-medium tracking-wider text-muted uppercase backdrop-blur-sm">
            Placeholder Project
          </span>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            {featured && (
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-brand-light uppercase">
                Featured System
              </span>
            )}
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-brand-light transition-colors">
              {project.name}
            </h3>
          </div>
          <span className="font-mono text-xs text-muted-dim">{project.year}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/8 bg-navy-mid/80 px-2.5 py-1 font-mono text-[10px] text-muted-dim transition-colors group-hover:border-brand-blue/20 group-hover:text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-4 font-mono text-xs text-muted-dim">
          Contributors: {project.team.join(", ")}
        </p>

        <div className="mt-auto flex gap-4 pt-6 border-t border-white/5">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-brand-light hover:text-white transition-colors"
            >
              <GithubIcon size={15} />
              <span>Repository</span>
            </a>
          ) : (
            <span className="font-mono text-xs text-muted-dim">GitHub repository pending</span>
          )}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-brand-light hover:text-white transition-colors"
            >
              <ExternalLink size={15} />
              <span>Live Demo</span>
            </a>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
}
