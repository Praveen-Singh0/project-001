import { ProjectCard } from "./project-card"
import { projects } from "../../components/ui/projectsData"

export function ProjectsGrid() {

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </>
  )
}
