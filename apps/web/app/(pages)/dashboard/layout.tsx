import SideBar from "@/components/sidebar/sidebar";
import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignUp } from "@clerk/nextjs";
import React from "react";

const dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentProfile();
  if (!user) {
    return <RedirectToSignUp></RedirectToSignUp>;
  }
  return (
    <div
      className="h-screen flex items-center justify-center
    "
    >
      <SideBar user={user}>{children}</SideBar>
    </div>
  );
};

export default dashboardlayout;
