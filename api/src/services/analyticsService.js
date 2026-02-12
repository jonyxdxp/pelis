const { prisma } = require('../config/database');
const env = require('../config/env');

class AnalyticsService {
  // Track content view
  async trackView(data) {
    if (!env.ANALYTICS_ENABLED) {
      return { success: true, tracked: false };
    }

    try {
      await prisma.viewAnalytics.create({
        data: {
          contentId: data.contentId,
          contentType: data.contentType,
          deviceType: data.deviceType || 'web',
          deviceName: data.deviceName || null,
          ipAddress: data.ipAddress || null,
        },
      });

      // Increment views count on content
      if (data.contentType === 'movie') {
        await prisma.movie.update({
          where: { id: data.contentId },
          data: { viewsCount: { increment: 1 } },
        });
      } else if (data.contentType === 'series') {
        await prisma.series.update({
          where: { id: data.contentId },
          data: { viewsCount: { increment: 1 } },
        });
      } else if (data.contentType === 'episode') {
        await prisma.episode.update({
          where: { id: data.contentId },
          data: { viewsCount: { increment: 1 } },
        });
      }

      return { success: true, tracked: true };
    } catch (error) {
      console.error('Analytics tracking error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get content statistics
  async getContentStats(contentId, contentType, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const stats = await prisma.viewAnalytics.groupBy({
      by: ['deviceType'],
      where: {
        contentId,
        contentType,
        viewedAt: { gte: since },
      },
      _count: {
        id: true,
      },
    });

    const totalViews = stats.reduce((sum, s) => sum + s._count.id, 0);

    return {
      contentId,
      contentType,
      period: `${days} days`,
      totalViews,
      byDevice: stats.map((s) => ({
        deviceType: s.deviceType,
        count: s._count.id,
        percentage: Math.round((s._count.id / totalViews) * 100),
      })),
    };
  }

  // Get popular content
  async getPopularContent(type = 'all', limit = 20, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const results = {
      movies: [],
      series: [],
    };

    if (type === 'all' || type === 'movie') {
      const movieStats = await prisma.viewAnalytics.groupBy({
        by: ['contentId'],
        where: {
          contentType: 'movie',
          viewedAt: { gte: since },
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: limit,
      });

      const movieIds = movieStats.map((s) => s.contentId);
      const movies = await prisma.movie.findMany({
        where: {
          id: { in: movieIds },
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          rating: true,
        },
      });

      results.movies = movieStats.map((stat) => {
        const movie = movies.find((m) => m.id === stat.contentId);
        return {
          ...movie,
          views: stat._count.id,
        };
      }).filter(Boolean);
    }

    if (type === 'all' || type === 'series') {
      const seriesStats = await prisma.viewAnalytics.groupBy({
        by: ['contentId'],
        where: {
          contentType: 'series',
          viewedAt: { gte: since },
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: limit,
      });

      const seriesIds = seriesStats.map((s) => s.contentId);
      const series = await prisma.series.findMany({
        where: {
          id: { in: seriesIds },
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          rating: true,
        },
      });

      results.series = seriesStats.map((stat) => {
        const s = series.find((ser) => ser.id === stat.contentId);
        return {
          ...s,
          views: stat._count.id,
        };
      }).filter(Boolean);
    }

    return results;
  }

  // Get dashboard stats
  async getDashboardStats() {
    const [
      totalMovies,
      totalSeries,
      totalEpisodes,
      totalViews,
      recentViews,
    ] = await Promise.all([
      prisma.movie.count({ where: { deletedAt: null } }),
      prisma.series.count({ where: { deletedAt: null } }),
      prisma.episode.count(),
      prisma.viewAnalytics.count(),
      prisma.viewAnalytics.count({
        where: {
          viewedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ]);

    return {
      content: {
        movies: totalMovies,
        series: totalSeries,
        episodes: totalEpisodes,
        total: totalMovies + totalSeries,
      },
      views: {
        total: totalViews,
        last24Hours: recentViews,
      },
    };
  }
}

module.exports = new AnalyticsService();
