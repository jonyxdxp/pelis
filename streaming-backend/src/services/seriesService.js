const { prisma } = require('../config/database');
const { ApiError } = require('../middleware/errorHandler');

// Build where clause for series queries
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
    where.firstAirDate = {};
    if (filters.year_from) {
      where.firstAirDate.gte = new Date(`${filters.year_from}-01-01`);
    }
    if (filters.year_to) {
      where.firstAirDate.lte = new Date(`${filters.year_to}-12-31`);
    }
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { plotKeywords: { hasSome: [filters.search] } },
    ];
  }

  return where;
};

// Build order by clause
const buildOrderBy = (sort, order) => {
  const orderDirection = order === 'asc' ? 'asc' : 'desc';
  
  const sortMap = {
    rating: { rating: orderDirection },
    first_air_date: { firstAirDate: orderDirection },
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
  creator: true,
  rating: true,
  totalSeasons: true,
  totalEpisodes: true,
  posterUrl: true,
  posterBlurhash: true,
  firstAirDate: true,
  status: true,
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
  creator: true,
  cast: true,
  country: true,
  language: true,
  rating: true,
  ratingCount: true,
  posterUrl: true,
  posterBlurhash: true,
  backdropUrl: true,
  backdropBlurhash: true,
  totalSeasons: true,
  totalEpisodes: true,
  plotKeywords: true,
  ageRating: true,
  productionCompany: true,
  firstAirDate: true,
  lastAirDate: true,
  status: true,
  viewsCount: true,
  createdAt: true,
  updatedAt: true,
};

class SeriesService {
  // Get all series with pagination and filters
  async getAllSeries(filters = {}) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where = buildWhereClause(filters);
    const orderBy = buildOrderBy(filters.sort, filters.order);

    const [series, total] = await Promise.all([
      prisma.series.findMany({
        where,
        select: listSelect,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.series.count({ where }),
    ]);

    return {
      series,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get series by slug
  async getSeriesBySlug(slug) {
    const series = await prisma.series.findUnique({
      where: { slug, deletedAt: null },
      select: {
        ...detailSelect,
        seasons: {
          orderBy: { seasonNumber: 'asc' },
          select: {
            id: true,
            seasonNumber: true,
            title: true,
            episodeCount: true,
            airDate: true,
            posterUrl: true,
          },
        },
      },
    });

    if (!series) {
      throw new ApiError('Series not found', 404, 'SERIES_NOT_FOUND');
    }

    return series;
  }

  // Get series by ID
  async getSeriesById(id) {
    const series = await prisma.series.findUnique({
      where: { id, deletedAt: null },
      select: detailSelect,
    });

    if (!series) {
      throw new ApiError('Series not found', 404, 'SERIES_NOT_FOUND');
    }

    return series;
  }

  // Get season episodes
  async getSeasonEpisodes(seriesSlug, seasonNumber) {
    const series = await prisma.series.findUnique({
      where: { slug: seriesSlug, deletedAt: null },
      include: {
        seasons: {
          where: { seasonNumber: parseInt(seasonNumber) },
          include: {
            episodes: {
              orderBy: { episodeNumber: 'asc' },
              select: {
                id: true,
                episodeNumber: true,
                title: true,
                slug: true,
                description: true,
                thumbnailUrl: true,
                thumbnailBlurhash: true,
                duration: true,
                airDate: true,
                rating: true,
                videoUrl: true,
                videoType: true,
              },
            },
          },
        },
      },
    });

    if (!series) {
      throw new ApiError('Series not found', 404, 'SERIES_NOT_FOUND');
    }

    if (series.seasons.length === 0) {
      throw new ApiError('Season not found', 404, 'SEASON_NOT_FOUND');
    }

    const season = series.seasons[0];

    return {
      series: {
        id: series.id,
        title: series.title,
        slug: series.slug,
        posterUrl: series.posterUrl,
        backdropUrl: series.backdropUrl,
      },
      season: {
        id: season.id,
        seasonNumber: season.seasonNumber,
        title: season.title,
        episodeCount: season.episodeCount,
        airDate: season.airDate,
      },
      episodes: season.episodes,
    };
  }

  // Get episode by slug
  async getEpisodeBySlug(seriesSlug, episodeSlug) {
    const series = await prisma.series.findUnique({
      where: { slug: seriesSlug, deletedAt: null },
    });

    if (!series) {
      throw new ApiError('Series not found', 404, 'SERIES_NOT_FOUND');
    }

    const episode = await prisma.episode.findUnique({
      where: { slug: episodeSlug },
      include: {
        series: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!episode || episode.seriesId !== series.id) {
      throw new ApiError('Episode not found', 404, 'EPISODE_NOT_FOUND');
    }

    return episode;
  }

  // Get trending series
  async getTrendingSeries(limit = 20) {
    const series = await prisma.series.findMany({
      where: { deletedAt: null },
      select: listSelect,
      orderBy: { viewsCount: 'desc' },
      take: limit,
    });

    return series;
  }

  // Get new series
  async getNewSeries(limit = 20) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const series = await prisma.series.findMany({
      where: { 
        deletedAt: null,
        firstAirDate: { gte: oneYearAgo },
      },
      select: listSelect,
      orderBy: { firstAirDate: 'desc' },
      take: limit,
    });

    return series;
  }

  // Get top rated series
  async getTopRatedSeries(limit = 20, minVotes = 100) {
    const series = await prisma.series.findMany({
      where: { 
        deletedAt: null,
        ratingCount: { gte: minVotes },
      },
      select: listSelect,
      orderBy: { rating: 'desc' },
      take: limit,
    });

    return series;
  }

  // Get featured series
  async getFeaturedSeries() {
    const series = await prisma.series.findMany({
      where: { 
        deletedAt: null,
        featured: true,
      },
      select: listSelect,
      orderBy: { featuredOrder: 'asc' },
    });

    return series;
  }

  // Get series by genre
  async getSeriesByGenre(genreSlug, options = {}) {
    const genre = await prisma.genre.findUnique({
      where: { slug: genreSlug },
    });

    if (!genre) {
      throw new ApiError('Genre not found', 404, 'GENRE_NOT_FOUND');
    }

    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const [series, total] = await Promise.all([
      prisma.series.findMany({
        where: { 
          deletedAt: null,
          genres: { has: genre.name },
        },
        select: listSelect,
        orderBy: { rating: 'desc' },
        skip,
        take: limit,
      }),
      prisma.series.count({
        where: { 
          deletedAt: null,
          genres: { has: genre.name },
        },
      }),
    ]);

    return {
      genre,
      series,
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
    await prisma.series.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });
  }

  // Search series
  async searchSeries(query, limit = 20) {
    const series = await prisma.series.findMany({
      where: {
        deletedAt: null,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { creator: { contains: query, mode: 'insensitive' } },
          { plotKeywords: { hasSome: [query] } },
        ],
      },
      select: listSelect,
      orderBy: { rating: 'desc' },
      take: limit,
    });

    return series;
  }
}

module.exports = new SeriesService();
