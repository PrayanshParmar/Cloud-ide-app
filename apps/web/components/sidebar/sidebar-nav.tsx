import { UserButton } from "@clerk/nextjs";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "@/lib/mode-toggle";

interface SideBarNavProps {
  children: React.ReactNode;
}
const SideBarNav = ({ children }: SideBarNavProps) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
        <div className=" flex flex-row items-center gap-1">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className=" flex flex-row gap-2 items-center">
          <ModeToggle />
          <UserButton />
        </div>
      </header>
      {children}
    </SidebarInset>
  );
};

export default SideBarNav;
