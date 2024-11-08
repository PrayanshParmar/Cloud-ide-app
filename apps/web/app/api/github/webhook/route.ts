import crypto from "crypto";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { findFirstUserByName, updatedInstallationId } from "@/lib/db-query";

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const headersList = headers();
  const signature = headersList.get("x-hub-signature-256") as string;
  const event = headersList.get("x-github-event");

  // Verify the payload signature
  const payload = await req.text(); // Get the raw request body as a string
  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(payload).digest("hex")}`;

  if (signature !== digest) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
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

    await updatedInstallationId(user.id, installationId);

    console.log("Updated user Installation ID");
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
