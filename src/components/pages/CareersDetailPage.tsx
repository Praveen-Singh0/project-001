"use client";

import { ArrowLeft, MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { Job } from "@/lib/careers";

interface CareersDetailPageProps {
  job: Job;
  onBack: () => void;
}

export function CareersDetailPage({ job, onBack }: CareersDetailPageProps) {
  const { isDark } = useTheme();

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const accentColor = "#0FA47E";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 style={{ fontSize: 18, fontWeight: 700, color: fg, marginBottom: 16 }}>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <main style={{ background: bg, minHeight: "100vh" }}>
      {/* Back Button & Header */}
      <div className="sticky top-20 z-40 backdrop-blur-md" style={{ background: `${bg}cc` }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1"
            style={{ color: labelColor, fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontSize: 40, fontWeight: 700, color: fg, marginBottom: 16, lineHeight: 1.2 }}>
            {job.title}
          </h1>
          <p style={{ fontSize: 14, color: labelColor, marginBottom: 20, fontWeight: 500 }}>
            {job.department}
          </p>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: "Location", value: job.location },
              { icon: DollarSign, label: "Salary", value: job.salary },
              { icon: Clock, label: "Type", value: job.type },
              { icon: CheckCircle, label: "Department", value: job.department },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg p-4"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} color={labelColor} />
                    <span style={{ fontSize: 11, color: muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: fg, fontWeight: 600 }}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
              color: "#fff",
              border: "none",
              padding: "14px 32px",
              borderRadius: "8px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div
            className="rounded-xl p-8 mb-8"
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
            }}
          >
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.8 }}>
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <Section title="Responsibilities">
            <div
              className="rounded-xl p-8"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
              }}
            >
              <ul className="space-y-4">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-4">
                    <CheckCircle size={20} color={accentColor} className="flex-shrink-0 mt-0.5" />
                    <span style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                      {resp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Requirements */}
          <Section title="Requirements">
            <div
              className="rounded-xl p-8"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
              }}
            >
              <ul className="space-y-4">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-4">
                    <CheckCircle size={20} color={labelColor} className="flex-shrink-0 mt-0.5" />
                    <span style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills & Technologies">
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="rounded-full px-4 py-2"
                  style={{
                    background: `${accentColor}15`,
                    border: `1px solid ${accentColor}30`,
                    color: accentColor,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </Section>

          {/* Benefits */}
          <Section title="Benefits & Perks">
            <div className="grid md:grid-cols-2 gap-4">
              {job.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-4 flex gap-3"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  <CheckCircle size={18} color={accentColor} className="flex-shrink-0" />
                  <span style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <div
            className="rounded-xl p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15, ${labelColor}15)`,
              border: `1px solid ${labelColor}30`,
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 700, color: fg, marginBottom: 12 }}>
              Ready to Apply?
            </h3>
            <p style={{ fontSize: 14, color: muted, marginBottom: 20, lineHeight: 1.6 }}>
              Take the next step in your career. We'd love to hear from you!
            </p>
            <button
              onClick={() => {
                /* Handle apply logic */
              }}
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                color: "#fff",
                border: "none",
                padding: "14px 40px",
                borderRadius: "8px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Apply for {job.title}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
