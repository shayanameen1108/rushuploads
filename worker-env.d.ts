// Worker bindings and vars for this app (see `void.config.ts` `cloudflare:`).
declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    R2: R2Bucket;
    AI: Ai;
    SEND_EMAIL: SendEmail;
    ANALYTICS: AnalyticsEngineDataset;
    APP_NAME: string;
  }
}

interface Env extends Cloudflare.Env {}
