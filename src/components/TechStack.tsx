"use client";

import { useRef, useState } from "react";
import { Users, Rocket, Globe, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { viewportOnce } from "@/lib/motion";
import Image from "next/image";

const techViewport = { once: true, margin: "-40px", amount: 0.2 } as const;

const SLOW_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INITIAL_VISIBLE = 15;

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
};

const slowFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: SLOW_EASE },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, x: -64, scale: 0.88, rotate: -2 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.8, ease: SLOW_EASE },
  },
};

const leftSideStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.1 } },
};

const statsStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const statReveal: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: SLOW_EASE },
  },
};

/** Five distinct entrance styles — cycled by card index */
function techCardVariants(index: number, isExpanded: boolean): Variants {
  const delay = isExpanded
    ? 0.35 + Math.min((index - INITIAL_VISIBLE) * 0.14, 2.8)
    : Math.min(index * 0.14, 2.8);
  const transition = { duration: 1.35, delay, ease: SLOW_EASE };

  const styles = [
    {
      hidden: { opacity: 0, y: 64, scale: 0.86 },
      visible: { opacity: 1, y: 0, scale: 1, transition },
    },
    {
      hidden: { opacity: 0, x: -48, rotate: -5 },
      visible: { opacity: 1, x: 0, rotate: 0, transition },
    },
    {
      hidden: { opacity: 0, x: 48, rotate: 5 },
      visible: { opacity: 1, x: 0, rotate: 0, transition },
    },
    {
      hidden: { opacity: 0, scale: 0.72 },
      visible: { opacity: 1, scale: 1, transition },
    },
    {
      hidden: { opacity: 0, y: -36, scale: 1.1 },
      visible: { opacity: 1, y: 0, scale: 1, transition },
    },
  ] as const;

  return styles[index % styles.length];
}

import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,

  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiFastapi,
  SiGraphql,

  SiFlutter,
  SiAndroid,
  SiApple,

  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,

  SiGooglecloud,
  SiFirebase,

  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,

  SiOpenai, 
  SiTensorflow,
  SiHuggingface,

  SiSalesforce,
  SiSap,
} from "react-icons/si";
import type { IconType } from "react-icons";

const stats = [
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Rocket, label: "Projects Delivered", value: "300+" },
  { icon: Globe, label: "Countries Served", value: "10+" },
  { icon: Shield, label: "Client Satisfaction", value: "98%" },
];

const technologies = [
  // Frontend
  { name: "React", category: "frontend", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "frontend", icon: SiNextdotjs, color: "#000000" },
  { name: "Vue.js", category: "frontend", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", category: "frontend", icon: SiAngular, color: "#DD0031" },
  { name: "TypeScript", category: "frontend", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", category: "frontend", icon: SiTailwindcss, color: "#06B6D4" },

  // Backend
  { name: "Node.js", category: "backend", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", category: "backend", icon: SiExpress, color: "#FFFFFF" },
  { name: "Python", category: "backend", icon: SiPython, color: "#3776AB" },
  { name: "Django", category: "backend", icon: SiDjango, color: "#092E20" },
  { name: "FastAPI", category: "backend", icon: SiFastapi, color: "#009688" },
  { name: "GraphQL", category: "backend", icon: SiGraphql, color: "#E10098" },

  // Mobile
  { name: "React Native", category: "mobile", icon: SiReact, color: "#61DAFB" },
  { name: "Flutter", category: "mobile", icon: SiFlutter, color: "#02569B" },
  { name: "Android", category: "mobile", icon: SiAndroid, color: "#3DDC84" },
  { name: "iOS", category: "mobile", icon: SiApple, color: "#A2AAAD" },

  // Databases
  { name: "MongoDB", category: "database", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", category: "database", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", category: "database", icon: SiMysql, color: "#4479A1" },
  { name: "Redis", category: "database", icon: SiRedis, color: "#DC382D" },

  // Cloud
  { name: "AWS", category: "cloud", icon: "", color: "#FF9900" },
  { name: "Microsoft Azure", category: "cloud", icon: "", color: "#0078D4" },
  { name: "Google Cloud", category: "cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Firebase", category: "cloud", icon: SiFirebase, color: "#FFCA28" },

  // DevOps
  { name: "Docker", category: "devops", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", category: "devops", icon: SiKubernetes, color: "#326CE5" },
  { name: "Jenkins", category: "devops", icon: SiJenkins, color: "#D24939" },
  { name: "GitHub Actions", category: "devops", icon: SiGithubactions, color: "#2088FF" },

  // AI & Data
  { name: "OpenAI", category: "ai", icon: SiOpenai, color: "#10A37F" },
  { name: "TensorFlow", category: "ai", icon: SiTensorflow, color: "#FF6F00" },
  { name: "LangChain", category: "ai", icon: "", color: "#00A67E" },
  { name: "Hugging Face", category: "ai", icon: SiHuggingface, color: "#FFD21E" },

  // Enterprise
  { name: "Salesforce", category: "enterprise", icon: SiSalesforce, color: "#00A1E0" },
  { name: "SAP", category: "enterprise", icon: SiSap, color: "#0FAAFF" },
  { name: "Microsoft 365", category: "enterprise", icon: "", color: "#D83B01" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  index,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  index: number;
}) {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";

  return (
    <motion.div
      variants={statReveal}
      className="relative group"
      whileHover={{ y: -4, transition: { duration: 0.5, ease: SLOW_EASE } }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(108,99,255,0.2))"
            : "linear-gradient(135deg, rgba(0,149,191,0.15), rgba(108,99,255,0.15))",
          filter: "blur(10px)",
        }}
      />
      <div
        className="relative flex items-center gap-4 px-6 py-4 rounded-xl backdrop-blur-md"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.5)",
          border: isDark
            ? "1px solid rgba(0,229,255,0.2)"
            : "1px solid rgba(108,99,255,0.2)",
        }}
      >
        <div
          className="flex-shrink-0 p-3 rounded-lg"
          style={{
            background: isDark
              ? "rgba(0,229,255,0.15)"
              : "rgba(0,149,191,0.15)",
          }}
        >
          <Icon size={28} color={isDark ? "#00E5FF" : "#0095bf"} />
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: fg }}>
            {value}
          </div>
          <div style={{ fontSize: 13, color: muted }}>{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function TechCard({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: IconType | string;
  color: string;
}) {
  const { isDark } = useTheme();
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";

  return (
    <>
      <div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur pointer-events-none"
        style={{ background: `${color}40` }}
      />
      <div
        className="relative rounded-xl p-6 text-center cursor-pointer backdrop-blur-md h-full"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.6)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div className="mb-4 flex justify-center">
          {typeof Icon === "function" ? <Icon size={48} color={color} /> : null}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{name}</div>
      </div>
    </>
  );
}

