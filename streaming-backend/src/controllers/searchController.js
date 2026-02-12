const searchService = require('../services/searchService');
const { asyncHandler } = require('../middleware/errorHandler');

class SearchController {
  // GET /search - Global search
  search = asyncHandler(async (req, res) => {
    const { q, type = 'all', limit = 20 } = req.query;
    
    const results = await searchService.search(q, { type, limit: parseInt(limit) });

    res.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /search/suggestions - Autocomplete suggestions
  getSuggestions = asyncHandler(async (req, res) => {
    const { q, limit = 10 } = req.query;
    
    const suggestions = await searchService.getSuggestions(q, parseInt(limit));

    res.json({
      success: true,
      data: { suggestions },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /search/advanced - Advanced search with filters
  advancedSearch = asyncHandler(async (req, res) => {
    const {
      q,
      genres,
      year_from,
      year_to,
      rating_min,
      type = 'all',
      sort_by = 'relevance',
      page = 1,
      limit = 20,
    } = req.query;

    const results = await searchService.advancedSearch({
      query: q,
      genres,
      yearFrom: year_from ? parseInt(year_from) : undefined,
      yearTo: year_to ? parseInt(year_to) : undefined,
      ratingMin: rating_min ? parseFloat(rating_min) : undefined,
      type,
      sortBy: sort_by,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new SearchController();
