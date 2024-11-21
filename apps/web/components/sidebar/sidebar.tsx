import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import SideBarHeader from "./sidebar-header";
import SideBarContent from "./sidebar-content";
import { User } from "@repo/prisma";
import SideBarNav from "./sidebar-nav";

interface SideBarProps {
  user: User;
  children: React.ReactNode;
}
const teamsData = {
  Organization: [
    {
      id: "dd23r23d",
      name: "org1",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yb2tlWERSVnJBT1pNY214ZnZ4R2VzbGF2UHYifQ",
    },
    {
      id: "dd23r34d",
      name: "org2",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yb2tlWERSVnJBT1pNY214ZnZ4R2VzbGF2UHYifQ",
    },
  ],
};
const SideBar = ({ user, children }: SideBarProps) => {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar">
        <SideBarHeader
          user={user}
          Organization={teamsData.Organization}
        ></SideBarHeader>
        <SideBarContent></SideBarContent>
      </Sidebar>
      <SideBarNav>{children}</SideBarNav>
    </SidebarProvider>
  );
};

export default SideBar;
