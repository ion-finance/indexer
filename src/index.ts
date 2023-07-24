import dotenv from "dotenv";
import http from "http";
import cron from "node-cron";
import { refreshPools } from "./tasks/refreshPools";
import fetchEvents from "./tasks/fetchEvents";
import handleEvent from "./tasks/handleEvent";
import prisma from "./clients/prisma";
import sleep from "./utils/sleep";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MIN_POOL = 4000; // 4s

const eventPooling = async () => {
  const events = await fetchEvents();

  if (events.length === 0) {
    console.debug(`No events found. Sleep for ${MIN_POOL / 1000}s.`);
    sleep(MIN_POOL);
    return;
  }

  console.debug(`${events.length} events found.`);
  for (let i = 0; i < events.length; i++) {
    await handleEvent(events[events.length - 1 - i].event_id);
  }

  if (events.length > 0) {
    await prisma.indexerState.setLastTimestamp(events[0].timestamp);
  }
};

const main = async () => {
  for (;;) {
    await eventPooling();
  }
};

main();

// TOOO
// 1. set apy (daily, weekly)
// 2. refresh pool every 10 seconds when pool has new events

// refresh all pool every 1 minutes
cron.schedule("* * * * *", async () => {
  await refreshPools();
});

export const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      greeting: "hello",
    })
  );
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
