const { prisma } = require('../config/database');
const { ApiError } = require('../middleware/errorHandler');

// Build where clause for movie queries
const buildWhereClause = (filters) => {
  const where = {
    deletedAt: null,
  };

  if (filters.genres) {
    const genres = filters.genres.split(',');
    where.genres = { hasSome: genres };
  }

  if (filters.rating_min) {
    where.rating = { gte: parseFloat(filters.rating_min) };
  }

  if (filters.year_from || filters.year_to) {
    where.releaseYear = {};
    if (filters.year_from) where.releaseYear.gte = parseInt(filters.year_from);
    if (filters.year_to) where.releaseYear.lte = parseInt(filters.year_to);
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { plotKeywords: { hasSome: [filters.search] } },
    ];
  }

  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }

  return where;
};

// Build order by clause
const buildOrderBy = (sort, order) => {
  const orderDirection = order === 'asc' ? 'asc' : 'desc';
  
  const sortMap = {
    rating: { rating: orderDirection },
    release_date: { releaseYear: orderDirection },
    views: { viewsCount: orderDirection },
    added: { createdAt: orderDirection },
    title: { title: orderDirection },
  };

  return sortMap[sort] || { createdAt: orderDirection };
};

// Select fields for list view
const listSelect = {
  id: true,
  title: true,
  slug: true,
  shortDescription: true,
  genres: true,
  releaseYear: true,
  rating: true,
  duration: true,
  posterUrl: true,
  posterBlurhash: true,
  featured: true,
  ageRating: true,
};

// Select fields for detail view
const detailSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  shortDescription: true,
  genres: true,
  releaseYear: true,
  director: true,
  writers: true,
  cast: true,
  country: true,
  language: true,
  duration: true,
  rating: true,
  ratingCount: true,
  posterUrl: true,
  posterBlurhash: true,
  backdropUrl: true,
  backdropBlurhash: true,
  videoUrl: true,
  videoType: true,
  plotKeywords: true,
  ageRating: true,
  productionCompany: true,
  budget: true,
  revenue: true,
  imdbId: true,
  tmdbId: true,
  viewsCount: true,
  createdAt: true,
  updatedAt: true,
};

class MovieService {
  // Get all movies with pagination and filters
  async getMovies(filters = {}) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where = buildWhereClause(filters);
    const orderBy = buildOrderBy(filters.sort, filters.order);

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        select: listSelect,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.movie.count({ where }),
    ]);

    return {
      movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get movie by slug
  async getMovieBySlug(slug) {
    const movie = await prisma.movie.findUnique({
      where: { slug, deletedAt: null },
      select: detailSelect,
    });

    if (!movie) {
      throw new ApiError('Movie not found', 404, 'MOVIE_NOT_FOUND');
    }

    return movie;
  }

  // Get movie by ID
  async getMovieById(id) {
    const movie = await prisma.movie.findUnique({
      where: { id, deletedAt: null },
      select: detailSelect,
    });

    if (!movie) {
      throw new ApiError('Movie not found', 404, 'MOVIE_NOT_FOUND');
    }

    return movie;
  }

  // Get trending movies
  async getTrendingMovies(limit = 20, days = 30) {
    // For now, use viewsCount as trending metric
    // In production, you'd use ViewAnalytics with date filtering
    const movies = await prisma.movie.findMany({
      where: { deletedAt: null },
      select: listSelect,
      orderBy: { viewsCount: 'desc' },
      take: limit,
    });

    return movies;
  }

  // Get new releases
  async getNewReleases(limit = 20) {
    const currentYear = new Date().getFullYear();
    
    const movies = await prisma.movie.findMany({
      where: { 
        deletedAt: null,
        releaseYear: { gte: currentYear - 1 },
      },
      select: listSelect,
      orderBy: { releaseYear: 'desc' },
      take: limit,
    });

    return movies;
  }

  // Get top rated movies
  async getTopRatedMovies(limit = 20, minVotes = 100) {
    const movies = await prisma.movie.findMany({
      where: { 
        deletedAt: null,
        ratingCount: { gte: minVotes },
      },
      select: listSelect,
      orderBy: { rating: 'desc' },
      take: limit,
    });

    return movies;
  }

  // Get featured movies
  async getFeaturedMovies() {
    const movies = await prisma.movie.findMany({
      where: { 
        deletedAt: null,
        featured: true,
      },
      select: listSelect,
      orderBy: { featuredOrder: 'asc' },
    });

    return movies;
  }

  // Get movies by genre
  async getMoviesByGenre(genreSlug, options = {}) {
    const genre = await prisma.genre.findUnique({
      where: { slug: genreSlug },
    });

    if (!genre) {
      throw new ApiError('Genre not found', 404, 'GENRE_NOT_FOUND');
    }

    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where: { 
          deletedAt: null,
          genres: { has: genre.name },
        },
        select: listSelect,
        orderBy: { rating: 'desc' },
        skip,
        take: limit,
      }),
      prisma.movie.count({
        where: { 
          deletedAt: null,
          genres: { has: genre.name },
        },
      }),
    ]);

    return {
      genre,
      movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Increment views count
  async incrementViews(id) {
    await prisma.movie.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });
  }

  // Search movies
  async searchMovies(query, limit = 20) {
    const movies = await prisma.movie.findMany({
      where: {
        deletedAt: null,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { director: { contains: query, mode: 'insensitive' } },
          { plotKeywords: { hasSome: [query] } },
        ],
      },
      select: listSelect,
      orderBy: { rating: 'desc' },
      take: limit,
    });

    return movies;
  }
}

module.exports = new MovieService();
