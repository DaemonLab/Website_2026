"use client";

import { BorderGlow } from "@/components/ui/BorderGlow";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { LetterGlitch } from "@/components/ui/LetterGlitch";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { clubContactData } from "@/data/clubContact";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  UserCheck,
} from "lucide-react";

import { useState, useEffect } from "react";

export function HomeContactSection() {
  const reduceMotion = useReducedMotion();
  const [contactData, setContactData] = useState<typeof clubContactData>(clubContactData);

  useEffect(() => {
    let isMounted = true;
    async function loadContactInfo() {
      try {
        const res = await fetch("/api/contact/info");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setContactData(json.data);
        }
      } catch {
        // Silently retain verified static fallback
      }
    }
    loadContactInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const {
    clubName,
    clubId,
    institution,
    campusAddress,
    officialEmail,
    facultyCoordinator,
    domainLeads,
    socialLinks,
  } = contactData;

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-navy py-24 border-t border-white/5 scroll-mt-16"
    >
      {/* React Bits LetterGlitch Matrix Code Stream Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <LetterGlitch
          glitchColors={["#071225", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"]}
          backgroundColor="#050B18"
          glitchSpeed={55}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* Ambient background glow gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(37,99,235,0.14),transparent_65%)] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-brand-light uppercase">
              <DecryptedText text="CONTACT / CONNECT" speed={30} maxIterations={8} />
            </span>
          </div>

          <div className="mt-5">
            <MaskedHeading
              text="Let's Build Something Together"
              tag="h1"
              align="left"
              reveal="rise"
              trigger="view"
              weight={800}
              textScale={0.065}
              fillScale={1.3}
              parallax={30}
            />
          </div>

          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Connect with Programming Club IIT Indore for technical collaborations, student projects,
            workshops, sponsorships, and institutional inquiries.
          </p>
        </motion.div>

        {/* Content Layout Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
          {/* LEFT COLUMN: Official Contact Channels Grid */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Domain Leads Cards */}
            {domainLeads.map((lead) => (
              <BorderGlow
                key={lead.role}
                borderRadius={16}
                glowRadius={30}
                edgeSensitivity={35}
                backgroundColor="#071225"
                colors={["#2563eb", "#3b82f6", "#60a5fa"]}
              >
                <div className="flex flex-col justify-between p-5 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-blue/30 bg-brand-blue/10 text-brand-light">
                        <UserCheck size={20} />
                      </div>
                      <span className="font-mono text-[9px] font-semibold tracking-wider text-brand-light uppercase">
                        LEAD
                      </span>
                    </div>
                    <span className="mt-4 block font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                      {lead.role}
                    </span>
                    <h3 className="font-display mt-1 text-base font-semibold text-foreground">
                      {lead.name}
                    </h3>
                    <a
                      href={`mailto:${lead.email}`}
                      className="mt-1 block font-mono text-xs text-brand-light hover:underline"
                    >
                      {lead.email}
                    </a>
                  </div>

                  {lead.linkedinUrl && (
                    <a
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-muted-dim transition-colors hover:text-brand-light"
                    >
                      <span>Connect on LinkedIn</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </BorderGlow>
            ))}

            {/* Faculty Advisor / Coordinator */}
            <BorderGlow
              borderRadius={16}
              glowRadius={30}
              edgeSensitivity={35}
              backgroundColor="#071225"
              colors={["#2563eb", "#3b82f6", "#60a5fa"]}
            >
              <div className="flex flex-col justify-between p-5 h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted">
                      <GraduationCap size={20} />
                    </div>
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-muted-dim uppercase">
                      FACULTY
                    </span>
                  </div>
                  <span className="mt-4 block font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                    {facultyCoordinator.designation}
                  </span>
                  <h3 className="font-display mt-1 text-base font-semibold text-foreground">
                    {facultyCoordinator.name || "Faculty Advisor"}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted-dim">
                    {facultyCoordinator.department}
                  </p>
                </div>

                <span className="mt-4 font-mono text-[10px] text-muted-dim">
                  {facultyCoordinator.email ? facultyCoordinator.email : "Official Coordinator Contact"}
                </span>
              </div>
            </BorderGlow>

            {/* Card: Official Email */}
            <BorderGlow
              className="sm:col-span-2"
              borderRadius={16}
              glowRadius={30}
              edgeSensitivity={35}
              backgroundColor="#071225"
              colors={["#2563eb", "#3b82f6", "#60a5fa"]}
            >
              <div className="p-5 h-full flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-blue/30 bg-brand-blue/10 text-brand-light">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                    Official Communication Email
                  </span>
                  <h3 className="font-display mt-0.5 text-base font-semibold text-foreground">
                    Programming Club • IIT Indore
                  </h3>
                  <a
                    href={`mailto:${officialEmail}`}
                    className="mt-1 block font-mono text-xs text-brand-light hover:underline"
                  >
                    {officialEmail}
                  </a>
                </div>
              </div>
            </BorderGlow>

            {/* Card: Institution Address */}
            <BorderGlow
              className="sm:col-span-2"
              borderRadius={16}
              glowRadius={30}
              edgeSensitivity={35}
              backgroundColor="#071225"
              colors={["#2563eb", "#3b82f6", "#60a5fa"]}
            >
              <div className="p-5 h-full flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                    Campus Location
                  </span>
                  <h3 className="font-display mt-0.5 text-sm font-semibold text-foreground">
                    {institution}
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {campusAddress}
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* RIGHT COLUMN: Official Club Information Card with BorderGlow */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <BorderGlow
              colors={["#2563eb", "#3b82f6", "#60a5fa"]}
              glowRadius={300}
              glowIntensity={0.7}
              borderRadius={16}
            >
              <div className="p-6 sm:p-7">
                {/* Header Terminal Telemetry Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-brand-light uppercase">
                      OFFICIAL CLUB REGISTRY
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-muted-dim">
                    IITI.PCLUB // 2026
                  </span>
                </div>

                {/* Main Identity Information */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-dim uppercase">
                      ORGANIZATION
                    </span>
                    <p className="font-display mt-1 text-lg font-bold text-foreground">
                      {clubName}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-dim uppercase">
                      INSTITUTION
                    </span>
                    <p className="font-mono text-xs font-semibold text-brand-light mt-0.5">
                      {institution}
                    </p>
                  </div>

                  {clubId && (
                    <div>
                      <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-dim uppercase">
                        CLUB REGISTRATION ID
                      </span>
                      <p className="font-mono text-xs font-bold text-foreground mt-0.5">
                        {clubId}
                      </p>
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-dim uppercase">
                      ACTIVE DOMAINS
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-light uppercase">
                        Software Engineering
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-semibold text-muted-dim uppercase">
                        Competitive Programming
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-semibold text-muted-dim uppercase">
                        Cybersecurity
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Media & Official Channels */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-muted-dim uppercase block mb-3">
                    OFFICIAL CHANNELS & LINKS
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs font-medium text-foreground transition-all duration-200 hover:border-brand-light/40 hover:bg-brand-blue/10 hover:text-brand-light"
                      >
                        <GithubIcon size={15} />
                        <span>GitHub</span>
                      </a>
                    )}

                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs font-medium text-foreground transition-all duration-200 hover:border-brand-light/40 hover:bg-brand-blue/10 hover:text-brand-light"
                      >
                        <LinkedinIcon size={15} />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-xs font-medium text-foreground transition-all duration-200 hover:border-brand-light/40 hover:bg-brand-blue/10 hover:text-brand-light"
                      >
                        <InstagramIcon size={15} />
                        <span>Instagram</span>
                      </a>
                    )}

                    <a
                      href={`mailto:${officialEmail}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-blue/40 bg-brand-blue/10 px-3.5 py-2 font-mono text-xs font-medium text-brand-light transition-all duration-200 hover:border-brand-light hover:bg-brand-blue/20 hover:text-white"
                    >
                      <Mail size={15} />
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
