import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Diamond, PlusCircleIcon } from "lucide-react";
import { UserAvatar } from "../custome-ui/user-avtar";

interface user {
  id: string;
  imageUrl: string;
  name: string;
}

interface Organization {
  id: string;
  name: string;
  imageUrl: string;
}
interface SideBarHeaderProps {
  user: user;
  Organization: Organization[];
}
const SideBarHeader = ({ user, Organization }: SideBarHeaderProps) => {
  return (
    <SidebarHeader className="mt-2">
      <SidebarMenu>
        <SidebarMenuItem className=" flex flex-row gap-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Diamond className="size-4" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <UserAvatar
                  src={user.imageUrl}
                  className=" w-6 h-6 md:h-6 md:w-6"
                />
                {user.name}
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuLabel className=" font-normal">
                Teams
              </DropdownMenuLabel>
              {Organization?.map((organization, index) => (
                <DropdownMenuItem
                  key={index}
                  className=" hover:cursor-pointer "
                >
                  <UserAvatar
                    src={organization.imageUrl}
                    className=" w-6 h-6 md:h-6 md:w-6"
                  />
                  <span>{organization.name}</span>
                </DropdownMenuItem>
              ))}
              <Separator />
              <DropdownMenuItem className="hover:cursor-pointer">
                <PlusCircleIcon className=" ml-1 " />
                <span>Create workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default SideBarHeader;
