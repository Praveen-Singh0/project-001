'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ProjectShowcase } from './ProjectShowcase';
import { projects } from '../ui/projectsData';
import { useTheme } from '../../contexts/ThemeContext';

export function PremiumProjectsPage() {
  const { isDark } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bg = isDark ? '#04050d' : '#f8f9fc';
  const fg = isDark ? '#f0f4ff' : '#0d0f1e';
  const muted = isDark ? '#8892b0' : '#6271a0';
  const labelColor = isDark ? '#00E5FF' : '#0095bf';
  const glowBg = isDark
    ? 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)'
    : 'radial-gradient(ellipse, rgba(0,149,191,0.05) 0%, transparent 70%)';

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden"
      style={{ background: bg }}
    >
      {/* Ambient glow */}
      <div
        className="fixed top-[10%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: glowBg,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
          style={{
            background: isDark ? 'rgba(0,229,255,0.08)' : 'rgba(0,149,191,0.08)',
            border: isDark ? '1px solid rgba(0,229,255,0.2)' : '1px solid rgba(0,149,191,0.2)',
          }}
        >
          <Star size={11} color={labelColor} />
          <span
            style={{
              fontSize: 11,
              color: labelColor,
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            PROJECT SHOWCASE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: fg,
            maxWidth: '800px',
          }}
        >
          Crafting digital experiences that drive{' '}
          <span
            className="bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#a78bfa] bg-clip-text text-transparent"
          >
            real results
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 16,
            color: muted,
            lineHeight: 1.7,
            marginTop: 20,
            maxWidth: '600px',
          }}
        >
          From enterprise AI systems to high-performance analytics platforms, each project represents a strategic partnership focused on solving complex technical challenges at scale.
        </motion.p>
      </div>

      {/* Project Showcase */}
      <ProjectShowcase projects={projects} />
    </section>
  );
}
