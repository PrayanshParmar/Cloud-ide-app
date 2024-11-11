import Dashboard from "@/components/dashboard/dashboard";
import { currentProfile } from "@/lib/current-profile";

import { RedirectToSignUp } from "@clerk/nextjs";
const Page = async () => {
  const user = await currentProfile();
  if (!user) {
    return <RedirectToSignUp></RedirectToSignUp>;
  }
  return (
    <>
      <Dashboard user={user}></Dashboard>
    </>
  );
};

export default Page;
