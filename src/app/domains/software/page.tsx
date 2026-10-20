import type { Metadata } from "next";
import PixelSnow from "@/components/ui/PixelSnow";
import SplashCursor from "@/components/ui/SplashCursor";
import FloatingHomeBtn from "@/app/components/cp/HomeBtn"
// Components
import SoftwareNavbar from "@/app/components/software/Navbar";
import { SoftwareHero } from "@/app/components/software/SoftwareHero";
import { SoftwareOverview } from "@/app/components/software/SoftwareOverview";
import { DomainCapabilities } from "@/app/components/software/DomainCapabilities";
import { DevelopmentProcess } from "@/app/components/software/DevelopmentProcess";
import { ProjectsSection } from "@/app/components/software/ProjectsSection";
import { EventsSection } from "@/app/components/software/EventsSection";
import { TeamSection } from "@/app/components/software/TeamSection";
import { AchievementsSection } from "@/app/components/software/AchievementsSection";
import { SoftwareCTA } from "@/app/components/software/SoftwareCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Software | Programming Club IIT Indore",
  },
  description:
    "A domain of the Programming Club at IIT Indore focused on building software, exploring technologies and turning ideas into working products.",
};

export default function SoftwarePage() {
  return (
    <main className="flex-1 bg-navy relative isolate overflow-hidden text-white">
      {/* React Bits SplashCursor Fluid Interactive Trail */}
      <SplashCursor COLOR="#3b82f6" RAINBOW_MODE={false} SPLAT_RADIUS={0.2} SPLAT_FORCE={6000} />

      {/* React Bits PixelSnow WebGL Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <PixelSnow
          color="#3b82f6"
          flakeSize={0.012}
          minFlakeSize={1.25}
          pixelResolution={180}
          speed={1.0}
          density={0.25}
          direction={125}
          brightness={0.9}
          variant="square"
        />
      </div>

      <SoftwareNavbar />
      <FloatingHomeBtn />
      <div className="relative z-10">
        <section id="overview" className="min-h-screen flex flex-col justify-center border-b border-slate-800/50">
          <SoftwareHero />
          <SoftwareOverview />
        </section>

        <section id="capabilities" className="min-h-screen flex items-center justify-center border-b border-slate-800/50">
          <DomainCapabilities />
        </section>

        <section id="process" className="min-h-screen flex items-center justify-center border-b border-slate-800/50">
          <DevelopmentProcess />
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center border-b border-slate-800/50">
          <ProjectsSection />
        </section>

        <section id="events" className="min-h-screen flex items-center justify-center border-b border-slate-800/50">
          <EventsSection />
        </section>

        <section id="team" className="min-h-screen flex items-center justify-center border-b border-slate-800/50">
          <TeamSection />
        </section>

        <section id="achievements" className="min-h-screen flex flex-col justify-center">
          <AchievementsSection />
          <SoftwareCTA />
        </section>
      </div>
    </main>
  );
}