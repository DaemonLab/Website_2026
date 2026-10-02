"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/software/ProjectCard";
import { SoftwareSectionBackground } from "@/components/software/SoftwareSectionBackground";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { softwareProjects as fallbackSoftwareProjects } from "@/data/softwareProjects";
import { fadeUp, viewportOnce } from "@/lib/motion";
import type { SoftwareProject } from "@/lib/types/software";
import { motion, useReducedMotion } from "framer-motion";

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const [projects, setProjects] = useState<SoftwareProject[]>(fallbackSoftwareProjects);

  useEffect(() => {
    let isMounted = true;
    async function loadProjectsFromApi() {
      try {
        const res = await fetch("/api/projects?domain=software");
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedProjects: SoftwareProject[] = json.data.map((item: any) => ({
            id: item.id || item.slug,
            name: item.title,
            description: item.description,
            stack: item.technologies || [],
            team: item.team || [],
            year: item.year || "2026",
            githubUrl: item.githubUrl || undefined,
            demoUrl: item.liveUrl || undefined,
            imageSrc: item.imageSrc || undefined,
            featured: item.featured || false,
            isPlaceholder: false,
          }));
          setProjects(mappedProjects);
        }
      } catch {
        // Silently retain static fallback
      }
    }
    loadProjectsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section id="projects" className="relative scroll-mt-20 py-24 sm:py-32">
      <SoftwareSectionBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured projects"
          title="Work worth looking at"
          description="A showcase of systems and tools built within the Software domain."
        />

        {featured && (
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14"
          >
            <ProjectCard project={featured} featured />
          </motion.div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={viewportOnce}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
