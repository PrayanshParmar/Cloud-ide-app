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
