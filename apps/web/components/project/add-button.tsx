"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { useModal } from "@/hooks/use-model-store";
import { User } from "@repo/prisma";

interface AddButtonProps {
  user: User;
}
const AddButton = ({ user }: AddButtonProps) => {
  const { onOpen } = useModal();

  const data = [
    {
      title: "Import",
      icon: <FaGithub />,
      onClick: () => {
        console.log("hy");
        onOpen("importProject", { user });
      },
    },
    {
      title: "Create",
      icon: <Plus />,
      onClick: () => onOpen("createProject", { user }),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="default">
          <div className="block sm:hidden">
            <Plus />
          </div>
          <div className="sm:block hidden">
            <div className=" flex flex-row items-center gap-1">
              Add Project
              <ChevronDown />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data.map((item, index) => (
          <DropdownMenuItem
            onClick={item.onClick}
            className=" cursor-pointer"
            key={index}
          >
            {item.icon}
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddButton;
