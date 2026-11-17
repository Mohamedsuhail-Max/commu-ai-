import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { authContext } from './middleware/authContext.js';
import apiRouter from './routes/index.js';

const app = express();

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS configuration for frontend
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (config.clientUrls.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 3. Body parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Rate Limiter on all /api routes
app.use('/api', apiRateLimiter);

// 5. User Context & Auth Middleware
app.use('/api', authContext);

// 6. Mount API Routes
app.use('/api', apiRouter);

// 6. Root greeting
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'AI Communication Coach API',
    status: 'online',
    documentation: '/api/health',
  });
});

// 7. 404 Not Found Catch-all
app.use(notFound);

// 8. Centralized Error Handler
app.use(errorHandler);

export default app;
