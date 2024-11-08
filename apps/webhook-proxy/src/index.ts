import SmeeClient from "smee-client";
import "dotenv/config";

const smeeClerk = new SmeeClient({
  source: String(process.env.SMEE_CLERK_WEBHOOK_URL),
  target: "http://localhost:3000/api/clerk/webhook",
  logger: console,
});

const smeeGithub = new SmeeClient({
  source: String(process.env.SMEE_GITHUB_WEBHOOK_URL),
  target: "http://localhost:3000/api/github/webhook",
  logger: console,
});

smeeClerk.start();
smeeGithub.start();
