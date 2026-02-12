const Joi = require('joi');
const { ApiError } = require('./errorHandler');

// Common validation schemas
const schemas = {
  // Pagination
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
  }),

  // Movie filters
  movieFilters: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sort: Joi.string().valid('rating', 'release_date', 'views', 'added', 'title').default('added'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
    genres: Joi.string(),
    rating_min: Joi.number().min(0).max(10),
    year_from: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    year_to: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    search: Joi.string().min(1).max(100),
    featured: Joi.boolean(),
  }),

  // Series filters
  seriesFilters: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    sort: Joi.string().valid('rating', 'first_air_date', 'views', 'added', 'title').default('added'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
    genres: Joi.string(),
    rating_min: Joi.number().min(0).max(10),
    year_from: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    year_to: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    search: Joi.string().min(1).max(100),
    status: Joi.string().valid('returning', 'ended', 'cancelled', 'planned'),
  }),

  // Search
  searchQuery: Joi.object({
    q: Joi.string().min(1).max(100).required(),
    type: Joi.string().valid('all', 'movie', 'series').default('all'),
    limit: Joi.number().integer().min(1).max(50).default(20),
  }),

  // Slug param
  slugParam: Joi.object({
    slug: Joi.string().required(),
  }),

  // ID param
  idParam: Joi.object({
    id: Joi.string().uuid().required(),
  }),

  // Analytics
  analytics: Joi.object({
    contentId: Joi.string().uuid().required(),
    contentType: Joi.string().valid('movie', 'series', 'episode').required(),
    deviceType: Joi.string().valid('mobile', 'tv', 'web', 'tablet').default('web'),
    deviceName: Joi.string().max(255),
  }),
};

// Validation middleware factory
const validate = (schema, property = 'query') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return next(new ApiError(message, 400, 'VALIDATION_ERROR'));
    }

    // Replace with validated values
    req[property] = value;
    next();
  };
};

module.exports = {
  schemas,
  validate,
};
