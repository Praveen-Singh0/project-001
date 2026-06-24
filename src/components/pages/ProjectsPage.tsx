"use client"
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  MapPin,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Quote,
  Globe,
  Smartphone,
  Cloud,
  ShoppingBag,
} from "lucide-react";

import { projects } from "./projects";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";



interface Metric {
  label: string;
  value: string;
}

interface Testimonial {
  author: string;
  designation: string;
  company: string;
  review: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  industry: string;
  location: string;
  budget: string;
  color: string;
  overview: string;
  description: string;
  scope: string[];
  technologies: string[];
  tags: string[];
  challenge: string;
  solution: string;
  features: string[];
  results: string[];
  businessValue: string[];
  metrics: Metric[];
  testimonial: Testimonial;
  deliverables: string[];
  projectType: string;
  status: string;
  platform: string;
  productLink: string;
}



const tagIcons = [
  <svg key="a" width="11" height="11" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="b" width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M6 2L11 10H1L6 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
  <svg key="c" width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M7 1L3 7h4l-2 4 6-6H7L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>,
];

function MockScreen({ color, size = "md" }: { color: string; size?: "sm" | "md" | "lg" }) {
  const heights = size === "lg" ? [70, 45, 85, 55, 30] : [70, 45, 85, 55];
  const bars = size === "lg" ? [40, 65, 50, 80, 55, 90, 70, 45, 62] : [40, 65, 50, 80, 55, 90, 70];

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: color, opacity: 0.9 }} />
      <div className="p-3 flex flex-col gap-1.5 mt-2">
        {heights.map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="rounded"
              style={{ width: `${w}%`, height: 6, background: i === 0 ? color : "rgba(255,255,255,0.08)", opacity: i === 0 ? 0.55 : 1 }}
            />
          </div>
        ))}
        <div className="flex items-end gap-1 mt-1.5" style={{ height: size === "lg" ? 56 : 40 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === bars.length - 2 ? color : "rgba(255,255,255,0.09)", opacity: i === bars.length - 2 ? 0.7 : 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Floating phone mockup for case study hero
function PhoneMockup({ color, index }: { color: string; index: number }) {
  const isMain = index === 0;
  return (
    <div
      className="relative rounded-3xl overflow-hidden flex-shrink-0"
      style={{
        width: isMain ? 160 : 130,
        height: isMain ? 300 : 240,
        background: "linear-gradient(145deg, #111820 0%, #0a0d13 100%)",
        border: `1px solid rgba(255,255,255,0.1)`,
        boxShadow: isMain ? `0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)` : `0 20px 40px rgba(0,0,0,0.5)`,
        transform: index === 1 ? "translateY(20px) translateX(-10px)" : index === 2 ? "translateY(-10px) translateX(-5px)" : "none",
        zIndex: isMain ? 3 : 2 - index,
      }}
    >
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
      {/* Screen content */}
      <div className="absolute inset-x-2 top-8 bottom-2 rounded-2xl overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(ellipse at 50% 20%, ${color}22 0%, transparent 65%)` }} />
        {/* App UI simulation */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full" style={{ background: `${color}30`, border: `1px solid ${color}60` }} />
            <div className="flex-1 h-1.5 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
          <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          {[90, 60, 75, 45].map((w, i) => (
            <div key={i} className="h-1.5 rounded" style={{ width: `${w}%`, background: i === 0 ? `${color}40` : "rgba(255,255,255,0.07)" }} />
          ))}
          <div className="mt-2 rounded-lg p-2" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: color, opacity: 0.7 }} />
              <div className="h-1 rounded flex-1" style={{ background: `${color}40` }} />
            </div>
            <div className="flex items-end gap-0.5 h-10">
              {[30, 60, 45, 80, 50, 70, 40].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 3 ? color : `${color}25` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProjectCard({ project  , onClick }: { project: Project; featured?: boolean; onClick: () => void }) {
  const col = project.color;
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(145deg, #0e1117 0%, #0a0d13 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 85% 15%, ${col}22 0%, transparent 55%)` }} />
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at 85% 15%, ${col}33 0%, transparent 55%)` }} />

      <div className={`relative z-10 flex ${ "flex-col"} h-full`}>
        <div className={`flex flex-col p-5 ${ " "}`}>
          <div className="flex items-start justify-between mb-4">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{ background: `${col}18`, border: `1px solid ${col}35`, color: col }}
            >
              {project.category}
            </span>
          </div>
          <h3 className="font-bold mb-1 leading-tight" style={{ color: "#f0f4f8", fontSize:  "1.15rem", letterSpacing: "-0.02em" }}>
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "#7a8394", maxWidth:  undefined }}>
            {project.description}
          </p>
          <div className="flex items-center gap-1.5 mb-auto">
            <MapPin size={11} style={{ color: col }} />
            <span className="text-[11px]" style={{ color: col }}>{project.location}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag, i) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#8b95a5" }}>
                <span style={{ color: col }}>{tagIcons[i % 3]}</span>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:gap-2.5" style={{ color: col }}>
              View Case Study <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
        
          <div className="mx-4 mb-4 h-28 shrink-0"><MockScreen color={col} /></div>
        
      </div>
    </div>
  );
}

// ─── Case Study Detail View ──────────────────────────────────────────────────

function CaseStudyDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const col = project.color;

  const PlatformIcon = project.platform === "Android" || project.platform.includes("Mobile") ? Smartphone
    : project.platform.includes("Cloud") ? Cloud
    : project.platform.includes("E-Commerce") ? ShoppingBag
    : Globe;

  return (
    <div className="min-h-screen" style={{ background: "#070b10", fontFamily: "'Inter', sans-serif" }}>

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden mt-18" style={{ background: "linear-gradient(180deg, #0b1018 0%, #070b10 100%)" }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 70% 40%, ${col}14 0%, transparent 60%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 80%, ${col}08 0%, transparent 50%)` }} />

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Back link */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs mb-8 transition-all duration-200 hover:gap-3"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft size={13} />
            Back to Our Work
          </button>

          <div className="flex items-start justify-between gap-12">
            {/* Left content */}
            <div className="flex-1 max-w-xl">
              {/* Label */}
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4" style={{ color: col }}>
                Featured Project
              </p>

              {/* Title */}
              <h1
                className="font-bold mb-2 leading-none"
                style={{ color: "#edf0f4", fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.035em" }}
              >
                {project.title}
              </h1>
              <p className="text-base mb-5" style={{ color: col, opacity: 0.85 }}>
                {project.subtitle}
              </p>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "#6b7585", maxWidth: 440 }}>
                {project.overview}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: `${col}15`, border: `1px solid ${col}30`, color: col }}
                  >
                    <span style={{ color: col }}>{tagIcons[i % 3]}</span>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:opacity-85 hover:scale-[1.02]"
                  style={{ background: col, color: "#070b10" }}
                >
                  View Live App
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#c8d0db" }}
                >
                  {project.productLink}
                  <ExternalLink size={11} />
                </button>
              </div>

              {/* Bottom metadata strip */}
              <div className="flex items-center gap-6 mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "Client", value: project.title },
                  { label: "Industry", value: project.industry },
                  { label: "Location", value: project.location },
                  { label: "Platform", value: project.platform },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                    <p className="text-xs font-semibold" style={{ color: "#c0c8d4" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: phone mockups */}
            <div className="relative hidden lg:flex items-center justify-center" style={{ width: 340, height: 320, flexShrink: 0 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="absolute" style={{ left: i * 70, top: i === 1 ? 30 : i === 2 ? -10 : 0 }}>
                  <PhoneMockup color={col} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Metrics ──────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl p-6 text-center"
              style={{ background: `${col}0d`, border: `1px solid ${col}22` }}
            >
              <p className="text-3xl font-bold mb-1" style={{ color: col, letterSpacing: "-0.03em" }}>{m.value}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* ── Challenge & Solution ──────────────────────── */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {[
            { label: "The Challenge", text: project.challenge },
            { label: "Our Solution", text: project.solution },
          ].map(({ label, text }) => (
            <div key={label} className="rounded-2xl p-6" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "#edf0f4" }}>{label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7585" }}>{text}</p>
            </div>
          ))}
        </div>

        {/* ── Features & Results side by side ──────────── */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {/* Features */}
          <div className="rounded-2xl p-6" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "#edf0f4" }}>Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: col }} />
                  <span className="text-xs leading-relaxed" style={{ color: "#7a8394" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl p-6" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "#edf0f4" }}>Results Achieved</h3>
            <div className="flex flex-col gap-2">
              {project.results.map((r, i) => (
                <div
                  key={r}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                  style={{ background: `${col}0b`, border: `1px solid ${col}1a` }}
                >
                  <span className="text-xs font-mono font-bold" style={{ color: col }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs" style={{ color: "#a0a9b8" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Technologies & Deliverables ───────────────── */}
        <div className="grid grid-cols-2 gap-5 mb-10">
          {/* Technologies */}
          <div className="rounded-2xl p-6" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "#edf0f4" }}>Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#8b95a5" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="rounded-2xl p-6" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "#edf0f4" }}>Deliverables</h3>
            <div className="grid grid-cols-2 gap-2">
              {project.deliverables.map((d) => (
                <div key={d} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: col }} />
                  <span className="text-xs" style={{ color: "#7a8394" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scope ────────────────────────────────────── */}
        <div className="rounded-2xl p-6 mb-10 flex items-start gap-8" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="shrink-0">
            <h3 className="text-sm font-bold mb-1" style={{ color: "#edf0f4" }}>Project Scope</h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Areas covered in this engagement</p>
          </div>
          <div className="flex flex-wrap gap-2 flex-1">
            {project.scope.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: `${col}12`, border: `1px solid ${col}28`, color: col }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── Testimonial ──────────────────────────────── */}
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: `${col}0a`, border: `1px solid ${col}20` }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: `radial-gradient(ellipse at 100% 0%, ${col}12 0%, transparent 60%)` }} />
          <Quote size={28} style={{ color: `${col}40` }} className="mb-4" />
          <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: "#c0c8d4", fontStyle: "italic" }}>
            "{project.testimonial.review}"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${col}25`, color: col }}>
              {project.testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#edf0f4" }}>{project.testimonial.author}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                {project.testimonial.designation}, {project.testimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* ── Project info footer row ───────────────────── */}
        <div className="grid grid-cols-4 gap-4 mt-10">
          {[
            { label: "Project Type", value: project.projectType },
            { label: "Budget", value: project.budget },
            { label: "Status", value: project.status },
            { label: "Platform", value: project.platform },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: "#0e1117", border: "1px solid rgba(255,255,255,0.06)" }}>
              <PlatformIcon size={14} style={{ color: col, flexShrink: 0 }} />
              <div>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
                <p className="text-xs font-semibold" style={{ color: "#c0c8d4" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>

    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  // Scroll to top when project selection changes
  useEffect(() => {
    const scrollFrame = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
    return () => cancelAnimationFrame(scrollFrame);
  }, [selected]);

  if (selected) {
    return <CaseStudyDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen w-full mt-14" style={{ background: "#070b10", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#42DEB9" }}>
              Our Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#edf0f4", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Projects That Create Impact
            </h2>
            <p className="text-sm" style={{ color: "#555e6d" }}>
              Innovative solutions crafted with precision and passion.
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full shrink-0 mt-2 transition-all duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#c8d0db", background: "rgba(255,255,255,0.04)" }}
          >
            View All Projects <ExternalLink size={11} />
          </button>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <ProjectCard project={projects[0]} featured onClick={() => setSelected(projects[0])} />
          </div>
          <div className="col-span-1">
            <ProjectCard project={projects[1]} onClick={() => setSelected(projects[1])} />
          </div>
          <div className="col-span-1">
            <ProjectCard project={projects[2]} onClick={() => setSelected(projects[2])} />
          </div>
          <div className="col-span-3">
            <ProjectCard project={projects[3]} featured onClick={() => setSelected(projects[3])} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            {projects.length} projects · Click any card to explore the full case study
          </span>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
