import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: NextRequest) {
  const { installationId } = await req.json();
  const profile = await currentProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.user.update({
    where: { id: profile.id },
    data: { installationId },
  });

  return NextResponse.json({ success: true });
}
