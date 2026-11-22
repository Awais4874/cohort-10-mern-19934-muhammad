import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { logger } from "./utils/logger.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    const server = app.listen(env.port, () => {
      logger.info(
        { port: env.port, environment: env.nodeEnv },
        "NotesMesh API server started"
      );
    });

    const shutdown = (signal: string): void => {
      logger.info({ signal }, "Shutdown signal received");
      server.close(() => {
        void disconnectDatabase()
          .then(() => process.exit(0))
          .catch((error: unknown) => {
            logger.error({ err: error }, "Error while closing database");
            process.exit(1);
          });
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    logger.fatal({ err: error }, "Unable to start NotesMesh API");
    process.exit(1);
  }
};

void startServer();