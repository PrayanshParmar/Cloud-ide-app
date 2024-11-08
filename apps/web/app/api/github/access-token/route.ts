// app/api/github/access-token/route.ts
import axios from "axios";
import { NextResponse } from "next/server";
import { generateGithubToken } from "@/lib/tokens";
import { currentProfile } from "@/lib/current-profile";
import { getAccessToken, setAccessToken } from "@/lib/access-token";
import { generateGithubAccessToken } from "@/lib/github-query/github";

export async function GET() {
  try {
    const currentUser = await currentProfile();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (!currentUser.installationId) {
      return NextResponse.json(
        { error: "installation id not found" },
        { status: 400 }
      );
    }
    const checkExistingToken = await getAccessToken(currentUser.id);

    if (checkExistingToken) {
      return NextResponse.json(
        { message: "Token already existed" },
        { status: 400 }
      );
    }
    const token = generateGithubToken();
    console.log(currentUser.installationId);
    console.log(token);

    const response = await generateGithubAccessToken(
      currentUser.installationId,
      token
    );

    console.log("user", currentUser);
    if (response.token && currentUser.userId) {
      setAccessToken(response.token, currentUser.id);

      return NextResponse.json(
        { message: "Access token created" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
