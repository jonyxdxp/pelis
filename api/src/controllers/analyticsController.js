const analyticsService = require('../services/analyticsService');
const { asyncHandler } = require('../middleware/errorHandler');
const { ApiError } = require('../middleware/errorHandler');

class AnalyticsController {
  // POST /analytics/view - Track content view
  trackView = asyncHandler(async (req, res) => {
    const { contentId, contentType, deviceType, deviceName } = req.body;
    const ipAddress = req.ip;

    if (!contentId || !contentType) {
      throw new ApiError('contentId and contentType are required', 400);
    }

    const result = await analyticsService.trackView({
      contentId,
      contentType,
      deviceType: deviceType || 'web',
      deviceName,
      ipAddress,
    });

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /analytics/content/:id/stats - Get content statistics
  getContentStats = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type = 'movie', days = 30 } = req.query;

    const stats = await analyticsService.getContentStats(
      id,
      type,
      parseInt(days)
    );

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /analytics/popular - Get popular content
  getPopularContent = asyncHandler(async (req, res) => {
    const { type = 'all', limit = 20, days = 30 } = req.query;

    const popular = await analyticsService.getPopularContent(
      type,
      parseInt(limit),
      parseInt(days)
    );

    res.json({
      success: true,
      data: popular,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /analytics/dashboard - Get dashboard stats
  getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await analyticsService.getDashboardStats();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new AnalyticsController();
