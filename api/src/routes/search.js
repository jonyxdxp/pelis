const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { validate, schemas } = require('../middleware/validation');
const { searchLimiter } = require('../middleware/rateLimiter');

// GET /search - Global search
router.get('/', searchLimiter, validate(schemas.searchQuery), searchController.search);

// GET /search/suggestions - Autocomplete suggestions
router.get('/suggestions', searchLimiter, searchController.getSuggestions);

// GET /search/advanced - Advanced search with filters
router.get('/advanced', searchLimiter, searchController.advancedSearch);

module.exports = router;
