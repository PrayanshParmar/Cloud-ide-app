import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Ellipsis, GitMerge } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { convertToDaysAgo } from "@/lib/date-to-ago";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  name: String;
  date: Date;
  branch: "main";
  full_name: String;
  username: String;
}

const ProjectCard = ({
  name,
  date,
  branch,
  full_name,
  username,
}: ProjectCardProps) => {
  return (
    <Link href={`/dashboard/${username}-projects/${name}`} passHref>
      <Card>
        <CardContent>
          <div className=" flex flex-col gap-4 ">
            <div className=" flex items-center justify-between w-full h-full pt-2">
              <div className=" flex items-center flex-row gap-2 ">
                <FaGithub className=" h-7 w-7" />
                <span>{name}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none " asChild>
                  <Button variant="ghost" size="icon">
                    <Ellipsis className=" w-[15px] h-[15px] " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      className="w-full"
                      href={`/dashboard/${username}-projects/${name}/logs`}
                    >
                      View Logs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="w-full"
                      href={`/dashboard/${username}-projects/${name}/settings/domains`}
                    >
                      Manage Domains
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      className="w-full"
                      href={`/dashboard/${username}-projects/${name}/settings`}
                    >
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Badge
                variant="secondary"
                className=" dark:bg-[#111]  bg-[#fafafa] h-8 text-semibold "
              >
                <div className=" flex items-center gap-1">{full_name}</div>
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className=" flex  items-center justify-center text-sm gap-1 dark:text-gray-400 text-gray-600 ">
            <span>{convertToDaysAgo(String(date))}</span>
            <GitMerge className=" w-4 h-4 " /> <span>{branch}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
