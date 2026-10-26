import { defineScheduled } from "void";

// Hourly placeholder from the scaffold; point it at domain work when the
// domain exists.
export const cron = "0 * * * *";

export default defineScheduled(async (_controller) => {
  console.log("Cron", new Date().toISOString());
});
