require('dotenv').config();

const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 3000,
  HOST: process.env.HOST || '0.0.0.0',
  API_VERSION: process.env.API_VERSION || 'v1',

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // Redis
  REDIS_URL: process.env.REDIS_URL,
  REDIS_ENABLED: process.env.REDIS_ENABLED === 'true',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  LOG_FORMAT: process.env.LOG_FORMAT || 'combined',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // External URLs
  CDN_BASE_URL: process.env.CDN_BASE_URL || '',
  VIDEO_STREAM_BASE_URL: process.env.VIDEO_STREAM_BASE_URL || '',

  // Analytics
  ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED !== 'false',

  // Pagination
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 20,
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100,
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'];

for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    console.error(`❌ Error: Environment variable ${envVar} is required`);
    process.exit(1);
  }
}

module.exports = env;
