import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
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
        background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${isDark ? "rgba(58,229,178,0.04)" : "rgba(15,164,126,0.04)"} 0%, transparent 70%)`,
        transition: "background 0.08s",
      }}
    />
  );
}

function HomePage() {
  const { isDark } = useTheme();
  const bg = isDark
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,229,178,0.07) 0%, transparent 55%), #04050d"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,164,126,0.05) 0%, transparent 55%), #e8ecf7";

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

function AppRouter() {
  const { page } = useNavigation();

  if (page === "dashboard") return <Dashboard />;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {page === "home" && <HomePage />}
        {page === "login" && <LoginPage />}
        {page === "signup" && <SignUpPage />}
        {page === "forgot-password" && <ForgotPasswordPage />}
        {page === "reset-password" && <ResetPasswordPage />}
        {page === "verify-email" && <VerifyEmailPage />}
        {page === "2fa" && <TwoFAPage />}
      </motion.div>
    </AnimatePresence>
  );
}

function AppInner() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {loaded && (
        <>
          <CustomCursor />
          <AppRouter />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppInner />
      </NavigationProvider>
    </ThemeProvider>
  );
}
