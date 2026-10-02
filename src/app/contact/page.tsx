import { HomeContactSection } from "@/components/home/HomeContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | Programming Club IIT Indore",
  },
  description:
    "Official contact channels, club identification, faculty advisor, software lead, and social media links for Programming Club IIT Indore.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-navy pt-16">
      <HomeContactSection />
    </main>
  );
}
