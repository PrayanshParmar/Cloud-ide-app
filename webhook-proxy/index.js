const SmeeClient = require("smee-client");
require("dotenv").config();

const smeeClerk = new SmeeClient({
  source: process.env.SMEE_CLERK_WEBHOOK_URL,
  target: "http://localhost:3000/api/clerk/webhook",
  logger: console,
});

const smeeGithub = new SmeeClient({
  source: process.env.SMEE_GITHUB_WEBHOOK_URL,
  target: "http://localhost:3000/api/github/webhook",
  logger: console,
});

const event1 = smeeClerk.start();
const event2 = smeeGithub.start();
