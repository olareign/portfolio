import { MachineFeed } from "@/components/MachineFeed";
import { HudBar } from "@/components/HudBar";
import { LeftRail } from "@/components/LeftRail";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Nodes } from "@/components/Nodes";
import { Capabilities } from "@/components/Capabilities";
import { Archive } from "@/components/Archive";
import { Dossier } from "@/components/Dossier";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { CommandConsole } from "@/components/CommandConsole";
import { SubjectLockSequence } from "@/components/SubjectLockSequence";
import { articles } from "@/content";

export default function Home() {
  const hasArchive = articles.length > 0;
  const dossierNum = hasArchive ? 6 : 5;
  const contactNum = hasArchive ? 7 : 6;

  return (
    <>
      <MachineFeed />
      <div className="scanlines" aria-hidden />
      <HudBar />
      <LeftRail />
      <main className="relative z-10 mx-auto max-w-[1440px] px-4 pt-10 sm:pl-14 sm:pr-8">
        <Hero />
        <Timeline num={2} />
        <Nodes num={3} />
        <Capabilities num={4} />
        <Archive num={5} />
        <Dossier num={dossierNum} />
        <Contact num={contactNum} />
      </main>
      <Footer />
      <MobileNav />
      <CommandConsole />
      <SubjectLockSequence />
    </>
  );
}
