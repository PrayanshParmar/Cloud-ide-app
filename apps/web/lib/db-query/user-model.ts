import { db } from "@/lib/db";

// User
// Create

export async function createUser(
  name: string,
  userId: string,
  imageUrl: string,
  email: string
) {
  const res = await db.user.create({
    data: {
      name,
      userId,
      imageUrl,
      email,
    },
  });

  return res;
}

// Read
export async function findUserById(id: string) {
  const res = await db.user.findUnique({
    where: {
      id,
    },
  });

  return res;
}

export async function findUserByUserId(userId: string) {
  const res = await db.user.findUnique({
    where: {
      userId,
    },
  });

  return res;
}

export async function findUserByName(name: string) {
  const res = await db.user.findUnique({
    where: {
      name,
    },
  });

  return res;
}

export async function findFirstUserByName(name: string) {
  const res = await db.user.findUnique({
    where: {
      name,
    },
  });

  return res;
}

// Updated
export async function updatedInstallationId(
  id: string,
  installationId: number
) {
  const res = await db.user.update({
    where: {
      id,
    },
    data: {
      installationId,
    },
  });

  return res;
}

// Delete

export async function deleteUserByUserId(userId: string) {
  const res = await db.user.delete({
    where: {
      userId,
    },
  });

  return res;
}
