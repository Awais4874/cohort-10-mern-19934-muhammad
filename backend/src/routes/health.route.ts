import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected ? "NotesMesh API is healthy" : "Database is unavailable",
    data: {
      service: "notesmesh-api",
      database: databaseConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString()
    }
  });
});

export default router;