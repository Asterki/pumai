import type { Express } from "express";

// Import routers
import StatusRouter from "./status";
import AIRouter from "./ai";

export function registerRoutes(app: Express): void {
  app.use("/api/ai", AIRouter);
  app.use("/api/status", StatusRouter);
}
