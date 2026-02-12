const seriesService = require('../services/seriesService');
const { asyncHandler } = require('../middleware/errorHandler');

class SeriesController {
  // GET /series - List all series
  getAllSeries = asyncHandler(async (req, res) => {
    const result = await seriesService.getAllSeries(req.query);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/trending - Get trending series
  getTrending = asyncHandler(async (req, res) => {
    const { limit = 20 } = req.query;
    const series = await seriesService.getTrendingSeries(parseInt(limit));

    res.json({
      success: true,
      data: { series },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/new - Get new series
  getNewSeries = asyncHandler(async (req, res) => {
    const { limit = 20 } = req.query;
    const series = await seriesService.getNewSeries(parseInt(limit));

    res.json({
      success: true,
      data: { series },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/rated - Get top rated series
  getTopRated = asyncHandler(async (req, res) => {
    const { limit = 20, min_votes = 100 } = req.query;
    const series = await seriesService.getTopRatedSeries(
      parseInt(limit),
      parseInt(min_votes)
    );

    res.json({
      success: true,
      data: { series },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/featured - Get featured series
  getFeatured = asyncHandler(async (req, res) => {
    const series = await seriesService.getFeaturedSeries();

    res.json({
      success: true,
      data: { series },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/:slug - Get series by slug
  getSeriesBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const series = await seriesService.getSeriesBySlug(slug);

    res.json({
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/:slug/seasons/:season_number - Get season episodes
  getSeasonEpisodes = asyncHandler(async (req, res) => {
    const { slug, season_number } = req.params;
    const result = await seriesService.getSeasonEpisodes(slug, season_number);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /series/:slug/episodes/:episode_slug - Get episode by slug
  getEpisodeBySlug = asyncHandler(async (req, res) => {
    const { slug, episode_slug } = req.params;
    const episode = await seriesService.getEpisodeBySlug(slug, episode_slug);

    res.json({
      success: true,
      data: episode,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /genres/:slug/series - Get series by genre
  getSeriesByGenre = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const result = await seriesService.getSeriesByGenre(slug, req.query);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new SeriesController();
