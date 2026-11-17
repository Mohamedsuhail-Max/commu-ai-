import app from './src/app.js';
import { config } from './src/config/env.js';
import { logger } from './src/utils/logger.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info(`Server is running in [${config.nodeEnv}] mode on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/api/health`);
  logger.info(`Allowed CORS origins: ${config.clientUrls.join(', ')}`);
});

// Graceful shutdown handling
const shutdown = () => {
  logger.info('Received shutdown signal, terminating server gracefully...');
  server.close(() => {
    logger.info('Server closed. Process terminated.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export default server;
