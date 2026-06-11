import Nav from "@/components/Nav";
import HeroV2 from "@/components/HeroV2";
import TelemetryStrip from "@/components/TelemetryStrip";
import SixtySecondStudy from "@/components/SixtySecondStudy";
import ToolsEngine from "@/components/ToolsEngine";
import NowBuilding from "@/components/NowBuilding";
import PathsCTA from "@/components/PathsCTA";
import Colophon from "@/components/Colophon";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <HeroV2 />
      <TelemetryStrip />
      <SixtySecondStudy />
      <ToolsEngine />
      <NowBuilding />
      <PathsCTA />
      <Colophon />
      <Footer />
    </>
  );
}
