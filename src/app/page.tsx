import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/Ticker";
import WorkSection from "@/components/WorkSection";
import DesignSection from "@/components/DesignSection";
import ToolsSection from "@/components/ToolsSection";
import AboutStrip from "@/components/AboutStrip";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <HeroSection />
      <Ticker />
      <WorkSection />
      <DesignSection />
      <ToolsSection />
      <AboutStrip />
      <Footer />
    </>
  );
}
