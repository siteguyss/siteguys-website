import HeroSection from "./components/HeroSection";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { StickerPlayground } from "./components/StickerPlayground";
import { CaseStudies } from "./components/CaseStudies";
import { Services } from "./components/Sevices";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { FinalCTA } from "./components/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <StickerPlayground />
        <CaseStudies />
        <Services />
        <Process />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
