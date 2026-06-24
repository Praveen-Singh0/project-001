"use client";

import { useState, useCallback, useEffect } from "react";
import { Briefcase, MapPin, DollarSign, Clock, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { jobs, type Job } from "@/lib/careers";
import { CareersDetailPage } from "./CareersDetailPage";

export function CareersPage() {
  const { isDark } = useTheme();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  // Scroll to top when job selection changes
  useEffect(() => {
    const scrollFrame = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
    return () => cancelAnimationFrame(scrollFrame);
  }, [selectedJob]);

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const accentColor = "#0FA47E";

  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))];
  const filteredJobs = departmentFilter === "All" ? jobs : jobs.filter((job) => job.department === departmentFilter);

  const selectedJobData = selectedJob ? jobs.find((job) => job.id === selectedJob) : null;

  if (selectedJobData) {
    return <CareersDetailPage job={selectedJobData} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <main style={{ background: bg }}>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center py-20 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{
              background: isDark ? "rgba(0,229,255,0.08)" : "rgba(0,149,191,0.08)",
              border: isDark ? "1px solid rgba(0,229,255,0.2)" : "1px solid rgba(0,149,191,0.2)",
            }}
          >
            <Briefcase size={14} color={labelColor} />
            <span style={{ fontSize: 11, color: labelColor, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>
              JOIN OUR TEAM
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              color: fg,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Build the Future With Us
          </h1>
          <p style={{ fontSize: 18, color: muted, lineHeight: 1.7, marginBottom: 24 }}>
            Join our talented team and make an impact on technology. We're looking for passionate engineers, designers, and product leaders.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 py-8" style={{ background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <h3 style={{ fontSize: 14, fontWeight: 600, color: muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Filter by Department
          </h3>
          <div className="flex flex-wrap gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "24px",
                  border: departmentFilter === dept ? "none" : `1px solid ${cardBorder}`,
                  background:
                    departmentFilter === dept
                      ? `linear-gradient(135deg, ${labelColor}, ${accentColor})`
                      : cardBg,
                  color: departmentFilter === dept ? "#fff" : muted,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className="group rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: fg }}>
                          {job.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: 13, color: labelColor, marginBottom: 12 }}>
                        {job.department}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} color={muted} />
                          <span style={{ fontSize: 13, color: muted }}>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={14} color={muted} />
                          <span style={{ fontSize: 13, color: muted }}>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} color={muted} />
                          <span style={{ fontSize: 13, color: muted }}>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        background: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="text-center py-16"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: "12px",
                }}
              >
                <p style={{ fontSize: 16, color: muted }}>No positions found in this department.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6" style={{ background: isDark ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Team Members" },
              { number: "50+", label: "Open Positions" },
              { number: "15", label: "Locations" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${labelColor}, ${accentColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: 8,
                  }}
                >
                  {stat.number}
                </div>
                <p style={{ fontSize: 14, color: muted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, textAlign: "center", marginBottom: 48 }}>
            Why Join Our Team?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🚀", title: "Growth", description: "Career growth opportunities and continuous learning" },
              { icon: "💰", title: "Competitive Pay", description: "Industry-leading salaries and equity packages" },
              { icon: "🏠", title: "Flexibility", description: "Remote options and flexible work schedules" },
              { icon: "👥", title: "Great Team", description: "Work with talented and passionate people" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{benefit.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: fg, marginBottom: 8 }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontSize: 32, fontWeight: 700, color: fg, marginBottom: 16 }}>
            Don't See Your Role?
          </h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 32, lineHeight: 1.7 }}>
            Send us your resume and let's explore if there's a great fit for your skills and interests.
          </p>
          <button
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
              color: "#fff",
              border: "none",
              padding: "16px 48px",
              borderRadius: "50px",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Send Your Resume
          </button>
        </div>
      </section>
    </main>
  );
}
