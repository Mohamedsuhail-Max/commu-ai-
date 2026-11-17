export const getHealthStatus = () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'AI Communication Coach Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };
};
