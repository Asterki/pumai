import dotenv from "dotenv";
import path from "path";

export function loadEnv() {
  const baseEnv = ".env";
  const envFile =
    process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";

  dotenv.config(); // Load base first
  dotenv.config({ path: path.resolve(process.cwd(), envFile) });

  const requiredEnv = [
    "SESSION_SECRET",
    "SESSION_COLLECTION_NAME",
    "MONGODB_URI",
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_SECURE",
    "EMAIL_FROM",
    "PORT",
    "EMAIL_USER",
    "EMAIL_PASS",
    "FRONT_END_ORIGIN",
    "TELEGRAM_BOT_TOKEN",
  ];

  console.log("[ENV] Loaded variables:", requiredEnv.join(", "));
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      "[ENV ERROR] Missing required variables:",
      missing.join(", "),
    );
    process.exit(1);
  }
}
