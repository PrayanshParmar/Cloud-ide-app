import {
  createAccessToken,
  deleteAccessTokenByUserId,
  getAccessTokenByUserId,
  updateAccessToken,
} from "./db-query";
import { generateGithubAccessToken } from "./github-query/github";
import { generateGithubToken } from "./tokens";

export async function setAccessToken(token: string, id: string) {
  const expTimeInMillisecond = 60 * 60 * 1000; // Convert to milliseconds

  const accessToken = token;
  const tokenExpiration = new Date(Date.now() + expTimeInMillisecond); // Convert to Date object

  const res = await createAccessToken(id, accessToken, tokenExpiration);

  return res;
}

export async function getAccessToken(id: string) {
  const data = await getAccessTokenByUserId(id);

  if (data?.token && data.expiresAt instanceof Date) {
    const currentTime = Date.now(); // Get current time in milliseconds
    const expirationTime = data.expiresAt.getTime(); // Convert expiresAt to milliseconds

    // Return the token if it's still valid
    if (currentTime < expirationTime) {
      return data.token;
    } else {
      await deleteAccessTokenByUserId(id);
    }

    return null;
  }

  return null;
}

export async function validateAccessToken(
  id: string,
  installationId: number
): Promise<string | null> {
  const data = await getAccessTokenByUserId(id);
  if (data?.token && data.expiresAt instanceof Date) {
    const currentTime = Date.now(); // Get current time in milliseconds
    const expirationTime = data.expiresAt.getTime(); // Convert expiresAt to milliseconds

    if (currentTime < expirationTime) {
      return data.token;
    } else {
      const jwtToken = generateGithubToken();
      const newToken = await generateGithubAccessToken(
        installationId,
        jwtToken
      );
      if (newToken.token) {
        const expTimeInMillisecond = 60 * 60 * 1000; // Convert to milliseconds
        const tokenExpiration = new Date(Date.now() + expTimeInMillisecond);
        const { token } = await updateAccessToken(
          id,
          newToken.token,
          tokenExpiration
        );
        return token;
      }
    }
  }

  return null;
}
