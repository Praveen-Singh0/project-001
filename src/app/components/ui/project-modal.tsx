
import { useState, useEffect, useCallback } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign,
  Globe,
  CheckCircle2,
  Cpu,
  Wrench,
  TrendingUp,
  Star,
  Package,
  Zap,
  ExternalLink,
} from "lucide-react"
import type { Project } from "../../components/ui/projectsData"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "results" | "testimonial">(
    "overview"
  )

  // Reset state when project changes
  useEffect(() => {
    setActiveImage(0)
    setActiveTab("overview")
  }, [project?.id])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [project])

  const prevImage = useCallback(() => {
    if (!project) return
    setActiveImage((i) => (i - 1 + project.images.length) % project.images.length)
  }, [project])

  const nextImage = useCallback(() => {
    if (!project) return
    setActiveImage((i) => (i + 1) % project.images.length)
  }, [project])

  if (!project) return null

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Globe },
    { id: "tech" as const, label: "Tech Stack", icon: Cpu },
    { id: "results" as const, label: "Results", icon: TrendingUp },
    { id: "testimonial" as const, label: "Testimonial", icon: Star },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "var(--modal-bg)",
          border: `1px solid ${project.color}30`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px ${project.color}15`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Image carousel */}
        <div className="relative h-64 md:h-80 flex-shrink-0">
          <img
            src={project.images[activeImage]}
            alt={`${project.title} screenshot ${activeImage + 1}`}
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(5,6,15,0.9) 100%)",
            }}
          />

          {/* Image nav arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Image dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeImage ? 24 : 8,
                  height: 8,
                  background: i === activeImage ? project.color : "rgba(255,255,255,0.35)",
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>

          {/* Header overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div
              className="text-xs font-mono font-bold uppercase tracking-widest mb-1"
              style={{ color: project.color, letterSpacing: "0.14em" }}
            >
              {project.category} &nbsp;·&nbsp; {project.industry}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {project.title}
            </h2>
            <p className="text-sm font-semibold" style={{ color: project.color }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Meta strip */}
        <div
          className="flex flex-wrap items-center gap-4 px-6 py-3 text-xs flex-shrink-0"
          style={{
            background: `${project.color}08`,
            borderTop: `1px solid ${project.color}25`,
            borderBottom: `1px solid ${project.color}25`,
          }}
        >
          <span className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <MapPin size={12} style={{ color: project.color }} />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <DollarSign size={12} style={{ color: project.color }} />
            Budget: <span className="font-semibold ml-0.5" style={{ color: project.color }}>{project.budget}</span>
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <Globe size={12} style={{ color: project.color }} />
            {project.platform}
          </span>
          <span
            className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}40`,
            }}
          >
            <CheckCircle2 size={10} />
            {project.status}
          </span>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 px-6 pt-4 pb-0 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--card-border)" }}
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all duration-200 -mb-px"
              style={
                activeTab === id
                  ? {
                      color: project.color,
                      background: `${project.color}12`,
                      borderBottom: `2px solid ${project.color}`,
                    }
                  : { color: "var(--muted)", background: "transparent" }
              }
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5" style={{ scrollbarWidth: "thin" }}>
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Overview text */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {project.overview}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="text-center p-4 rounded-2xl"
                    style={{
                      background: `${project.color}0d`,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold font-mono"
                      style={{ color: project.color }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge / Solution */}
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-2xl"
                  style={{ background: "var(--metric-bg)", border: "1px solid var(--card-border)" }}
                >
                  <div
                    className="text-xs font-mono font-bold uppercase tracking-widest mb-2"
                    style={{ color: project.color }}
                  >
                    Challenge
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {project.challenge}
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl"
                  style={{ background: "var(--metric-bg)", border: "1px solid var(--card-border)" }}
                >
                  <div
                    className="text-xs font-mono font-bold uppercase tracking-widest mb-2"
                    style={{ color: project.color }}
                  >
                    Solution
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Scope */}
              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                  style={{ color: project.color }}
                >
                  Scope of Work
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
                      style={{
                        background: `${project.color}10`,
                        color: project.color,
                        border: `1px solid ${project.color}35`,
                      }}
                    >
                      <Zap size={10} />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                  style={{ color: project.color }}
                >
                  Key Features
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-muted)" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                  style={{ color: project.color }}
                >
                  Deliverables
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.deliverables.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
                      style={{
                        background: "var(--metric-bg)",
                        color: "var(--fg-muted)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <Package size={10} style={{ color: project.color }} />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TECH STACK TAB */}
          {activeTab === "tech" && (
            <div className="space-y-6">
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>
              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-4"
                  style={{ color: project.color }}
                >
                  Technologies Used
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: "var(--metric-bg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}
                      >
                        <Cpu size={14} style={{ color: project.color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                  style={{ color: project.color }}
                >
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: `${project.color}12`,
                        color: project.color,
                        border: `1px solid ${project.color}35`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS TAB */}
          {activeTab === "results" && (
            <div className="space-y-6">
              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-4"
                  style={{ color: project.color }}
                >
                  Project Results
                </div>
                <div className="space-y-3">
                  {project.results.map((r, i) => (
                    <div
                      key={r}
                      className="flex items-center gap-3 p-3.5 rounded-xl"
                      style={{
                        background: `${project.color}08`,
                        border: `1px solid ${project.color}25`,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                        style={{ background: `${project.color}20`, color: project.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                        {r}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-4"
                  style={{ color: project.color }}
                >
                  Business Value
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.businessValue.map((v) => (
                    <div key={v} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                      <Wrench size={12} style={{ color: project.color }} />
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics large */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="text-center p-5 rounded-2xl"
                    style={{
                      background: `${project.color}0d`,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <div
                      className="text-3xl font-bold font-mono"
                      style={{ color: project.color }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIAL TAB */}
          {activeTab === "testimonial" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-2xl relative"
                style={{
                  background: `${project.color}08`,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {/* Quote mark */}
                <div
                  className="text-6xl font-serif leading-none mb-4 select-none"
                  style={{ color: `${project.color}40` }}
                >
                  &ldquo;
                </div>
                <p
                  className="text-base leading-relaxed italic mb-6"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {project.testimonial.review}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${project.color}22`,
                      color: project.color,
                      border: `1px solid ${project.color}50`,
                    }}
                  >
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                      {project.testimonial.author}
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>
                      {project.testimonial.designation} &middot; {project.testimonial.company}
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={project.color}
                        style={{ color: project.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project details summary */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Project Type", value: project.projectType },
                  { label: "Industry", value: project.industry },
                  { label: "Platform", value: project.platform },
                  { label: "Location", value: project.location },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3.5 rounded-xl"
                    style={{
                      background: "var(--metric-bg)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{label}</span>
                    <span className="text-xs font-semibold" style={{ color: "var(--fg)" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                style={{
                  background: project.color,
                  color: "#fff",
                }}
              >
                View on {project.productLink}
                <ExternalLink size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {project.images.length > 1 && (
          <div
            className="flex gap-2 px-6 py-3 overflow-x-auto flex-shrink-0"
            style={{ borderTop: "1px solid var(--card-border)" }}
          >
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  outline: i === activeImage ? `2px solid ${project.color}` : "2px solid transparent",
                  outlineOffset: 2,
                  opacity: i === activeImage ? 1 : 0.55,
                }}
                aria-label={`Select image ${i + 1}`}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
