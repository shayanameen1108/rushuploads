import { defineConfig } from "void/config";

export default defineConfig({
  target: "cloudflare",
  routing: {
    // SSR app; avoids interactive ISR prompt on deploy.
    isr: false,
  },
  worker: {
    // Void deploy default; bump deliberately.
    compatibility_date: "2026-09-11",
    compatibility_flags: ["nodejs_compat", "nodejs_als"],
  },
  inference: {
    bindings: {
      // DB ships ahead of the code that will use it; the explicit enable pins
      // the binding so Void provisions it on deploy (id lands in void.lock.json).
      db: true,
    },
  },
  cloudflare: {
    name: "rushuploads",
    account_id: "ab816378ce175deba8768e44d4c9478b",
    // No custom domain yet; served on workers.dev.
    workers_dev: true,
    observability: {
      enabled: true,
    },
    vars: {
      APP_NAME: "rushuploads",
    },
    analytics_engine_datasets: [
      {
        binding: "ANALYTICS",
        dataset: "rushuploads_events",
      },
    ],
    // Workers AI has no local simulation; set remote:true when a route needs
    // live inference (see vektor) — dev then needs CLOUDFLARE_API_TOKEN.
    ai: {
      binding: "AI",
    },
    d1_databases: [
      {
        binding: "DB",
        database_name: "rushuploads",
        migrations_dir: "./db/migrations",
      },
    ],
    r2_buckets: [
      {
        binding: "R2",
        bucket_name: "rushuploads",
      },
    ],
    send_email: [{ name: "SEND_EMAIL" }],
  },
});
