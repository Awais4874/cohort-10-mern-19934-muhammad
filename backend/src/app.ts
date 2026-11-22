import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import healthRoute from "./routes/health.route.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(pinoHttp({ logger }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to NotesMesh API"
  });
});

app.use("/api/v1/health", healthRoute);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;