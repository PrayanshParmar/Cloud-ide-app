"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectModelSKL from "@/components/skeletons/project-model-skl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useModal } from "@/hooks/use-model-store";

import { userGithubRepos } from "@/lib/types";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import Link from "next/link";
import { useState } from "react";
import { createProjectSchema } from "@/lib/schema";

export const AddProjectModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { user } = data;
  const isModelOpen = isOpen && type === "addProject";

  const installGithubApp = async () => {
    const response = await fetch("/api/github/install-token");
    const data = await response.json();
    if (data.redirect) {
      window.location.href = data.redirect;
      return;
    }
  };

  const {
    data: projectData,
    isLoading,
    isError,
  }: UseQueryResult<userGithubRepos> = useQuery({
    queryKey: ["repos", isModelOpen],
    queryFn: async () => {
      const res = await axios.get("/api/user/repos");
      return res.data.repos;
    },
    enabled: isModelOpen,
  });

  const handleClose = () => {
    onClose();
  };

  const [isLoadingPost, setIsLoadingPost] = useState(false);

  const onSubmit = async (
    name: string,
    full_name: string,
    clone_url: string,
    privateRepo: boolean
  ) => {
    try {
      setIsLoadingPost(true);
      const validate = createProjectSchema.safeParse({
        name: name,
        full_name: full_name,
        clone_url: clone_url,
        privateRepo: privateRepo,
      });
      if (validate.success === true) {
        await axios.post("/api/project", validate.data);
        onClose();
      }
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPost(false);
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#0A0A0A] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium sm:text-2xl text-center">
            Import from GitHub
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full h-fit p-[2px] flex flex-row items-center justify-center border rounded-md">
            <div className="flex items-center gap-2 pl-[2px]">
              <Avatar className="w-[20px] h-[20px]">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  <Skeleton />
                </AvatarFallback>
              </Avatar>
              <span className="capitalize">{user?.name}</span>
            </div>
          </div>
          {!user?.installationId ? (
            <p className="text-center text-gray-500">
              Please install GitHub App
            </p>
          ) : isLoading ? (
            <ProjectModelSKL />
          ) : isError ? (
            <p className="text-center text-rose-500">Somthing went wrong!</p>
          ) : (
            <>
              <ScrollArea className="h-64 border rounded-md">
                {user?.installationId ? (
                  projectData?.repositories.map((project) => (
                    <div
                      key={project.id}
                      className="w-full h-fit p-3 flex flex-row items-center justify-between border  rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{project.name}</span>
                        {project.private && <LockKeyhole className="w-4 h-4" />}
                      </div>
                      <div className="ml-auto">
                        <Button
                          disabled={isLoadingPost}
                          onClick={() =>
                            onSubmit(
                              project.name,
                              project.full_name,
                              project.clone_url,
                              project.private
                            )
                          }
                        >
                          Import
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </ScrollArea>
              <span className=" text-xs flex flex-row">
                Missing a repository?&nbsp;
                <Link
                  href={`https://github.com/settings/installations/${user?.installationId}
                      
  `}
                  className="flex flex-row border-b border-white "
                >
                  Adjust Github App permission
                  <ArrowRight className=" w-4 h-4" />
                </Link>
              </span>
            </>
          )}
        </div>
        <DialogFooter>
          {!user?.installationId && (
            <Button onClick={() => installGithubApp()} variant="green">
              Install Github App
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
