import Image from "next/image";
import HeroSection from "./components/HeroSection";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        
      </main>
      <Footer />
    </>
  );
}
