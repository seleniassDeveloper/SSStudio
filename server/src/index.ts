import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { initFirebase } from "./lib/firebase.js";
import { prisma } from "./lib/prisma.js";

const app = createApp();

initFirebase();

const server = app.listen(env.PORT, () => {
  console.log(`SSSTudio API → http://localhost:${env.PORT}`);
  console.log(`Health → http://localhost:${env.PORT}/api/v1/health`);
});

async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
