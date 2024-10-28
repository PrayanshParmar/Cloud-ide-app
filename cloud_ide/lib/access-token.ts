import {
  createAccessToken,
  deleteAccessTokenByUserId,
  getAccessTokenByUserId,
} from "./db-query";

export async function setAccessToken(token: string, id: string) {
  const expTimeInHours = 8;
  const expTimeInMillisecond = expTimeInHours * 60 * 60 * 1000; // Convert to milliseconds

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
