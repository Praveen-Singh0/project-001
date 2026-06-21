import { type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Zap, Brain, Cloud, Shield } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

const features = [
  { icon: Brain, text: "AI-powered business intelligence" },
  { icon: Cloud, text: "Multi-cloud infrastructure at scale" },
  { icon: Shield, text: "Enterprise-grade security & compliance" },
  { icon: Zap, text: "Real-time automation & analytics" },
];

interface AuthLayoutProps {
  children: ReactNode;
  tagline?: string;
  visual?: "globe" | "dashboard";
}

function AnimatedOrb({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid rgba(0,229,255,${0.15 - i * 0.04})`,
            scale: 0.6 + i * 0.2,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center orb */}
      <div
        className="absolute inset-0 m-auto flex items-center justify-center rounded-full"
        style={{
          width: 100,
          height: 100,
          background:
            "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(108,99,255,0.2))",
          border: "1px solid rgba(0,229,255,0.4)",
          boxShadow:
            "0 0 40px rgba(0,229,255,0.2), inset 0 0 30px rgba(108,99,255,0.15)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00E5FF, #6C63FF)",
            boxShadow: "0 0 20px rgba(0,229,255,0.4)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 800,
              fontSize: 16,
              color: "#04050d",
            }}
          >
            DX
          </span>
        </div>
      </div>

      {/* Floating dots */}
      {[
        { top: "8%", left: "50%", color: "#00E5FF", delay: 0 },
        { top: "50%", left: "4%", color: "#6C63FF", delay: 0.5 },
        { top: "50%", right: "4%", color: "#00BFFF", delay: 1 },
        { top: "88%", left: "50%", color: "#a78bfa", delay: 1.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            ...dot,
            background: dot.color,
            boxShadow: `0 0 8px ${dot.color}`,
            marginLeft: -6,
            marginTop: -6,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, delay: dot.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export function AuthLayout({
  children,
  tagline = "The intelligent enterprise platform for tomorrow's leaders.",
}: AuthLayoutProps) {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: isDark ? "#04050d" : "#e8ecf7",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Left panel — visual / brand */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-12 relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #0a0e1e 0%, #060914 100%)"
            : "linear-gradient(145deg, #1a1d3a 0%, #0d0f26 100%)",
          borderRight: isDark
            ? "1px solid rgba(0,229,255,0.08)"
            : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "-20%",
              width: "80%",
              height: "80%",
              background:
                "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              right: "-20%",
              width: "70%",
              height: "70%",
              background:
                "radial-gradient(ellipse, rgba(108,99,255,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src="/assets/img/logo.png"
              alt="DTechEx"
              className="h-14 w-auto object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(79%) sepia(30%) saturate(934%) hue-rotate(103deg) brightness(94%) contrast(90%)",
              }}
            />{" "}
          </button>
        </div>

        {/* Orb visual */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <AnimatedOrb isDark={true} />
          <div className="text-center">
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#f0f4ff",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}
            >
              {tagline}
            </p>
          </div>
        </div>

        {/* Feature list */}
        <div className="relative z-10 flex flex-col gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.2)",
                }}
              >
                <f.icon size={13} color="#00E5FF" />
              </div>
              <span style={{ fontSize: 13, color: "rgba(240,244,255,0.65)" }}>
                {f.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Subtle bg texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 60% 50% at 60% 30%, rgba(108,99,255,0.05) 0%, transparent 70%)"
              : "radial-gradient(ellipse 60% 50% at 60% 30%, rgba(108,99,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate("home")}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm transition-all duration-200"
          style={{
            color: isDark ? "#8892b0" : "#6271a0",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = isDark
              ? "#f0f4ff"
              : "#0d0f1e";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = isDark
              ? "#8892b0"
              : "#6271a0";
          }}
        >
          <ArrowLeft size={14} />
          Back to site
        </button>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
