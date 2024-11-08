import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const githubAppName = process.env.GITHUB_APP_NAME;

    if (!profile.installationId) {
      return NextResponse.json(
        {
          redirect: `https://github.com/apps/${githubAppName}/installations/new`,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Installtion id exist" },
      { status: 400 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
