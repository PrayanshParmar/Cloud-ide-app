// Access Token

import { db } from "../db";

// Create

export async function createAccessToken(
  userId: string,
  token: string,
  expiresAt: Date
) {
  const res = await db.accessToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return res;
}

// Read
export async function getAccessTokenByUserId(userId: string) {
  const res = await db.accessToken.findUnique({
    where: {
      userId,
    },
  });

  return res;
}

// Delete
export async function deleteAccessTokenByUserId(userId: string) {
  const res = await db.accessToken.delete({
    where: {
      userId,
    },
  });

  return res;
}
