// app/page.jsx
import Link from "next/link";
import Navbar from "./components/home/Home_nav";
import ThreeHeroCanvas from "./components/home/hero_bg";
import HomeHero from "./components/home/Home_hero";
import DomainsOverview from "./components/home/DomainsOverview";
import ShapeGrid from "./components/home/ShapeGrid";

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-white flex flex-col items-center justify-center p-8 space-y-6">
        <div className=" fixed inset-0">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#00004f"
          hoverFillColor="#00f"
          shape="square"
          hoverTrailAmount={2}
          hoverColor="#222222"
          size={40}
        />
      </div>
        <ThreeHeroCanvas />
        <Navbar />
        <HomeHero />
        <DomainsOverview />
    </main>
  );
}