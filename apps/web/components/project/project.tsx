"use client";
import AddButton from "./add-button";
import SearchBar from "./search-bar";
import { redirect } from "next/navigation";
import ProjectContent from "./project-content";
import { Project as projectType, User } from "@repo/prisma";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

interface projectProps {
  profile: User;
}
const Project = ({ profile }: projectProps) => {
  if (!profile) {
    return redirect("/");
  }

  const {
    data: projectData,
    isLoading,
    isError,
  }: UseQueryResult<projectType[]> = useQuery({
    queryKey: ["projects", profile.id],
    queryFn: async () => {
      const res = await axios.get("/api/user/project");
      return res.data.project;
    },
  });

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      <div className="flex w-auto items-center space-x-2">
        <SearchBar
          data={[
            {
              label: "Projects",
              type: "project",
              data: projectData?.map((item) => ({
                id: item.id,
                name: item.name,
              })),
            },
          ]}
        />
        <AddButton user={profile} />
      </div>
      <ProjectContent
        isLoading={isLoading}
        isError={isError}
        user={profile}
        projects={projectData}
      />
    </div>
  );
};

export default Project;
