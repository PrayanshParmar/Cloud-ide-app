import crypto from "crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { findFirstUserByName, updatedInstallationId } from "@/lib/db-query";
import { getAccessToken, setAccessToken } from "@/lib/access-token";
import { generateGithubToken } from "@/lib/tokens";
import { generateGithubAccessToken } from "@/lib/github-query/github";

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const signature = headersList.get("x-hub-signature-256") as string;
    const event = headersList.get("x-github-event");

    // Verify the payload signature
    const payload = await req.text(); // Get the raw request body as a string
    const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;

    if (signature !== digest) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 403 }
      );
    }

    if (!payload) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // Parse the payload to JSON
    const body = JSON.parse(payload);

    // Process only `installation` events
    if (event === "installation" && body.action === "created") {
      console.log(body.installation);
      const installationId = body.installation.id;
      const username = body.installation.account.login;

      console.log(username);
      // find user by api name

      const user = await findFirstUserByName(username.toLowerCase());

      if (!user) {
        return NextResponse.json({ message: "No user found" }, { status: 400 });
      }
      // Updated installtion id of that user

      const updatedUser = await updatedInstallationId(user.id, installationId);

      if (!updatedUser.installationId) {
        return NextResponse.json(
          { error: "installation id not found" },
          { status: 400 }
        );
      }
      const checkExistingToken = await getAccessToken(updatedUser.id);

      if (checkExistingToken) {
        return NextResponse.json(
          { message: "Token already existed" },
          { status: 400 }
        );
      }
      const token = generateGithubToken();
      console.log(updatedUser.installationId);
      console.log(token);

      const response = await generateGithubAccessToken(
        updatedUser.installationId,
        token
      );

      console.log("user", updatedUser);
      if (response.token && updatedUser.userId) {
        setAccessToken(response.token, updatedUser.id);

        return NextResponse.json(
          { message: "Access token created" },
          { status: 200 }
        );
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