export function TechStack() {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridVisible = useInView(gridRef, { once: true, margin: "-40px 0px" });

  const visibleTechnologies = showAll
    ? technologies
    : technologies.slice(0, INITIAL_VISIBLE);

  const bg = isDark
    ? "linear-gradient(135deg, #04050d 0%, #0a0e27 100%)"
    : "linear-gradient(135deg, #e8ecf7 0%, #f5f8ff 100%)";
  const fg = isDark ? "#f0f4ff" : "#0d0f1e";
  const muted = isDark ? "#8892b0" : "#6271a0";
  const labelColor = isDark ? "#00E5FF" : "#0095bf";

  return (
    <section
      id="tech"
      className="relative py-24 overflow-hidden"
      style={{ background: bg }}
    >
      {/* Ambient orbs — transform only */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "rgba(0, 229, 255, 0.3)"
            : "rgba(0, 149, 191, 0.2)",
        }}
        animate={{ y: [0, 24, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "rgba(108, 99, 255, 0.3)"
            : "rgba(108, 99, 255, 0.2)",
        }}
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={techViewport}
          variants={headerStagger}
        >
          <motion.div variants={slowFadeUp}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md"
            style={{
              background: isDark
                ? "rgba(0,229,255,0.12)"
                : "rgba(0,149,191,0.12)",
              border: isDark
                ? "1px solid rgba(0,229,255,0.3)"
                : "1px solid rgba(0,149,191,0.3)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: labelColor,
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              🚀 TECH STACK
            </span>
          </div>
          </motion.div>

          <motion.h2
            variants={slowFadeUp}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: fg,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Technologies We Use
            <span
              className="
    inline-block
    bg-gradient-to-r
    from-[#3AE5B2]
    via-[#6C63FF]
    to-[#00E5FF]
    bg-clip-text
    text-transparent
  "
            >
              For Fast Delivered Products
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={techViewport}
            variants={leftSideStagger}
          >
            <motion.div
              variants={slowFadeUp}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: labelColor,
                letterSpacing: "0.15em",
                marginBottom: 12,
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
              }}
            >
              Built For Scale
            </motion.div>

            <motion.div
              className="w-full h-full"
              variants={imageReveal}
              whileHover={{
                scale: 1.03,
                rotate: 1,
                transition: { duration: 0.7, ease: SLOW_EASE },
              }}
            >
              <Image
                src="/assets/img/modern-stack.png"
                alt="Modern Stack"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Technologies */}
          <div className="lg:col-span-2">
            <motion.div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
              style={{ perspective: 1200 }}
            >
              <AnimatePresence mode="popLayout">
                {visibleTechnologies.map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    className="relative group"
                    custom={idx}
                    variants={techCardVariants(idx, idx >= INITIAL_VISIBLE)}
                    initial="hidden"
                    animate={gridVisible ? "visible" : "hidden"}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 20,
                      transition: { duration: 0.55, ease: SLOW_EASE },
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      transition: { duration: 0.55, ease: SLOW_EASE },
                    }}
                  >
                    <TechCard
                      name={tech.name}
                      icon={tech.icon}
                      color={tech.color}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={techViewport}
              transition={{ duration: 1.1, delay: 0.4, ease: SLOW_EASE }}
            >
              <motion.button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="group px-6 py-3 rounded-xl flex items-center gap-3 font-semibold"
                style={{
                  background: isDark
                    ? "rgba(0,229,255,0.12)"
                    : "rgba(108,99,255,0.08)",
                  border: isDark
                    ? "1px solid rgba(0,229,255,0.25)"
                    : "1px solid rgba(108,99,255,0.18)",
                  color: fg,
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: isDark
                    ? "0 8px 24px rgba(0,229,255,0.12)"
                    : "0 8px 24px rgba(108,99,255,0.1)",
                  transition: { duration: 0.55, ease: SLOW_EASE },
                }}
                whileTap={{ scale: 0.97, transition: { duration: 0.35 } }}
              >
                {showAll ? "Show Less" : "Load More Technologies"}

                <motion.span
                  animate={{ rotate: showAll ? -90 : 90 }}
                  transition={{ duration: 0.6, ease: SLOW_EASE }}
                  className="inline-flex"
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={statsStagger}
          style={{
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(108,99,255,0.14)",
            paddingTop: 24,
          }}
        >
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} {...stat} index={idx} />
          ))}
        </motion.div>

        
      </div>
    </section>
  );
}
