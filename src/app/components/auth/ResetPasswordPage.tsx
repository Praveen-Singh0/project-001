import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

function StrengthBar({ password }: { password: string }) {
  const { isDark } = useTheme();
  const calc = (): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: "", color: "transparent" };
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    const map = [
      { score: 0, label: "", color: "transparent" },
      { score: 1, label: "Weak", color: "#ff4d6d" },
      { score: 2, label: "Fair", color: "#fbbf24" },
      { score: 3, label: "Good", color: "#00BFFF" },
      { score: 4, label: "Strong", color: "#10b981" },
    ];
    return map[s] || map[0];
  };

  const { score, label, color } = calc();

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= score ? color : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)") }} />
        ))}
      </div>
      {label && <span style={{ fontSize: 11, color }}>{label}</span>}
    </div>
  );
}

export function ResetPasswordPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#00E5FF" : "#0095bf";

  const inputStyle = (focused: boolean) => ({
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
    border: `1px solid ${focused ? (isDark ? "rgba(0,229,255,0.4)" : "rgba(0,149,191,0.4)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}`,
  });

  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };

  return (
    <AuthLayout tagline="Choose a strong, unique password to keep your account secure.">
      {!done ? (
        <div className="flex flex-col gap-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: isDark ? "rgba(0,229,255,0.1)" : "rgba(0,149,191,0.1)", border: `1px solid ${isDark ? "rgba(0,229,255,0.2)" : "rgba(0,149,191,0.2)"}` }}
          >
            <Lock size={22} color={cyan} />
          </div>

          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 8 }}>Reset password</h1>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>Your link is valid for 15 minutes. Choose a strong password.</p>
          </div>

          <form onSubmit={handle} className="flex flex-col gap-4">
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: muted, display: "block", marginBottom: 6 }}>New password</label>
              <div className="relative flex items-center rounded-xl" style={inputStyle(f1)}>
                <Lock size={15} style={{ position: "absolute", left: 14, color: muted }} />
                <input type={showP ? "text" : "password"} placeholder="Min. 8 characters" value={password}
                  onChange={(e) => setPassword(e.target.value)} onFocus={() => setF1(true)} onBlur={() => setF1(false)}
                  className="w-full py-3 pl-11 pr-10 bg-transparent outline-none text-sm" style={{ color: fg }} required />
                <button type="button" onClick={() => setShowP((s) => !s)} className="absolute right-3 p-1"
                  style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}>
                  {showP ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <StrengthBar password={password} />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: muted, display: "block", marginBottom: 6 }}>Confirm password</label>
              <div className="relative flex items-center rounded-xl" style={inputStyle(f2)}>
                <Lock size={15} style={{ position: "absolute", left: 14, color: muted }} />
                <input type={showC ? "text" : "password"} placeholder="Repeat password" value={confirm}
                  onChange={(e) => setConfirm(e.target.value)} onFocus={() => setF2(true)} onBlur={() => setF2(false)}
                  className="w-full py-3 pl-11 pr-10 bg-transparent outline-none text-sm" style={{ color: fg }} required />
                <button type="button" onClick={() => setShowC((s) => !s)} className="absolute right-3 p-1"
                  style={{ color: muted, background: "none", border: "none", cursor: "pointer" }}>
                  {showC ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {confirm && confirm !== password && (
                <p style={{ fontSize: 11, color: "#ff4d6d", marginTop: 4 }}>Passwords don't match</p>
              )}
            </div>

            {/* Requirements */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "8+ characters", ok: password.length >= 8 },
                { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
                { label: "Number", ok: /[0-9]/.test(password) },
                { label: "Special character", ok: /[^A-Za-z0-9]/.test(password) },
              ].map((req) => (
                <div key={req.label} className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: req.ok ? "#10b981" : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)") }}>
                    {req.ok && <Check size={8} color="white" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: 11, color: req.ok ? (isDark ? "#c8d3e8" : "#4a5568") : muted }}>{req.label}</span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || password !== confirm || !password}
              className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d",
                opacity: (!password || password !== confirm) ? 0.5 : 1,
              }}
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
              ) : (<><span>Reset Password</span><ArrowRight size={15} /></>)}
            </button>
          </form>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <Check size={28} color="#10b981" />
          </div>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: fg, marginBottom: 8 }}>Password updated!</h2>
            <p style={{ fontSize: 14, color: muted }}>Your password has been changed. Sign in with your new credentials.</p>
          </div>
          <button
            onClick={() => navigate("login")}
            className="w-full py-3.5 rounded-xl text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #00E5FF, #6C63FF)", color: "#04050d" }}
          >
            Back to Sign In
          </button>
        </motion.div>
      )}
    </AuthLayout>
  );
}
