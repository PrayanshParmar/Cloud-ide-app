import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { getUserRepos } from "@/lib/github-query/github";
import { getAccessTokenByUserIdOnlyToken } from "@/lib/db-query";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = await getAccessTokenByUserIdOnlyToken(profile.id);

    if (!accessToken) {
      return NextResponse.json(
        { message: "No access token found" },
        { status: 400 }
      );
    }

    const repos = await getUserRepos(accessToken.token);

    return NextResponse.json({ repos }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}
