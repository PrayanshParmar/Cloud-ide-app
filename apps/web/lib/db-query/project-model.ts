import { db } from "../db";

export async function importProject(
  userId: string,
  name: string,
  repoName: string,
  gitUrl: string,
  privateRepo: boolean
) {
  const res = await db.project.create({
    data: {
      userId,
      name,
      repoName,
      gitUrl,
      privateRepo,
    },
  });

  return res;
}

export async function getManyProjectByUserId(id: string) {
  const res = await db.project.findMany({
    where: {
      userId: id,
    },
  });

  return res;
}
