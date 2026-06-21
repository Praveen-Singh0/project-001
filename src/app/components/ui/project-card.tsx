
import { useState } from "react"
import {
  ArrowUpRight,
  MapPin,
  Layers,
  CheckCircle2,
} from "lucide-react"
import type { Project } from "../../components/ui/projectsData"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: "var(--card-bg)",
        border: hovered
          ? `1.5px solid ${project.color}60`
          : "1.5px solid var(--card-border)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px ${project.color}15, 0 4px 20px rgba(0,0,0,0.3)`
          : "0 2px 12px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      onKeyDown={(e) => e.key === "Enter"}
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.images[0]}
          alt={`${project.title} preview`}
          className="object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 40%, rgba(5,6,15,0.85) 100%)`,
          }}
        />
        {/* Index number */}
        <div
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono"
          style={{
            background: `${project.color}22`,
            border: `1px solid ${project.color}60`,
            color: project.color,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {/* Status pill */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
          style={{
            background: "rgba(5,6,15,0.7)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${project.color}40`,
            color: project.color,
          }}
        >
          <CheckCircle2 size={10} />
          {project.status}
        </div>
        {/* Category badge bottom-left */}
        <div
          className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest"
          style={{
            background: `${project.color}18`,
            color: project.color,
            letterSpacing: "0.12em",
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-xl font-bold leading-tight text-balance"
            style={{ color: "var(--fg)" }}
          >
            {project.title}
          </h3>
          <div
            className="flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? project.color : `${project.color}18`,
              border: `1px solid ${project.color}40`,
            }}
          >
            <ArrowUpRight
              size={14}
              style={{ color: hovered ? "#fff" : project.color }}
            />
          </div>
        </div>

        <p
          className="text-sm font-semibold mb-3"
          style={{ color: project.color }}
        >
          {project.subtitle}
        </p>

        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "var(--muted)" }}>
          <span className="flex items-center gap-1">
            <MapPin size={11} style={{ color: project.color }} />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Layers size={11} style={{ color: project.color }} />
            {project.platform}
          </span>
          <span className="font-semibold" style={{ color: project.color }}>
            {project.budget}
          </span>
        </div>

        {/* Metrics strip */}
        <div
          className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl"
          style={{ background: "var(--metric-bg)", border: "1px solid var(--card-border)" }}
        >
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div
                className="text-sm font-bold font-mono"
                style={{ color: project.color }}
              >
                {m.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}35`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: "var(--metric-bg)",
                color: "var(--muted)",
                border: "1px solid var(--card-border)",
              }}
            >
              +{project.tags.length - 5}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
