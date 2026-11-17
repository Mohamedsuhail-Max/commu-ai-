import { verifyDatabaseConnection } from '../config/prisma.js';

export const getHealthStatus = async () => {
  const dbStatus = await verifyDatabaseConnection();

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'AI Communication Coach Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: {
      provider: 'Supabase PostgreSQL',
      orm: 'Prisma 6.19.3',
      connected: dbStatus.connected,
      message: dbStatus.connected ? 'Connected to database' : dbStatus.message,
    },
  };
};
