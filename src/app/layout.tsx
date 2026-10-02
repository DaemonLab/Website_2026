import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PixelBackground } from "@/components/ui/PixelBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Programming Club IIT Indore",
    template: "%s | Programming Club IIT Indore",
  },
  description:
    "Official website of the Programming Club at IIT Indore.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-navy text-foreground">
        <PixelBackground
          color="#3B82F6"
          flakeSize={0.006}
          minFlakeSize={1}
          pixelResolution={180}
          speed={0.35}
          density={0.12}
          direction={135}
          brightness={0.45}
          depthFade={10}
          farPlane={18}
          variant="square"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
