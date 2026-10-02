"use client";

import { BorderGlow } from "@/components/ui/BorderGlow";
import type { SoftwareEvent } from "@/lib/types/software";
import { ArrowUpRight, Calendar } from "lucide-react";

interface EventCardProps {
  event: SoftwareEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <BorderGlow glowIntensity={0.55} borderRadius={18} className="h-full">
      <div className="group relative flex h-full flex-col justify-between p-6 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-0.5 font-mono text-[10px] font-medium tracking-wider text-brand-light uppercase">
              {event.type}
            </span>
            {event.isPlaceholder ? (
              <span className="font-mono text-[10px] font-medium text-muted-dim uppercase">
                Upcoming
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-brand-light transition-colors">
            {event.name}
          </h3>

          <div className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-muted-dim">
            <Calendar size={13} className="text-brand-light" />
            <span>{event.date}</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {event.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          {event.detailsUrl ? (
            <a
              href={event.detailsUrl}
              className="inline-flex items-center gap-1 font-mono text-xs font-medium text-brand-light group-hover:text-white transition-colors"
            >
              <span>Registration Details</span>
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="font-mono text-xs text-muted-dim">Details launching soon</span>
          )}
        </div>
      </div>
    </BorderGlow>
  );
}
