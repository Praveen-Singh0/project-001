import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, Chrome, Github, ArrowRight } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../contexts/NavigationContext";

function GlassInput({ icon: Icon, type, placeholder, value, onChange, label }: {
  icon: typeof Mail; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; label: string;
}) {
  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const actualType = type === "password" && show ? "text" : type;

  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: isDark ? "#8892b0" : "#6271a0", display: "block", marginBottom: 6 }}>{label}</label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${focused ? (isDark ? "rgba(58,229,178,0.4)" : "rgba(15,164,126,0.4)") : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)")}`,
          boxShadow: focused ? (isDark ? "0 0 0 3px rgba(58,229,178,0.07), inset 0 0 0 1px rgba(58,229,178,0.1)" : "0 0 0 3px rgba(15,164,126,0.07)") : "none",
        }}
      >
        <Icon size={15} style={{ position: "absolute", left: 14, color: isDark ? "#8892b0" : "#6271a0", flexShrink: 0 }} />
        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3 pl-11 pr-4 bg-transparent outline-none text-sm"
          style={{ color: isDark ? "#f0f4ff" : "#0d0f1e" }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 p-1"
            style={{ color: isDark ? "#8892b0" : "#6271a0", background: "none", border: "none", cursor: "pointer" }}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function LoginPage() {
  const { isDark } = useTheme();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("2fa"); }, 1400);
  };

  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cyan = isDark ? "#3AE5B2" : "#0FA47E";
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <AuthLayout tagline="Welcome back. Your AI-powered enterprise awaits.">
      <div className="flex flex-col gap-6">
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 6 }}>Sign in</h1>
          <p style={{ fontSize: 14, color: muted }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("signup")} style={{ color: cyan, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
              Create one
            </button>
          </p>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Chrome, label: "Google" },
            { icon: Github, label: "GitHub" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                color: fg,
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = cardBorder; }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }} />
          <span style={{ fontSize: 12, color: muted }}>or continue with email</span>
          <div className="flex-1 h-px" style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handle} className="flex flex-col gap-4">
          <GlassInput icon={Mail} type="email" placeholder="you@company.com" value={email} onChange={setEmail} label="Email address" />
          <div>
            <GlassInput icon={Lock} type="password" placeholder="••••••••" value={password} onChange={setPassword} label="Password" />
            <button
              type="button"
              onClick={() => navigate("forgot-password")}
              className="mt-2 text-xs font-semibold"
              style={{ color: cyan, background: "none", border: "none", cursor: "pointer", float: "right" }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 mt-2"
            style={{
              background: loading ? "rgba(58,229,178,0.4)" : "linear-gradient(135deg, #3AE5B2, #6C63FF)",
              color: "#04050d",
              boxShadow: loading ? "none" : (isDark ? "0 0 25px rgba(58,229,178,0.25)" : "0 6px 20px rgba(15,164,126,0.35)"),
            }}
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 rounded-full" style={{ borderColor: "#04050d transparent transparent transparent" }} />
            ) : (
              <><span>Sign in to DTECHEX</span><ArrowRight size={15} /></>
            )}
          </button>
        </form>

        {/* Dashboard preview CTA */}
        <button
          onClick={() => navigate("dashboard")}
          className="w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
          style={{
            background: "transparent",
            borderColor: isDark ? "rgba(58,229,178,0.2)" : "rgba(15,164,126,0.25)",
            color: cyan,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(58,229,178,0.05)" : "rgba(15,164,126,0.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          Preview Dashboard →
        </button>

        <p style={{ fontSize: 11, color: muted, textAlign: "center" }}>
          By signing in, you agree to our{" "}
          <span style={{ color: cyan, cursor: "pointer" }}>Terms of Service</span> and{" "}
          <span style={{ color: cyan, cursor: "pointer" }}>Privacy Policy</span>.
        </p>
      </div>
    </AuthLayout>
  );
}
