// app/api/github/access-token/route.ts
import { NextResponse } from "next/server";
import { generateGithubToken } from "@/lib/tokens";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const installationId = searchParams.get("installationId");

  if (!installationId) {
    return NextResponse.json(
      { error: "Installation ID is required" },
      { status: 400 }
    );
  }

  const token = generateGithubToken();

  try {
    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return NextResponse.json({ token: response.data.token });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
