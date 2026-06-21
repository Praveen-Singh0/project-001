import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuroraBackground } from "./components/AuroraBackground";
import { ParticleField } from "./components/ParticleField";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { GlobalTrust } from "./components/GlobalTrust";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ServicesPage } from "./pages/ServicesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./components/auth/LoginPage";
import { SignUpPage } from "./components/auth/SignUpPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import { VerifyEmailPage } from "./components/auth/VerifyEmailPage";
import { TwoFAPage } from "./components/auth/TwoFAPage";
import { Dashboard } from "./components/dashboard/Dashboard";

/* Cursor spotlight effect */
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

function HomePage() {
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

function AppInner() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <CustomCursor />
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/2fa" element={<TwoFAPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </BrowserRouter>
  );
}
