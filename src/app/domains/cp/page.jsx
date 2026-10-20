import Image from "next/image";

import BinaryRain from "@/app/components/cp/BinaryRain";
import CodeDiscScene from "@/app/components/cp/ThreeDcode";
import CPRoadmap from "@/app/components/cp/cp_roadmap";
import MembersGallery from "@/app/components/cp/MembersGallery";
import Navbar from "@/app/components/cp/Navbar";
import OverviewSection from "@/app/components/cp/OverviewSection";
import CPEvents from "@/app/components/cp/Cpevents";
import Achievements from "@/app/components/cp/Achievements";
import CPResourcesLoop from "@/app/components/cp/CPResourceLoop";
import FloatingHomeButton from "@/app/components/cp/HomeBtn";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BinaryRain />
      <Navbar />
      <FloatingHomeButton />

      {/* Hero / Overview Section */}
      <section
        id="overview"
        className="min-h-screen flex flex-col items-center justify-center pt-20 border-b border-slate-800/50"
      >
      <CodeDiscScene />
      <OverviewSection />
      </section>

      {/* Members Section */}
      <section
        id="members"
        className="min-h-screen flex items-center justify-center border-b border-slate-800/50"
      >
        <MembersGallery />
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="min-h-screen flex items-center justify-center border-b border-slate-800/50"
      >
        <CPEvents />
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="min-h-screen flex items-center justify-center border-b border-slate-800/50"
      >
        <Achievements />
      </section>

      {/* Roadmap Section */}
      <section
        id="roadmap"
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <CPRoadmap />
        <CPResourcesLoop />
      </section>
      

    </main>
  );
}
