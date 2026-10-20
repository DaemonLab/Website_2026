"use client";

import { motion } from "framer-motion";

export default function ProjectCard({ project, index = 0 }) {
  const {
    name,
    tagline,
    description,
    category,
    icon,
    techStack = [],
    contributors = [],
    githubUrl,
    demoUrl,
    stars,
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] overflow-hidden"
    >
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 pointer-events-none transition-all duration-300" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/40 flex items-center justify-center text-2xl transition-colors">
            {icon || "🛡️"}
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors mb-1">
          {name}
        </h3>
        {tagline && (
          <p className="text-xs font-mono text-cyan-400/80 mb-3">
            // {tagline}
          </p>
        )}

        <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 mb-5">
          <p className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
            Contributors_
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {contributors.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 group/contributor"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white ring-1 ring-slate-700">
                  {c.avatar ? (
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    c.name.charAt(0)
                  )}
                </div>
                <div className="text-xs font-mono">
                  <span className="text-slate-200 hover:text-cyan-400 transition-colors">
                    {c.name}
                  </span>
                  <div className="flex gap-1.5 text-slate-500 text-[10px]">
                    {c.github && (
                      <a
                        href={c.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-cyan-400"
                      >
                        GitHub
                      </a>
                    )}
                    {c.linkedin && (
                      <a
                        href={c.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-400"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono text-slate-200 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Repository</span>
              {stars && (
                <span className="text-[10px] text-cyan-400">★ {stars}</span>
              )}
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-400 transition-all duration-200"
            >
              <span>Live Writeup</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}