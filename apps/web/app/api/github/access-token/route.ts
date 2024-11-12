// app/api/github/access-token/route.ts
import { NextResponse } from "next/server";
import { generateGithubToken } from "@/lib/tokens";
import { currentProfile } from "@/lib/current-profile";
import { getAccessToken, setAccessToken } from "@/lib/access-token";
import { generateGithubAccessToken } from "@/lib/github-query/github";

export async function GET() {
  try {
    const currentUser = await currentProfile();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    if (!currentUser.installationId) {
      return NextResponse.json(
        { error: "installation id not found" },
        { status: 400 }
      );
    }
    const checkExistingToken = await getAccessToken(currentUser.id);

    if (checkExistingToken) {
      return NextResponse.json({ token: checkExistingToken }, { status: 200 });
    }
    const token = generateGithubToken();

    const response = await generateGithubAccessToken(
      currentUser.installationId,
      token
    );

    if (response.token && currentUser.userId) {
      const newToken = await setAccessToken(response.token, currentUser.id);

      return NextResponse.json({ token: newToken }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
