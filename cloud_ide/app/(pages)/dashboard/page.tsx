"use client";
import { Button } from "@/components/ui/button";

const Page = () => {
  const handleGithubAppInstallion = async () => {
    const response = await fetch("/api/github/install-token");
    const data = await response.json();

    if (data.redirect) {
      // Redirect the user to the GitHub app installation page
      window.location.href = data.redirect;
      return;
    }
  };

  const handleAccessToken = async () => {
    const response = await fetch("/api/github/access-token");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={handleGithubAppInstallion} variant="green">
        Add project
      </Button>
      <Button onClick={handleAccessToken}>Get Token</Button>
    </div>
  );
};

export default Page;
