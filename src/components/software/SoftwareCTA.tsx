"use client";

import { CodeBackground } from "@/components/software/CodeBackground";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { ParticleText } from "@/components/ui/ParticleText";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import SpecularButton from "@/components/ui/SpecularButton";

export function SoftwareCTA() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  return (
    <section id="join" className="relative scroll-mt-20 overflow-hidden py-28 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18),transparent_60%)]" />
      <CodeBackground density="sparse" />

      <motion.div
        variants={fadeUp}
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-3xl px-5 text-center sm:px-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.25em] text-brand-light uppercase">
          <DecryptedText text="IDEA → BUILD" speed={40} maxIterations={10} />
        </div>

        <div className="mt-6 font-display">
          <ParticleText
            text="Have an idea worth building?"
            particleSize={1.6}
            density={4}
            color="#FFFFFF"
            highlightColor="#3B82F6"
            scatter={140}
            gatherDuration={1200}
            stagger={250}
            pointerRepel={28}
            repelRadius={90}
            idleDrift={0.25}
            trigger="hover"
            fontSize="clamp(1.75rem, 4.5vw, 3.5rem)"
            fontWeight={750}
            glow
          />
        </div>

        <p className="mt-5 text-base text-muted sm:text-lg max-w-xl mx-auto">
          Bring your curiosity, engineering vision, and code. Work with peers to build
          software systems that matter.
        </p>

        <div className="mt-9 inline-block">
          <SpecularButton
            size="lg"
            radius={24}
            tint="#2563eb"
            tintOpacity={0.3}
            lineColor="#60a5fa"
            baseColor="#2563eb"
            onClick={() => {
              router.push("/join/software");
            }}
          >
            <span>Join Software Domain</span>
            <ArrowRight size={16} />
          </SpecularButton>
        </div>

        <p className="mt-4 font-mono text-xs text-muted-dim">
          Official recruitment & project intake announcements will link here.
        </p>
      </motion.div>
    </section>
  );
}
