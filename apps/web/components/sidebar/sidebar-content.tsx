import {
  CircleDollarSign,
  FileBox,
  FolderGit,
  GitMerge,
  Settings,
  Users,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SideBarContent = () => {
  const dumdata = {
    navMain: [
      {
        title: "Overview",
        items: [
          {
            title: "Projects",
            url: "/dashboard/projects",
            icon: <FileBox />,
          },
          {
            title: "Settings",
            url: "/dashboard/setttings",
            icon: <Settings />,
          },
          {
            title: "Invite members",
            url: "/dashboard/invite-members",
            icon: <Users />,
          },
          {
            title: "Upgrade",
            url: "/dashboard/upgrade",
            icon: <CircleDollarSign />,
          },
        ],
      },
      {
        title: "Repositories",
        items: [
          {
            title: "All repositories",
            url: "/dashboard/repos",
            icon: <FolderGit />,
          },
          {
            title: "My contributions",
            url: "/dashboard/my-contributions",
            icon: <GitMerge />,
          },
        ],
      },
    ],
  };

  return (
    <SidebarContent>
      {dumdata.navMain.map((item, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};

export default SideBarContent;
