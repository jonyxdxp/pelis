const { prisma } = require('../config/database');
const movieService = require('./movieService');
const seriesService = require('./seriesService');

class SearchService {
  // Global search across movies and series
  async search(query, options = {}) {
    const type = options.type || 'all';
    const limit = options.limit || 20;

    const results = {
      movies: [],
      series: [],
      total: 0,
    };

    if (type === 'all' || type === 'movie') {
      results.movies = await movieService.searchMovies(query, limit);
    }

    if (type === 'all' || type === 'series') {
      results.series = await seriesService.searchSeries(query, limit);
    }

    results.total = results.movies.length + results.series.length;

    return results;
  }

  // Search suggestions for autocomplete
  async getSuggestions(query, limit = 10) {
    const suggestions = [];

    // Search movies
    const movies = await prisma.movie.findMany({
      where: {
        deletedAt: null,
        title: { contains: query, mode: 'insensitive' },
      },
      select: {
        title: true,
        slug: true,
        posterUrl: true,
        releaseYear: true,
      },
      orderBy: { rating: 'desc' },
      take: Math.ceil(limit / 2),
    });

    movies.forEach((movie) => {
      suggestions.push({
        text: movie.title,
        type: 'movie',
        slug: movie.slug,
        posterUrl: movie.posterUrl,
        year: movie.releaseYear,
      });
    });

    // Search series
    const series = await prisma.series.findMany({
      where: {
        deletedAt: null,
        title: { contains: query, mode: 'insensitive' },
      },
      select: {
        title: true,
        slug: true,
        posterUrl: true,
        firstAirDate: true,
      },
      orderBy: { rating: 'desc' },
      take: Math.floor(limit / 2),
    });

    series.forEach((s) => {
      suggestions.push({
        text: s.title,
        type: 'series',
        slug: s.slug,
        posterUrl: s.posterUrl,
        year: s.firstAirDate ? new Date(s.firstAirDate).getFullYear() : null,
      });
    });

    // Sort by relevance (exact matches first)
    suggestions.sort((a, b) => {
      const aExact = a.text.toLowerCase() === query.toLowerCase();
      const bExact = b.text.toLowerCase() === query.toLowerCase();
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });

    return suggestions.slice(0, limit);
  }

  // Search by genre
  async searchByGenre(genreSlug, options = {}) {
    const type = options.type || 'all';
    const result = {
      genre: null,
      movies: [],
      series: [],
    };

    const genre = await prisma.genre.findUnique({
      where: { slug: genreSlug },
    });

    if (!genre) {
      return result;
    }

    result.genre = genre;

    if (type === 'all' || type === 'movie') {
      const moviesResult = await movieService.getMoviesByGenre(genreSlug, options);
      result.movies = moviesResult.movies;
    }

    if (type === 'all' || type === 'series') {
      const seriesResult = await seriesService.getSeriesByGenre(genreSlug, options);
      result.series = seriesResult.series;
    }

    return result;
  }

  // Advanced search with filters
  async advancedSearch(filters = {}) {
    const {
      query,
      genres,
      yearFrom,
      yearTo,
      ratingMin,
      type = 'all',
      sortBy = 'relevance',
      page = 1,
      limit = 20,
    } = filters;

    const results = {
      movies: [],
      series: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
    };

    // Build filters for movies
    const movieFilters = {
      page,
      limit: type === 'all' ? Math.ceil(limit / 2) : limit,
      sort: sortBy === 'relevance' ? 'rating' : sortBy,
    };

    if (query) movieFilters.search = query;
    if (genres) movieFilters.genres = genres;
    if (yearFrom) movieFilters.year_from = yearFrom;
    if (yearTo) movieFilters.year_to = yearTo;
    if (ratingMin) movieFilters.rating_min = ratingMin;

    // Build filters for series
    const seriesFilters = {
      page,
      limit: type === 'all' ? Math.floor(limit / 2) : limit,
      sort: sortBy === 'relevance' ? 'rating' : sortBy,
    };

    if (query) seriesFilters.search = query;
    if (genres) seriesFilters.genres = genres;
    if (yearFrom) seriesFilters.year_from = yearFrom;
    if (yearTo) seriesFilters.year_to = yearTo;
    if (ratingMin) seriesFilters.rating_min = ratingMin;

    if (type === 'all' || type === 'movie') {
      const moviesResult = await movieService.getMovies(movieFilters);
      results.movies = moviesResult.movies;
    }

    if (type === 'all' || type === 'series') {
      const seriesResult = await seriesService.getAllSeries(seriesFilters);
      results.series = seriesResult.series;
    }

    results.pagination.total = results.movies.length + results.series.length;
    results.pagination.pages = Math.ceil(results.pagination.total / limit);

    return results;
  }
}

module.exports = new SearchService();
