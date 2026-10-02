import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SoftwareApplicationForm from "@/components/join/SoftwareApplicationForm";
import { TechBackground } from "@/components/ui/TechBackground";
import { DecryptedText } from "@/components/ui/DecryptedText";
import BorderGlow from "@/components/ui/BorderGlow";
import SpecularButton from "@/components/ui/SpecularButton";
import PixelSnow from "@/components/ui/PixelSnow";
import SplashCursor from "@/components/ui/SplashCursor";
import {
  Code,
  Terminal,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle,
  FileCheck,
  Users,
  Rocket,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Join Software Domain | Programming Club IIT Indore",
  },
  description:
    "Apply to join the Software domain of Programming Club IIT Indore. Build production-grade web applications, developer tools, distributed systems, and AI software.",
};

const WHAT_YOULL_BUILD_CARDS = [
  {
    title: "Production Web Applications",
    tag: "FRONTEND & BACKEND",
    description:
      "Architect and ship full-stack web platforms using Next.js, TypeScript, Node.js, and high-performance database engines.",
    icon: Layers,
    glowColor: "217 91 60", // Royal Blue HSL
    colors: ["#2563eb", "#3b82f6", "#60a5fa"],
  },
  {
    title: "Developer Tools & CLIs",
    tag: "SYSTEMS & AUTOMATION",
    description:
      "Craft developer productivity utilities, command-line interfaces, git hooks, and automated deployment pipelines.",
    icon: Terminal,
    glowColor: "217 91 60",
    colors: ["#3b82f6", "#2563eb", "#1d4ed8"],
  },
  {
    title: "Cloud Infra & Microservices",
    tag: "INFRASTRUCTURE",
    description:
      "Build scalable APIs, containerized environments, reverse proxies, and resilient backend systems.",
    icon: Cpu,
    glowColor: "217 91 60",
    colors: ["#2563eb", "#60a5fa", "#3b82f6"],
  },
  {
    title: "Intelligent Software & AI",
    tag: "AI / ML INTEGRATION",
    description:
      "Integrate neural model inference, LLM-powered workflows, vector search, and data processing pipelines.",
    icon: Sparkles,
    glowColor: "217 91 60",
    colors: ["#60a5fa", "#2563eb", "#3b82f6"],
  },
];

const RECRUITMENT_STEPS = [
  {
    number: "01",
    title: "Application Review",
    subtitle: "Intent & Background",
    description:
      "We review your submitted application, technical interest, and statement of purpose to evaluate fit and domain motivation.",
    icon: FileCheck,
  },
  {
    number: "02",
    title: "Technical Discussion",
    subtitle: "Engineering Discussion",
    description:
      "An informal discussion or lightweight engineering challenge to explore your problem-solving style, preferred stack, and project goals.",
    icon: Users,
  },
  {
    number: "03",
    title: "Domain Onboarding",
    subtitle: "Ship Code & Contribute",
    description:
      "Welcome to the core team! Get access to internal GitHub organizations, team channels, and begin contributing to active projects.",
    icon: Rocket,
  },
];

export default function JoinSoftwarePage() {
  return (
    <main className="flex-1 bg-navy relative isolate overflow-hidden min-h-screen pb-24">
      {/* React Bits Fluid Cursor & Snow Animation */}
      <SplashCursor COLOR="#3b82f6" RAINBOW_MODE={false} SPLAT_RADIUS={0.2} SPLAT_FORCE={5000} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <PixelSnow
          color="#3b82f6"
          flakeSize={0.012}
          minFlakeSize={1.25}
          pixelResolution={180}
          speed={0.8}
          density={0.2}
          direction={125}
          brightness={0.85}
          variant="square"
        />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative isolate pt-28 pb-16 overflow-hidden">
          <TechBackground />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(37,99,235,0.2),transparent_65%)] pointer-events-none" />

          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            {/* Top Navigation Back Link */}
            <div className="mb-8 flex justify-center">
              <Link
                href="/software"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-slate-300 hover:border-brand-blue/40 hover:text-white transition-all group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Software Domain</span>
              </Link>
            </div>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.3em] text-brand-light uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
              <DecryptedText text="SOFTWARE DOMAIN RECRUITMENT" speed={30} maxIterations={8} />
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Build with us.
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-slate-300 sm:text-lg">
              Join the Software domain of Programming Club IIT Indore. Work alongside passionate developers to design, write, and scale systems, tools, and platforms that solve real-world problems.
            </p>
          </div>
        </section>

        {/* WHAT YOU'LL BUILD SECTION */}
        <section className="relative py-16 border-t border-white/5 bg-[#050B18]/60">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-brand-light uppercase">
                DOMAIN IMPACT
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                What You&apos;ll Build
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                From core infrastructure to user-facing applications, our members collaborate on end-to-end software solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WHAT_YOULL_BUILD_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <BorderGlow
                    key={idx}
                    backgroundColor="#071225"
                    glowColor={card.glowColor}
                    colors={card.colors}
                    borderRadius={20}
                    glowRadius={40}
                    glowIntensity={1.0}
                    fillOpacity={0.6}
                    className="p-6 transition-transform hover:-translate-y-1 duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-light">
                        <Icon size={24} />
                      </div>
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-brand-light/80 bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-md uppercase">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {card.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-300">
                      {card.description}
                    </p>
                  </BorderGlow>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section id="application-form" className="relative py-20 scroll-mt-20">
          <SoftwareApplicationForm />
        </section>

        {/* WHAT HAPPENS NEXT? 3-STEP RECRUITMENT PROCESS */}
        <section className="relative py-20 border-t border-white/5 bg-[#050B18]/80">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-brand-light uppercase">
                RECRUITMENT PIPELINE
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                What Happens Next?
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Our simple 3-step recruitment flow designed to welcome curious, motivated builders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {RECRUITMENT_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="relative rounded-2xl border border-white/10 bg-[#071225]/90 p-6 flex flex-col justify-between hover:border-brand-blue/50 transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-3xl font-bold text-brand-light/40">
                          {step.number}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/20 text-brand-light border border-brand-blue/30">
                          <Icon size={20} />
                        </div>
                      </div>

                      <span className="font-mono text-[10px] font-semibold tracking-wider text-brand-light uppercase">
                        {step.subtitle}
                      </span>

                      <h3 className="mt-1 font-display text-lg font-bold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <CheckCircle size={14} />
                      <span>Stage {idx + 1} Transparent Evaluation</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="relative py-20 border-t border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Want to explore domain projects first?
            </h2>
            <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
              Check out current software initiatives, open repos, team members, and event schedules on our main domain page.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/software">
                <SpecularButton
                  size="lg"
                  radius={24}
                  tint="#2563eb"
                  tintOpacity={0.3}
                  lineColor="#60a5fa"
                  baseColor="#2563eb"
                >
                  <div className="flex items-center gap-2">
                    <span>EXPLORE SOFTWARE</span>
                    <ArrowRight size={16} />
                  </div>
                </SpecularButton>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
