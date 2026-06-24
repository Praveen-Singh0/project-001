import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Services } from "@/components/Services";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { GlobalTrust } from "@/components/GlobalTrust";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { HomeEffects } from "@/components/home/HomeEffects";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DTECHEX — AI, Cloud & Digital Engineering",
  description:
    "DTECHEX empowers businesses with AI, Cloud, and Digital Engineering to drive innovation, automate operations, and accelerate growth.",
};

/** Server Component — statically generated at build time */
export default function HomePage() {
  return (
    <div className="home-shell font-sans">
      <HomeEffects /> 
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <WhyChooseUs />
        <Services />
        <TechStack />
        <Projects />
        <GlobalTrust />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
