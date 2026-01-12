import type { Express } from "express";

// Import routers
import StatusRouter from "./status";
import AIRouter from "./ai";
import AuthRouter from "./auth";

export function registerRoutes(app: Express): void {
  app.use("/api/ai", AIRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/status", StatusRouter);
}
