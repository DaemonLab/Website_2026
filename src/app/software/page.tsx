import { AchievementsSection } from "@/components/software/AchievementsSection";
import { DevelopmentProcess } from "@/components/software/DevelopmentProcess";
import { DomainCapabilities } from "@/components/software/DomainCapabilities";
import { EventsSection } from "@/components/software/EventsSection";
import { ProjectsSection } from "@/components/software/ProjectsSection";
import { SoftwareCTA } from "@/components/software/SoftwareCTA";
import { SoftwareHero } from "@/components/software/SoftwareHero";
import { SoftwareOverview } from "@/components/software/SoftwareOverview";
import { TeamSection } from "@/components/software/TeamSection";
import PixelSnow from "@/components/ui/PixelSnow";
import SplashCursor from "@/components/ui/SplashCursor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Software | Programming Club IIT Indore",
  },
  description:
    "A domain of the Programming Club at IIT Indore focused on building software, exploring technologies and turning ideas into working products.",
};

export default function SoftwarePage() {
  return (
    <main className="flex-1 bg-navy relative isolate overflow-hidden">
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

      <div className="relative z-10">
        <SoftwareHero />
        <SoftwareOverview />
        <DomainCapabilities />
        <DevelopmentProcess />
        <ProjectsSection />
        <EventsSection />
        <TeamSection />
        <AchievementsSection />
        <SoftwareCTA />
      </div>
    </main>
  );
}
