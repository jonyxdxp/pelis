const rateLimit = require('express-rate-limit');
const env = require('../config/env');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later',
    },
    timestamp: new Date().toISOString(),
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

// Stricter limiter for analytics endpoints
const analyticsLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 60, // 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Analytics rate limit exceeded',
    },
    timestamp: new Date().toISOString(),
  },
});

// Search limiter (more lenient)
const searchLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 120, // 120 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Search rate limit exceeded',
    },
    timestamp: new Date().toISOString(),
  },
});

module.exports = {
  apiLimiter,
  analyticsLimiter,
  searchLimiter,
};
