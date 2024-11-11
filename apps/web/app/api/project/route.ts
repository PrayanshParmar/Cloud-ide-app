import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { createProject } from "@/lib/db-query";
import { createProjectSchema } from "@/lib/schema";
import { Repository } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const data: Repository = await req.json();
    const validate = createProjectSchema.safeParse(data);
    if (validate.success === false) {
      return NextResponse.json({ error: validate.error }, { status: 400 });
    }

    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const repos = await createProject(
      profile.id,
      validate.data.name,
      validate.data.full_name,
      validate.data.clone_url,
      validate.data.privateRepo
    );

    return NextResponse.json({ repos }, { status: 200 });
  } catch (error: any) {
    console.log("[Create Project]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
