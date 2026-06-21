'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../ui/projectsData';
import { useTheme } from '../../contexts/ThemeContext';

interface ProjectSlideProps {
  project: Project;
  index: number;
}

export function ProjectSlide({ project, index }: ProjectSlideProps) {
  const { isDark } = useTheme();

  const bg = isDark ? '#04050d' : '#f8f9fc';
  const fg = isDark ? '#f0f4ff' : '#0d0f1e';
  const muted = isDark ? '#8892b0' : '#6271a0';
  const cardBg = isDark
    ? 'rgba(255,255,255,0.03)'
    : 'rgba(255,255,255,0.5)';
  const cardBorder = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.08)';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full h-full relative" style={{ background: bg }}>
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Top section - Split layout */}
        <div className="flex-1 flex flex-col lg:flex-row items-stretch">
          {/* Left: Project Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 lg:py-0">
            <motion.div variants={item} className="max-w-2xl">
              {/* Category badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <motion.div
                  variants={item}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {project.category}
                </motion.div>
                <motion.div
                  variants={item}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    color: muted,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {project.industry}
                </motion.div>
              </div>

              {/* Title */}
              <motion.h3
                variants={item}
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: fg,
                  marginBottom: 16,
                }}
              >
                {project.title}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                variants={item}
                style={{
                  fontSize: 18,
                  color: muted,
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {project.subtitle}
              </motion.p>

              {/* Overview */}
              <motion.p
                variants={item}
                style={{
                  fontSize: 15,
                  color: muted,
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                {project.overview}
              </motion.p>

              {/* Key metrics */}
              <motion.div variants={item} className="grid grid-cols-3 gap-8 mb-12">
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    className="flex flex-col"
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: project.color,
                        fontFamily: 'var(--font-mono)',
                        marginBottom: 4,
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: muted,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                variants={item}
                className="self-start group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                style={{
                  background: project.color,
                  color: isDark ? '#000' : '#fff',
                  fontSize: 14,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  View Case Study
                  <ArrowUpRight size={16} />
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Project Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-8 md:px-16 py-12 lg:py-0">
            <motion.div
              variants={item}
              className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at top-right, ${project.color}20, transparent 50%)`,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom section - Technologies */}
        <motion.div
          variants={item}
          className="border-t"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          }}
        >
          <div className="px-8 md:px-16 py-8 flex flex-col md:flex-row gap-12">
            {/* Technologies */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: muted,
                  letterSpacing: '0.1em',
                  marginBottom: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(0,0,0,0.1)',
                      color: muted,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h4
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: muted,
                  letterSpacing: '0.1em',
                  marginBottom: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                Key Results
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.results.slice(0, 3).map((result, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Index corner */}
      <div
        className="absolute top-8 right-8 z-20 text-6xl font-black opacity-10"
        style={{ color: fg, letterSpacing: '-0.02em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  );
}
