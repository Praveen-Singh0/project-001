import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, RefreshCw, Check, ArrowRight } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

export function VerifyEmailPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleResend = () => {
    setResent(true);
    setCountdown(60);
    setTimeout(() => setResent(false), 3000);
  };

  const dots = Array.from({ length: 8 });

  return (
    <AuthLayout tagline="Almost there. Verify your email to unlock DTECHEX.">
      <div className="flex flex-col gap-6">
        {/* Animated envelope */}
        <div className="relative w-20 h-20">
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
              border: `1px solid ${isDark ? "rgba(0,229,255,0.2)" : "rgba(0,149,191,0.2)"}`,
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail size={32} color={cyan} />
          </motion.div>
          {dots.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? (isDark ? "#00E5FF" : "#0095bf") : (isDark ? "#6C63FF" : "#6C63FF"),
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos((i / 8) * Math.PI * 2) * 40],
                y: [0, Math.sin((i / 8) * Math.PI * 2) * 40],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>

        {!verified ? (
          <>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 8 }}>Check your inbox</h1>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.7 }}>
                We sent a verification link to{" "}
                <span style={{ color: cyan, fontWeight: 600 }}>sarah@acme.com</span>.
                Click the link to activate your account.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
              {[
                { step: "1", label: "Open your email client" },
                { step: "2", label: "Find the email from DTECHEX" },
                { step: "3", label: "Click \"Verify Email Address\"" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)", fontSize: 11, fontWeight: 700, color: cyan, fontFamily: "var(--font-mono)" }}>
                    {s.step}
                  </div>
                  <span style={{ fontSize: 13, color: isDark ? "#c8d3e8" : "#4a5568" }}>{s.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setVerified(true)}
              className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}
            >
              I've Verified My Email <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-between">
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: countdown > 0 ? muted : cyan, background: "none", border: "none", cursor: countdown > 0 ? "not-allowed" : "pointer" }}
              >
                <RefreshCw size={13} className={resent ? "animate-spin" : ""} />
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend email"}
              </button>
              <button onClick={() => navigate("login")} style={{ fontSize: 13, color: muted, background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}>
                Wrong email?
              </button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Check size={24} color="#10b981" />
            </div>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: fg, marginBottom: 6 }}>Email verified!</h2>
              <p style={{ fontSize: 14, color: muted }}>Your account is active. Let's set up 2FA for extra security.</p>
            </div>
            <button onClick={() => navigate("2fa")}
              className="w-full py-3.5 rounded-xl text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}>
              Set Up 2FA Security →
            </button>
            <button onClick={() => navigate("dashboard")} style={{ fontSize: 13, color: muted, background: "none", border: "none", cursor: "pointer", textAlign: "center" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}>
              Skip for now, go to dashboard →
            </button>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}
