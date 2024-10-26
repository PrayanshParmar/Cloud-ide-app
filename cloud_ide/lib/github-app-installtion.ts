import { GithubInstallation } from "./github-req";
import { generateGithubToken } from "./tokens";

export async function githubAppInstallion() {
  const handleGithubAppInstallion = async () => {
    try {
      const response = await fetch("/api/github/install-token");
      const data = await response.json();

      if (data.installations.length === 0) {
        // Redirect user to GitHub app installation page
        window.location.href =
          "https://github.com/apps/cloud-ide-app/installations/new";
      } else {
        // Assume there's only one installation, or choose the first one
        const installationId = data.installations[0].id;

        // Generate access token for the specific installation
        const accessTokenResponse = await fetch(
          `/api/github/access-token?installationId=${installationId}`
        );
        const accessTokenData = await accessTokenResponse.json();

        console.log("Access Token:", accessTokenData.token);

        // Now you can use this access token to access the user's repositories
        // Example: Fetch repositories
        const reposResponse = await fetch(
          "https://api.github.com/installation/repositories",
          {
            headers: {
              Authorization: `Bearer ${accessTokenData.token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const reposData = await reposResponse.json();
        console.log("User Repositories:", reposData);
      }
    } catch (error) {
      console.error("Error fetching installation:", error);
    }
  };

  return;
}

export default githubAppInstallion;
