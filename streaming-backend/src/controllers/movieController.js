const movieService = require('../services/movieService');
const { asyncHandler } = require('../middleware/errorHandler');

class MovieController {
  // GET /movies - List all movies
  getMovies = asyncHandler(async (req, res) => {
    const result = await movieService.getMovies(req.query);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /movies/trending - Get trending movies
  getTrending = asyncHandler(async (req, res) => {
    const { limit = 20, days = 30 } = req.query;
    const movies = await movieService.getTrendingMovies(
      parseInt(limit),
      parseInt(days)
    );

    res.json({
      success: true,
      data: { movies },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /movies/new - Get new releases
  getNewReleases = asyncHandler(async (req, res) => {
    const { limit = 20 } = req.query;
    const movies = await movieService.getNewReleases(parseInt(limit));

    res.json({
      success: true,
      data: { movies },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /movies/rated - Get top rated movies
  getTopRated = asyncHandler(async (req, res) => {
    const { limit = 20, min_votes = 100 } = req.query;
    const movies = await movieService.getTopRatedMovies(
      parseInt(limit),
      parseInt(min_votes)
    );

    res.json({
      success: true,
      data: { movies },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /movies/featured - Get featured movies
  getFeatured = asyncHandler(async (req, res) => {
    const movies = await movieService.getFeaturedMovies();

    res.json({
      success: true,
      data: { movies },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /movies/:slug - Get movie by slug
  getMovieBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const movie = await movieService.getMovieBySlug(slug);

    res.json({
      success: true,
      data: movie,
      timestamp: new Date().toISOString(),
    });
  });

  // GET /genres/:slug/movies - Get movies by genre
  getMoviesByGenre = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const result = await movieService.getMoviesByGenre(slug, req.query);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new MovieController();
