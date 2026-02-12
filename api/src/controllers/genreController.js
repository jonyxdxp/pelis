const { prisma } = require('../config/database');
const searchService = require('../services/searchService');
const { asyncHandler } = require('../middleware/errorHandler');
const { ApiError } = require('../middleware/errorHandler');

class GenreController {
  // GET /genres - List all genres
  getAllGenres = asyncHandler(async (req, res) => {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    });

    // Get counts for each genre
    const genresWithCounts = await Promise.all(
      genres.map(async (genre) => {
        const [movieCount, seriesCount] = await Promise.all([
          prisma.movie.count({
            where: {
              deletedAt: null,
              genres: { has: genre.name },
            },
          }),
          prisma.series.count({
            where: {
              deletedAt: null,
              genres: { has: genre.name },
            },
          }),
        ]);

        return {
          ...genre,
          movieCount,
          seriesCount,
        };
      })
    );

    res.json({
      success: true,
      data: { genres: genresWithCounts },
      timestamp: new Date().toISOString(),
    });
  });

  // GET /genres/:slug - Get genre with content
  getGenreBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { type = 'all', page = 1, limit = 20 } = req.query;

    const genre = await prisma.genre.findUnique({
      where: { slug },
    });

    if (!genre) {
      throw new ApiError('Genre not found', 404, 'GENRE_NOT_FOUND');
    }

    const result = await searchService.searchByGenre(slug, {
      type,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: {
        genre,
        content: {
          movies: result.movies,
          series: result.series,
        },
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result.movies.length + result.series.length,
        },
      },
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new GenreController();
