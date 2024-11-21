import { Project, User } from "@repo/prisma";
import { useSearchParams } from "next/navigation";
import ProjectCardSKL from "../skeletons/project-card-skl";
import ProjectInternalError from "./project-error";
import ProjectNotFound from "./project-not-found";
import ProjectCard from "./project-card";

interface ProjectContentProps {
  isLoading: Boolean;
  user: User;
  projects: Project[] | undefined;
  isError: Boolean;
}

const ProjectContent = ({
  isLoading,
  user,
  projects,
  isError,
}: ProjectContentProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProjects =
    query && projects
      ? projects.filter((project) =>
          project.name.toLowerCase().includes(query.toLowerCase())
        )
      : projects;

  return (
    <>
      {isLoading ? (
        <ProjectCardSKL />
      ) : !isError ? (
        filteredProjects !== undefined && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-4 ">
            {filteredProjects?.map((project, index) => (
              <ProjectCard
                key={index}
                name={project.name}
                branch={"main"}
                full_name={project.repoName}
                date={project.updatedAt}
                username={user.name}
              />
            ))}
          </div>
        ) : (
          <ProjectNotFound user={user} />
        )
      ) : (
        <ProjectInternalError />
      )}
    </>
  );
};

export default ProjectContent;
