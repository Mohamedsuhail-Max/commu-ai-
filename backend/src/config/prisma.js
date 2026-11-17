import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

let prisma;

const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes('USER:PASSWORD') &&
  !process.env.DATABASE_URL.includes('user:password@localhost')
);

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  // Prevent multiple instances of Prisma Client in development during hot-reloads
  if (!global.__prismaClient) {
    global.__prismaClient = new PrismaClient({
      log: isDatabaseConfigured ? ['warn', 'error'] : ['error'],
    });
  }
  prisma = global.__prismaClient;
}

/**
 * Helper to verify database connectivity
 */
export const verifyDatabaseConnection = async () => {
  if (!isDatabaseConfigured) {
    logger.warn('DATABASE_URL is not configured with actual credentials. Prisma running in standby mode.');
    return {
      connected: false,
      reason: 'DATABASE_URL_NOT_CONFIGURED',
      message: 'Awaiting Supabase PostgreSQL connection string in backend/.env',
    };
  }

  try {
    // Run lightweight query to verify connectivity
    await prisma.$queryRaw`SELECT 1 as connection_test`;
    logger.info('Connected to Supabase PostgreSQL database via Prisma ORM.');
    return { connected: true };
  } catch (err) {
    logger.error('Failed to establish connection with PostgreSQL database:', err.message);
    return {
      connected: false,
      reason: 'CONNECTION_ERROR',
      message: err.message,
    };
  }
};

export { prisma, isDatabaseConfigured };
export default prisma;
