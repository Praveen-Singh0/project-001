import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { AuroraBackground } from "../components/AuroraBackground";
import { ParticleField } from "../components/ParticleField";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { GlobalTrust } from "../components/GlobalTrust";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const { isDark } = useTheme();
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${isDark ? "rgba(0,229,255,0.04)" : "rgba(0,149,191,0.04)"} 0%, transparent 70%)`,
        transition: "background 0.08s",
      }}
    />
  );
}

export function ProjectsPage() {
  const { isDark } = useTheme();
  const bg = isDark
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 55%), #04050d"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,149,191,0.05) 0%, transparent 55%), #e8ecf7";

  return (
    <div style={{ background: bg, fontFamily: "var(--font-sans)" }}>
      <AuroraBackground />
      <ParticleField />
      <CursorSpotlight />
      <div className="relative z-10">
        <Navbar />
        <Projects />
        <GlobalTrust />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
