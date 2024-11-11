import { db } from "../db";

export async function createProject(
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
