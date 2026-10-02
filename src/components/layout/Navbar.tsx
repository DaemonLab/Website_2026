"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/software", label: "Software" },
  { href: "/contact", label: "Contact Us", isButton: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-navy/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-sm font-semibold tracking-[0.2em] text-foreground uppercase"
        >
          <span className="h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_#2563eb]" />
          <span>PClub</span>
          <span className="text-brand-light font-bold">IITI</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            if (link.isButton) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? "border-brand-light bg-brand-blue/30 text-white shadow-[0_0_18px_rgba(37,99,235,0.4)]"
                      : "border-brand-blue/40 bg-brand-blue/10 text-brand-light hover:border-brand-light hover:bg-brand-blue/20 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.25)]"
                  }`}
                >
                  <Mail size={14} />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-medium tracking-wider uppercase transition-colors ${
                  active ? "text-foreground font-semibold" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-brand-blue to-brand-light shadow-[0_0_8px_#2563eb]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground transition-colors hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            className="border-t border-white/5 bg-navy-mid/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between border-b border-white/5 font-mono text-sm tracking-wider uppercase ${
                      active ? "text-brand-light font-semibold" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_6px_#2563eb]" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
