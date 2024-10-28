import axios from "axios";
import { generateGithubToken } from "@/lib/tokens";

// const token = generateGithubToken();
// console.log(token);

export async function GithubInstallation(token: string) {
  try {
    const response: githubInstallationInterface = await axios.get(
      "https://api.github.com/app/installations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    console.log({ installations: response.installation.id });
    return { installations: response.installation.id };
  } catch (error: any) {
    return console.log({ error: error.message }, { status: 500 });
  }
}

export async function githubInstallationToken(
  token: string,
  installationId: Number
) {
  try {
    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`, //56353458
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log({ access_token: response.data.token });
    return { access_token: response.data.token };
  } catch (error: any) {
    return console.log({ error: error.message }, { status: 500 });
  }
}

export async function deleteGithuInstallationApp(
  installationId: number,
  token: string
) {
  console.log(installationId);
  console.log(token);
  try {
    const response = await axios.delete(
      `https://api.github.com/app/installations/${installationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting installation:", error.message);
    throw error;
  }
}

export async function generateGithubAccessToken(
  installationId: number,
  token: string
) {
  try {
    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to generate accessToken:", error.message);
    throw error;
  }
}
