import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { getManyProjectByUserId, importProject } from "@/lib/db-query";
import { importProjectSchema } from "@/lib/schema";
import { Repository } from "@/lib/types";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await getManyProjectByUserId(profile.id);
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.log("[GET_PROJECT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const data: Repository = await req.json();
    const validate = importProjectSchema.safeParse(data);
    if (validate.success === false) {
      return NextResponse.json({ error: validate.error }, { status: 400 });
    }

    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingProject = await db.project.findFirst({
      where: {
        OR: [
          { name: validate.data.name },
          { repoName: validate.data.full_name },
          { gitUrl: validate.data.clone_url },
        ],
      },
    });

    if (existingProject) {
      const matchedFields = [];
      // if (existingProject.name === validate.data.name) {
      //   matchedFields.push("name");
      // }
      // if (existingProject.repoName === validate.data.full_name) {
      //   matchedFields.push("repository");
      // }
      if (existingProject.gitUrl === validate.data.clone_url) {
        matchedFields.push("repository");
      }

      const errorMessage = `Project already exist with this github ${matchedFields}.`;
      console.log("[POST_PROJECT]", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
    const repos = await importProject(
      profile.id,
      validate.data.name,
      validate.data.full_name,
      validate.data.clone_url,
      validate.data.privateRepo
    );

    return NextResponse.json({ repos }, { status: 200 });
  } catch (error: any) {
    console.log("[POST_PROJECT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
