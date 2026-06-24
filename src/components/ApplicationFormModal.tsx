"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ApplicationFormModalProps {
  jobTitle: string;
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  currentCompany: string;
  experience: string;
  coverLetter: string;
  resumeUrl: string;
  linkedInUrl: string;
  jobId: string;
  jobTitle: string;
  appliedAt: string;
}

export function ApplicationFormModal({
  jobTitle,
  jobId,
  isOpen,
  onClose,
}: ApplicationFormModalProps) {
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentCompany: "",
    experience: "",
    coverLetter: "",
    resumeUrl: "",
    linkedInUrl: "",
  });

  const bg = isDark ? "#04050d" : "#e8ecf7";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.6)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(108,99,255,0.14)";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";
  const accentColor = "#0FA47E";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationData: ApplicationData = {
        ...formData,
        jobId,
        jobTitle,
        appliedAt: new Date().toISOString(),
      };

      // Get existing applications from localStorage
      const existingApplications = localStorage.getItem("applications");
      const applications = existingApplications ? JSON.parse(existingApplications) : [];

      // Add new application
      applications.push(applicationData);

      // Save to localStorage
      localStorage.setItem("applications", JSON.stringify(applications));

      // Show success message
      setSuccessMessage(true);
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          currentCompany: "",
          experience: "",
          coverLetter: "",
          resumeUrl: "",
          linkedInUrl: "",
        });
        setSuccessMessage(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("[v0] Error saving application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-opacity"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 z-50 w-full mx-4 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          maxWidth: "600px",
        }}
      >
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: bg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: fg }}>
                Apply for {jobTitle}
              </h2>
              <p style={{ fontSize: 13, color: muted, marginTop: 4 }}>
                Fill out the form below to submit your application
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-opacity-20"
              style={{
                background: `${muted}20`,
                color: muted,
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {successMessage ? (
            <div
              className="py-8 text-center rounded-lg"
              style={{
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 600, color: accentColor, marginBottom: 8 }}>
                ✓ Application Submitted Successfully!
              </p>
              <p style={{ fontSize: 13, color: muted }}>
                Your application has been saved. We'll review it soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Current Company */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  placeholder="Your current company"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Years of Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = labelColor;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = cardBorder;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select experience level</option>
                  <option value="0-2">0-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Cover Letter */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this role..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = labelColor;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = cardBorder;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Resume URL */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Resume URL *
                </label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/resume.pdf"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg,
                    display: "block",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/johndoe"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                    color: fg,
                    fontSize: 14,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = labelColor;
                    e.target.style.boxShadow = `0 0 0 3px ${labelColor}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = cardBorder;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${accentColor}, ${labelColor})`,
                    color: "#fff",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "8px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    background: cardBg,
                    color: muted,
                    border: `1px solid ${cardBorder}`,
                    padding: "14px 24px",
                    borderRadius: "8px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = labelColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = cardBorder;
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
