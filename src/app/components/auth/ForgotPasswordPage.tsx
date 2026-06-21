import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

export function ForgotPasswordPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <AuthLayout tagline="We'll get you back in. Secure password recovery in seconds.">
      <div className="flex flex-col gap-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)", border: `1px solid ${isDark ? "rgba(0,229,255,0.2)" : "rgba(0,149,191,0.2)"}` }}>
          <Mail size={22} color={cyan} />
        </div>

        {!sent ? (
          <>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 8 }}>Forgot password?</h1>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                Enter your email and we'll send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handle} className="flex flex-col gap-4">
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: muted, display: "block", marginBottom: 6 }}>Email address</label>
                <div
                  className="relative flex items-center rounded-xl transition-all duration-200"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                    border: `1px solid ${focused ? (isDark ? "rgba(0,229,255,0.4)" : "rgba(0,149,191,0.4)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}`,
                    boxShadow: focused ? `0 0 0 3px ${isDark ? "rgba(0,229,255,0.07)" : "rgba(0,149,191,0.07)"}` : "none",
                  }}
                >
                  <Mail size={15} style={{ position: "absolute", left: 14, color: muted }} />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required
                    className="w-full py-3 pl-11 pr-4 bg-transparent outline-none text-sm"
                    style={{ color: fg }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #6C63FF)",
                  color: "#04050d",
                  boxShadow: isDark ? "0 0 25px rgba(0,229,255,0.25)" : "0 6px 20px rgba(0,149,191,0.35)",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
                ) : (
                  <><span>Send Reset Link</span><ArrowRight size={15} /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 8 }}>Check your inbox</h1>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                We sent a recovery link to{" "}
                <span style={{ color: cyan, fontWeight: 600 }}>{email}</span>.
                It expires in 15 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("reset-password")}
                className="w-full py-3.5 rounded-xl text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}
              >
                Open Reset Page →
              </button>
              <button
                onClick={() => setSent(false)}
                className="w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", color: muted, background: "transparent" }}
              >
                Try a different email
              </button>
            </div>
          </motion.div>
        )}

        <button
          onClick={() => navigate("login")}
          className="flex items-center gap-2 text-sm"
          style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cyan; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
        >
          <ArrowLeft size={13} /> Back to sign in
        </button>
      </div>
    </AuthLayout>
  );
}
