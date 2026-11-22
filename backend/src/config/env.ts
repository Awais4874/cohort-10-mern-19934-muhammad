import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number.");
}

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is required. Configure it in backend/.env.");
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  mongoUri,
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  logLevel: process.env.LOG_LEVEL ?? "info"
} as const;