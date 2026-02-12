const recommendationService = require('../services/recommendationService');
const { asyncHandler } = require('../middleware/errorHandler');
const { ApiError } = require('../middleware/errorHandler');

class RecommendationController {
  // GET /content/:id/recommendations - Get recommendations for content
  getRecommendations = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, limit = 20 } = req.query;

    if (!type || !['movie', 'series'].includes(type)) {
      throw new ApiError('Type parameter must be "movie" or "series"', 400);
    }

    const recommendations = await recommendationService.getRecommendations(
      id,
      type,
      parseInt(limit)
    );

    res.json({
      success: true,
      data: { recommendations },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /trending - Get trending content (movies + series)
  getTrending = asyncHandler(async (req, res) => {
    const { limit = 20 } = req.query;
    
    const trending = await recommendationService.getTrending(parseInt(limit));

    res.json({
      success: true,
      data: { trending },
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new RecommendationController();
