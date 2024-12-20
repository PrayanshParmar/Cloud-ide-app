import { currentProfile } from "@/lib/current-profile";

import { RedirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const Page = async () => {
  const user = await currentProfile();
  if (!user) {
    return <RedirectToSignUp></RedirectToSignUp>;
  }
  return redirect("/dashboard/projects");
};

export default Page;
