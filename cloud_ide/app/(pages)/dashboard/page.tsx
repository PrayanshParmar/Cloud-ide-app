"use client";
import { Button } from "@/components/ui/button";
import githubAppInstallion from "@/lib/github-app-installtion";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  // const installation_id = searchParams.get("installation_id");

  // useEffect(() => {
  //   if (installation_id) {
  //     // Call your API to save the installation_id
  //     const saveInstallationId = async () => {
  //       try {
  //         await axios.post("/api/save-installation", {
  //           installationId: installation_id,
  //         });
  //         console.log("Installation ID saved successfully");
  //       } catch (error) {
  //         console.error("Failed to save installation ID:", error);
  //       }
  //     };

  //     saveInstallationId();
  //   }
  // }, [installation_id]);
  const handleGithubAppInstallion = async () => {
    // try {
    const response = await fetch("/api/github/install-token");
    const data = await response.json();

    // if (data.installations.length === 0) {
    //   // Redirect user to GitHub app installation page
    //   window.location.href =
    //     "https://github.com/apps/cloud-ide-app/installations/new";
    // } else {
    //   // Assume there's only one installation, or choose the first one
    //   const installationId = data.installations[0].id;

    //   // Generate access token for the specific installation
    //   const accessTokenResponse = await fetch(
    //     `/api/github/access-token?installationId=${installationId}`
    //   );
    //   const accessTokenData = await accessTokenResponse.json();

    //   console.log("Access Token:", accessTokenData.token);

    //   // Now you can use this access token to access the user's repositories
    //   // Example: Fetch repositories
    //   const reposResponse = await fetch(
    //     "https://api.github.com/installation/repositories",
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessTokenData.token}`,
    //         Accept: "application/vnd.github.v3+json",
    //       },
    //     }
    //   );
    // const reposData = await reposResponse.json();
    // console.log("User Repositories:", reposData);

    if (data.redirect) {
      // Redirect the user to the GitHub app installation page
      window.location.href = data.redirect;
      return;
    }
    console.log("User Data:", data);
    // } catch (error) {
    //   console.error("Error fetching installation:", error);
    // }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={handleGithubAppInstallion} variant="green">
        Add project
      </Button>
    </div>
  );
};

export default Page;
