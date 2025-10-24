import type { Express } from "express";

// Import routers
import StatusRouter from "./status";

export function registerRoutes(app: Express): void {
	app.use("/api/status", StatusRouter);
}
