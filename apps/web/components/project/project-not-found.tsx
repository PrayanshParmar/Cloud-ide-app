import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";
import { User } from "@repo/prisma";

interface ProjectNotFoundProps {
  user: User;
}
const ProjectNotFound = ({ user }: ProjectNotFoundProps) => {
  const { onOpen } = useModal();

  return (
    <div className="w-full h-full flex flex-col border p-3 gap-2 border-zinc-800 rounded-lg justify-center items-center">
      <p className="text-xl">No Project Found</p>
      <h3 className=" text-zinc-600 ">Create a new project</h3>
      <div className=" flex flex-row items-center gap-2 ">
        <Button onClick={() => onOpen("importProject", { user })}>
          <FaGithub />
          Import
        </Button>
        <Button onClick={() => onOpen("importProject", { user })}>
          <Plus />
          Create
        </Button>
      </div>
    </div>
  );
};

export default ProjectNotFound;
