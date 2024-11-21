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
import ProjectModalSKL from "@/components/skeletons/project-model-skl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useModal } from "@/hooks/use-model-store";

import { userGithubRepos } from "@/lib/types";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import Link from "next/link";
import { useState } from "react";
import { importProjectSchema } from "@/lib/schema";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const ImportProjectModal = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onClose, type, data } = useModal();
  const { user } = data;
  const isModelOpen = isOpen && type === "importProject";

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
    setIsLoadingPost(true);
    const validate = importProjectSchema.safeParse({
      name: name,
      full_name: full_name,
      clone_url: clone_url,
      privateRepo: privateRepo,
    });
    if (validate.success === true) {
      await axios
        .post("/api/user/project", validate.data)
        .then(function () {
          onClose();
          router.push("/dashboard");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.error);
            toast({
              variant: "destructive",
              title: error.response.data.error,
            });
          }
        })
        .finally(function () {
          setIsLoadingPost(false);
        });

      onClose();
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium sm:text-2xl text-center">
            Import from GitHub
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-[300px] flex flex-col border rounded">
          <div className=" w-full h-[60px] px-2 flex flex-row gap-2 items-center">
            <Badge variant="secondary" className=" rounded font-normal p-[3px]">
              <div className="flex items-center gap-1 ">
                <Avatar className="w-[24px] h-[24px]">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    <Skeleton />
                  </AvatarFallback>
                </Avatar>
                <span className="capitalize">{user?.name}</span>
              </div>
            </Badge>
            <div className="relative flex-1 w-auto">
              <Input
                className="p-1 h-9"
                placeholder="Search Repositories.."
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          {!user?.installationId ? (
            <p className="text-center text-sm text-zinc-400 mt-[80px]">
              Please install GitHub App.
            </p>
          ) : isLoading ? (
            <ProjectModalSKL />
          ) : isError ? (
            <p className="text-center text-red-700 mt-[80px]">
              Somthing went wrong!
            </p>
          ) : (
            <>
              <ScrollArea className="h-64">
                {user?.installationId ? (
                  projectData?.repositories
                    .filter((project) =>
                      project.name.toLowerCase().includes(searchInput)
                    )
                    .reverse()
                    .map((project) => (
                      <div
                        key={project.id}
                        className="w-full h-fit p-3 flex flex-row items-center justify-between border"
                      >
                        <div className="flex items-center gap-2">
                          <FaGithub className="w-4 h-4" />
                          <span className="capitalize text-sm">
                            {project.name}
                          </span>
                          {project.private && (
                            <LockKeyhole className=" w-3 h-3" />
                          )}
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
            </>
          )}
        </div>
        {!user?.installationId ? (
          <DialogFooter>
            <Button onClick={() => installGithubApp()}>
              Install Github App
            </Button>
          </DialogFooter>
        ) : isError ? (
          <DialogFooter>
            <Button variant="destructive" onClick={handleClose}>
              Close
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter className="sm:justify-start">
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
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
