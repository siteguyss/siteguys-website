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
import { FAQSection } from "./components/FaqSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <Process />
        <StickerPlayground />
        <PackagesSection />
        <ContactFormular />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
