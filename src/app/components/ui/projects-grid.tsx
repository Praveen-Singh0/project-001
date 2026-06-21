
"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { ProjectModal } from "./project-modal"
import { projects } from "../../components/ui/projectsData"
import type { Project } from "../../components/ui/projectsData"

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={setSelectedProject}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
