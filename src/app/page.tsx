import HeroSection from "./components/HeroSection";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { StickerPlayground } from "./components/StickerPlayground";
import { CaseStudies } from "./components/CaseStudies";
import { Services } from "./components/Sevices";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { FinalCTA } from "./components/FinalCta";
import PackagesSection from "./components/PackagesSection";
import { ContactFormular } from "./components/ContactFormular";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <StickerPlayground />
        <Services />
        <PackagesSection />
        <Process />
        <Testimonials />
        <ContactFormular />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
