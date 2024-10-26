import { NextResponse } from "next/server";
import { generateGithubToken } from "@/lib/tokens";
import axios from "axios";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

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

    // const token = generateGithubToken();
    // const response = await axios.get(
    //   "https://api.github.com/app/installations",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       Accept: "application/vnd.github.v3+json",
    //     },
    //   }
    // );

    // console.log(response.data);

    // const userInstallation = response.data.find(
    //   (installation: any) => installation.target_id === profile.userId // Ensure `githubUserId` is in `profile`
    // );

    // if (!userInstallation) {
    //   return NextResponse.json(
    //     { error: "No installation found for this user" },
    //     { status: 404 }
    //   );
    // }

    // Store the installation ID in the database if it doesn’t already exist
    // await db.user.update({
    //   where: { id: profile.id },
    //   data: { installationId: userInstallation.id },
    // });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
