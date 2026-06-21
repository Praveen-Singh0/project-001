import { ProjectsGrid } from "../components/ui/projects-grid";
import { projects } from "../components/ui/projectsData";
import { Layers, FolderOpen, Globe, Star } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ProjectsPage() {
  const totalProjects = projects.length;
  const industries = [...new Set(projects.map((p) => p.industry))].length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed",
  ).length;

  return (
    <main className="" style={{ background: "var(--background)" }}>
      <Navbar />
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-26   overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.82 0.17 175 / 0.04)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-10 left-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.65 0.2 265 / 0.04)",
            filter: "blur(60px)",
          }}
        />

        {/* Label */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-8"
          style={{
            background: "oklch(0.82 0.17 175 / 0.1)",
            border: "1px solid oklch(0.82 0.17 175 / 0.25)",
            color: "oklch(0.82 0.17 175)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.82 0.17 175)" }}
          />
          Selected Work &amp; Case Studies
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold leading-tight text-balance mb-6"
          style={{ color: "var(--fg)", letterSpacing: "-0.025em" }}
        >
          Transforming Ideas Into{" "}
          <span style={{ color: "oklch(0.82 0.17 175)" }}>
            Digital Excellence
          </span>
        </h1>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-10"
          style={{ color: "var(--muted)" }}
        >
          Experience-driven solutions that deliver measurable results for
          forward-thinking clients — from mobile apps to AI platforms and cloud
          infrastructure.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6">
          {[
            { icon: FolderOpen, label: "Projects", value: `${totalProjects}+` },
            { icon: Globe, label: "Industries", value: `${industries}+` },
            { icon: Layers, label: "Completed", value: `${completedProjects}` },
            { icon: Star, label: "Satisfaction", value: "100%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "oklch(0.82 0.17 175 / 0.1)",
                  border: "1px solid oklch(0.82 0.17 175 / 0.25)",
                }}
              >
                <Icon size={14} style={{ color: "oklch(0.82 0.17 175)" }} />
              </div>
              <div>
                <div
                  className="text-sm font-bold font-mono"
                  style={{ color: "var(--fg)" }}
                >
                  {value}
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-6xl mx-auto px-6 mb-10"
        style={{ borderTop: "1px solid var(--card-border)" }}
      />

      {/* Projects Grid */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--fg)" }}>
              All Projects
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Click any card to explore the full case study
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-mono font-bold"
            style={{
              background: "var(--metric-bg)",
              color: "var(--muted)",
              border: "1px solid var(--card-border)",
            }}
          >
            {totalProjects} projects
          </div>
        </div>

        <ProjectsGrid />
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div
          className="rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: "oklch(0.82 0.17 175 / 0.06)",
            border: "1px solid oklch(0.82 0.17 175 / 0.2)",
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.82 0.17 175 / 0.08), transparent 70%)",
            }}
          />
          <h2
            className="text-2xl md:text-3xl font-bold mb-3 text-balance"
            style={{ color: "var(--fg)" }}
          >
            Ready to Start Your Project?
          </h2>
          <p
            className="text-sm leading-relaxed mb-6 max-w-md mx-auto"
            style={{ color: "var(--muted)" }}
          >
            {
              "Let's discuss how we can transform your vision into a powerful digital solution."
            }
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-85 hover:scale-105"
            style={{
              background: "oklch(0.82 0.17 175)",
              color: "oklch(0.08 0.01 260)",
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
