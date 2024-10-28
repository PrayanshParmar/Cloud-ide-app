import { auth } from "@clerk/nextjs/server";
import { findUserById, findUserByUserId } from "./db-query";

export const currentProfile = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const profile = await findUserByUserId(userId);

  return profile;
};
