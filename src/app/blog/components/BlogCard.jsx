"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TAG_COLORS = {
  "Web3": "from-purple-500/20 to-purple-500/10 border-purple-500/30 text-purple-300",
  "AI/ML": "from-emerald-500/20 to-emerald-500/10 border-emerald-500/30 text-emerald-300",
  "CyberSecurity": "from-red-500/20 to-red-500/10 border-red-500/30 text-red-300",
  "Development": "from-cyan-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-300",
  "Competitive Programming": "from-amber-500/20 to-amber-500/10 border-amber-500/30 text-amber-300",
  "Open Source": "from-green-500/20 to-green-500/10 border-green-500/30 text-green-300",
  "System Design": "from-indigo-500/20 to-indigo-500/10 border-indigo-500/30 text-indigo-300",
};

const DEFAULT_TAG_COLOR = "from-slate-500/20 to-slate-500/10 border-slate-500/30 text-slate-300";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogCard({ post, index = 0 }) {
  const {
    title,
    excerpt,
    tags = [],
    coverImage,
    author,
    date,
    readTime,
    slug,
  } = post;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-colors duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {coverImage ? (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        ) : (
          /* Fallback gradient */
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-slate-800 to-indigo-900/40 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />

        {/* Read time badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-sm text-xs text-slate-300 border border-slate-700/50 flex items-center gap-1">
          <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {readTime}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gradient-to-r ${
                  TAG_COLORS[tag] ?? DEFAULT_TAG_COLOR
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-200 cursor-pointer">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-5">
          {excerpt}
        </p>

        {/* Author Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-slate-700 group-hover:ring-cyan-500/40 transition-all duration-300 flex-shrink-0">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{author.name}</p>
              <p className="text-xs text-slate-500 truncate">{author.role}</p>
            </div>
          </div>

          {/* Date */}
          <span className="text-xs text-slate-500 flex-shrink-0">{date}</span>
        </div>
      </div>

      {/* Subtle corner glow on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
      </div>
    </motion.article>
  );
}
