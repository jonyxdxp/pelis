const { prisma } = require('../config/database');

class RecommendationService {
  // Get recommendations for a movie or series
  async getRecommendations(contentId, contentType, limit = 20) {
    // First, check if we have pre-computed recommendations
    const storedRecommendations = await prisma.recommendation.findMany({
      where: {
        fromContentId: contentId,
        fromContentType: contentType,
      },
      orderBy: { score: 'desc' },
      take: limit,
    });

    if (storedRecommendations.length > 0) {
      // Enrich with content details
      const enriched = await Promise.all(
        storedRecommendations.map(async (rec) => {
          let content;
          if (rec.toContentType === 'movie') {
            content = await prisma.movie.findUnique({
              where: { id: rec.toContentId, deletedAt: null },
              select: {
                id: true,
                title: true,
                slug: true,
                shortDescription: true,
                genres: true,
                rating: true,
                releaseYear: true,
                posterUrl: true,
                posterBlurhash: true,
              },
            });
          } else {
            content = await prisma.series.findUnique({
              where: { id: rec.toContentId, deletedAt: null },
              select: {
                id: true,
                title: true,
                slug: true,
                shortDescription: true,
                genres: true,
                rating: true,
                totalSeasons: true,
                posterUrl: true,
                posterBlurhash: true,
              },
            });
          }

          if (!content) return null;

          return {
            ...content,
            reason: rec.reason,
            score: rec.score,
            contentType: rec.toContentType,
          };
        })
      );

      return enriched.filter(Boolean);
    }

    // Generate recommendations on the fly
    return this.generateRecommendations(contentId, contentType, limit);
  }

  // Generate recommendations based on content similarity
  async generateRecommendations(contentId, contentType, limit = 20) {
    // Get source content
    let sourceContent;
    if (contentType === 'movie') {
      sourceContent = await prisma.movie.findUnique({
        where: { id: contentId },
      });
    } else {
      sourceContent = await prisma.series.findUnique({
        where: { id: contentId },
      });
    }

    if (!sourceContent) {
      return [];
    }

    const recommendations = [];
    const sourceGenres = sourceContent.genres || [];
    const sourceCast = sourceContent.cast || [];

    // Get movies with similar genres
    const similarMovies = await prisma.movie.findMany({
      where: {
        deletedAt: null,
        id: { not: contentId },
        OR: [
          { genres: { hasSome: sourceGenres } },
          { director: sourceContent.director || sourceContent.creator },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        genres: true,
        director: true,
        rating: true,
        releaseYear: true,
        posterUrl: true,
        posterBlurhash: true,
      },
      take: Math.ceil(limit / 2),
    });

    similarMovies.forEach((movie) => {
      const matchingGenres = movie.genres.filter((g) => sourceGenres.includes(g));
      const sameDirector = movie.director === (sourceContent.director || sourceContent.creator);

      let reason = 'same_genre';
      let score = matchingGenres.length / Math.max(sourceGenres.length, 1);

      if (sameDirector) {
        reason = 'same_director';
        score = Math.max(score, 0.8);
      }

      recommendations.push({
        ...movie,
        reason,
        score,
        contentType: 'movie',
      });
    });

    // Get series with similar genres
    const similarSeries = await prisma.series.findMany({
      where: {
        deletedAt: null,
        id: { not: contentId },
        genres: { hasSome: sourceGenres },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        genres: true,
        creator: true,
        rating: true,
        totalSeasons: true,
        posterUrl: true,
        posterBlurhash: true,
      },
      take: Math.floor(limit / 2),
    });

    similarSeries.forEach((series) => {
      const matchingGenres = series.genres.filter((g) => sourceGenres.includes(g));
      const score = matchingGenres.length / Math.max(sourceGenres.length, 1);

      recommendations.push({
        ...series,
        reason: 'same_genre',
        score,
        contentType: 'series',
      });
    });

    // Sort by score and return top results
    recommendations.sort((a, b) => b.score - a.score);

    return recommendations.slice(0, limit);
  }

  // Create recommendation
  async createRecommendation(data) {
    return prisma.recommendation.create({
      data: {
        fromContentId: data.fromContentId,
        fromContentType: data.fromContentType,
        toContentId: data.toContentId,
        toContentType: data.toContentType,
        reason: data.reason,
        score: data.score || 0.5,
      },
    });
  }

  // Get trending content (across movies and series)
  async getTrending(limit = 20) {
    const [trendingMovies, trendingSeries] = await Promise.all([
      prisma.movie.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          genres: true,
          rating: true,
          releaseYear: true,
          posterUrl: true,
          posterBlurhash: true,
          viewsCount: true,
        },
        orderBy: { viewsCount: 'desc' },
        take: Math.ceil(limit / 2),
      }),
      prisma.series.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          genres: true,
          rating: true,
          totalSeasons: true,
          posterUrl: true,
          posterBlurhash: true,
          viewsCount: true,
        },
        orderBy: { viewsCount: 'desc' },
        take: Math.floor(limit / 2),
      }),
    ]);

    const combined = [
      ...trendingMovies.map((m) => ({ ...m, contentType: 'movie' })),
      ...trendingSeries.map((s) => ({ ...s, contentType: 'series' })),
    ];

    // Sort by views
    combined.sort((a, b) => b.viewsCount - a.viewsCount);

    return combined.slice(0, limit);
  }
}

module.exports = new RecommendationService();
