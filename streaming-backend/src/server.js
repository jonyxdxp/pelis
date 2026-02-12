const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const env = require('./config/env');
const { testConnection, disconnect } = require('./config/database');
const logger = require('./config/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

// Import routes
const movieRoutes = require('./routes/movies');
const seriesRoutes = require('./routes/series');
const searchRoutes = require('./routes/search');
const genreRoutes = require('./routes/genres');
const homeRoutes = require('./routes/home');
const recommendationRoutes = require('./routes/recommendations');
const analyticsRoutes = require('./routes/analytics');
const vidlinkRoutes = require('./routes/vidlink'); // ← NUEVO

// Create Express app
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS
app.use(cors({
  origin: env.CORS_ORIGIN.split(','),
  credentials: true,
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// Health check endpoint (before rate limiting)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API rate limiting
app.use('/api', apiLimiter);



// API Routes
// API Routes
const apiVersion = env.API_VERSION;
app.use(`/api/${apiVersion}/movies`, movieRoutes);
app.use(`/api/${apiVersion}/series`, seriesRoutes);
app.use(`/api/${apiVersion}/search`, searchRoutes);
app.use(`/api/${apiVersion}/genres`, genreRoutes);
app.use(`/api/${apiVersion}/home`, homeRoutes);
app.use(`/api/${apiVersion}`, recommendationRoutes);
app.use(`/api/${apiVersion}/analytics`, analyticsRoutes);
app.use(`/api/${apiVersion}/vidlink`, vidlinkRoutes); // ← CONSISTENTE





// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Streaming API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      movies: `/api/${apiVersion}/movies`,
      series: `/api/${apiVersion}/series`,
      search: `/api/${apiVersion}/search`,
      genres: `/api/${apiVersion}/genres`,
      home: `/api/${apiVersion}/home`,
      trending: `/api/${apiVersion}/trending`,
      analytics: `/api/${apiVersion}/analytics`,
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      logger.error('Failed to connect to database. Exiting...');
      process.exit(1);
    }

    // Start listening
    app.listen(env.PORT, env.HOST, () => {
      logger.info(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
      logger.info(`📚 API documentation available at http://${env.HOST}:${env.PORT}/api/${apiVersion}`);
      logger.info(`💚 Health check at http://${env.HOST}:${env.PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  await disconnect();
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
