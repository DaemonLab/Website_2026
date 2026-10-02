"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/software/EventCard";
import { SoftwareSectionBackground } from "@/components/software/SoftwareSectionBackground";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { softwareEvents as fallbackSoftwareEvents } from "@/data/softwareEvents";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";
import type { SoftwareEvent } from "@/lib/types/software";
import { motion, useReducedMotion } from "framer-motion";

export function EventsSection() {
  const reduceMotion = useReducedMotion();
  const [events, setEvents] = useState<SoftwareEvent[]>(fallbackSoftwareEvents);

  useEffect(() => {
    let isMounted = true;
    async function loadEventsFromApi() {
      try {
        const res = await fetch("/api/events?domain=software");
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedEvents: SoftwareEvent[] = json.data.map((item: any) => ({
            id: item.id || item.slug,
            name: item.title,
            date: item.eventDate
              ? new Date(item.eventDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "TBA",
            description: item.description,
            type: (item.status === "UPCOMING" ? "Workshop" : "Sprint") as SoftwareEvent["type"],
            detailsUrl: `/join/software`,
            isPlaceholder: item.status === "UPCOMING",
          }));
          setEvents(mappedEvents);
        }
      } catch {
        // Silently retain static fallback softwareEvents
      }
    }
    loadEventsFromApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="events"
      className="relative scroll-mt-20 border-t border-white/5 py-24 sm:py-32"
    >
      <SoftwareSectionBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Software events"
          title="Sessions, sprints, and talks"
          description="Technical workshops, hackathons, and architecture discussions hosted by the Software domain."
        />
        <motion.div
          variants={staggerChildren(0.06)}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={fadeUp}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
