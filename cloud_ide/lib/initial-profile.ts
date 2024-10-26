import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      name: String(user.username),
      userId: user.id,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

export default initialProfile;
