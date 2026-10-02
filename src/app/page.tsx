import { DecryptedText } from "@/components/ui/DecryptedText";
import { ElectricLogo } from "@/components/ui/ElectricLogo";
import SpecularButton from "@/components/ui/SpecularButton";
import Threads from "@/components/ui/Threads";
import { ArrowRight, Code2, Cpu, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20 relative isolate overflow-hidden">
      {/* React Bits Threads WebGL Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Threads amplitude={1} distance={0.1} enableMouseInteraction={true} color={[0.23, 0.51, 0.96]} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16">
          <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.25em] text-brand-light uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
              <DecryptedText text="Programming Club • IIT Indore" speed={30} maxIterations={8} />
            </div>

            {/* Centerpiece Electric Logo */}
            <div className="mt-8 flex justify-center">
              <ElectricLogo
                className="w-36 h-36 sm:w-44 sm:h-44"
                color="#FFFFFF"
                glowColor="#2563EB"
                scale={0.7}
              />
            </div>

            {/* Main Title */}
            <h1 className="font-display mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Architecting the <span className="text-brand-light">Future of Code.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl mx-auto text-base text-muted sm:text-lg leading-relaxed">
              The premier technical student organization at Indian Institute of Technology Indore.
              Fostering innovation across software engineering, algorithms, and cybersecurity.
            </p>

            {/* Primary CTA Button */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/software">
                <SpecularButton
                  size="lg"
                  radius={24}
                  tint="#2563eb"
                  tintOpacity={0.3}
                  lineColor="#60a5fa"
                  baseColor="#2563eb"
                >
                  <span>Explore Software Domain</span>
                  <ArrowRight size={16} />
                </SpecularButton>
              </Link>
            </div>
          </div>
        </section>

      {/* Technical Domains Grid Section */}
      <section className="relative py-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="font-mono text-xs font-semibold tracking-[0.25em] text-brand-light uppercase">
              Club Divisions
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Technical Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Domain 1: Software Engineering (Active) */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-brand-blue/40 bg-navy-card/90 p-7 shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 hover:border-brand-light hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-blue/30 bg-brand-blue/10 text-brand-light">
                    <Code2 size={24} />
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                    ACTIVE
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-foreground">
                  Software Engineering
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Building full-stack web applications, AI tools, developer platforms, and cloud infrastructure.
                </p>
              </div>

              <Link
                href="/software"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-brand-light group-hover:text-white transition-colors"
              >
                <span>ENTER DOMAIN</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Domain 2: Competitive Programming */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-card/50 p-7 opacity-75">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted">
                    <Cpu size={24} />
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                    COMING SOON
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-foreground">
                  Competitive Programming
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Algorithmic problem solving, data structures, Codeforces contests, and ICPC training.
                </p>
              </div>

              <span className="mt-8 font-mono text-xs tracking-wider text-muted-dim">
                IN PREPARATION
              </span>
            </div>

            {/* Domain 3: Cybersecurity */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-card/50 p-7 opacity-75">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-muted-dim uppercase">
                    COMING SOON
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-foreground">
                  Cybersecurity & CTF
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Ethical hacking, binary exploitation, cryptography, network security, and CTF competitions.
                </p>
              </div>

              <span className="mt-8 font-mono text-xs tracking-wider text-muted-dim">
                IN PREPARATION
              </span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
