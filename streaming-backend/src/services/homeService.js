const { prisma } = require('../config/database');
const movieService = require('./movieService');
const seriesService = require('./seriesService');

class HomeService {
  // Get homepage data
  async getHomepageData(deviceType = 'web') {
    const [heroContent, carousels] = await Promise.all([
      this.getHeroContent(),
      this.getCarousels(deviceType),
    ]);

    return {
      hero: {
        title: 'Featured Content',
        items: heroContent,
      },
      carousels,
    };
  }

  // Get hero banner content
  async getHeroContent() {
    // Get featured content from database
    const featuredContent = await prisma.featuredContent.findMany({
      where: {
        carouselId: null, // Hero items don't belong to a carousel
      },
      orderBy: { position: 'asc' },
      take: 5,
    });

    if (featuredContent.length > 0) {
      // Enrich with content details
      const enriched = await Promise.all(
        featuredContent.map(async (item) => {
          let content;
          if (item.contentType === 'movie') {
            content = await prisma.movie.findUnique({
              where: { id: item.contentId },
              select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                shortDescription: true,
                genres: true,
                rating: true,
                releaseYear: true,
                duration: true,
                posterUrl: true,
                backdropUrl: true,
              },
            });
          } else {
            content = await prisma.series.findUnique({
              where: { id: item.contentId },
              select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                shortDescription: true,
                genres: true,
                rating: true,
                firstAirDate: true,
                totalSeasons: true,
                posterUrl: true,
                backdropUrl: true,
              },
            });
          }

          if (!content) return null;

          return {
            id: item.id,
            contentId: item.contentId,
            contentType: item.contentType,
            title: item.title || content.title,
            description: item.description || content.shortDescription || content.description,
            imageUrl: item.imageUrl || content.backdropUrl,
            imageBlurhash: item.imageBlurhash,
            ctaText: item.ctaText || 'Reproducir',
            position: item.position,
            genres: content.genres,
            rating: content.rating,
            year: content.releaseYear || (content.firstAirDate ? new Date(content.firstAirDate).getFullYear() : null),
            duration: content.duration,
            totalSeasons: content.totalSeasons,
          };
        })
      );

      return enriched.filter(Boolean);
    }

    // Fallback: get featured movies and series
    const [featuredMovies, featuredSeries] = await Promise.all([
      prisma.movie.findMany({
        where: { featured: true, deletedAt: null },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          shortDescription: true,
          genres: true,
          rating: true,
          releaseYear: true,
          duration: true,
          backdropUrl: true,
          backdropBlurhash: true,
        },
        orderBy: { featuredOrder: 'asc' },
        take: 3,
      }),
      prisma.series.findMany({
        where: { featured: true, deletedAt: null },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          shortDescription: true,
          genres: true,
          rating: true,
          firstAirDate: true,
          totalSeasons: true,
          backdropUrl: true,
          backdropBlurhash: true,
        },
        orderBy: { featuredOrder: 'asc' },
        take: 2,
      }),
    ]);

    const heroItems = [
      ...featuredMovies.map((m, i) => ({
        id: `movie-${m.id}`,
        contentId: m.id,
        contentType: 'movie',
        title: m.title,
        description: m.shortDescription || m.description,
        imageUrl: m.backdropUrl,
        imageBlurhash: m.backdropBlurhash,
        ctaText: 'Reproducir',
        position: i,
        genres: m.genres,
        rating: m.rating,
        year: m.releaseYear,
        duration: m.duration,
      })),
      ...featuredSeries.map((s, i) => ({
        id: `series-${s.id}`,
        contentId: s.id,
        contentType: 'series',
        title: s.title,
        description: s.shortDescription || s.description,
        imageUrl: s.backdropUrl,
        imageBlurhash: s.backdropBlurhash,
        ctaText: 'Ver serie',
        position: featuredMovies.length + i,
        genres: s.genres,
        rating: s.rating,
        year: s.firstAirDate ? new Date(s.firstAirDate).getFullYear() : null,
        totalSeasons: s.totalSeasons,
      })),
    ];

    return heroItems.sort((a, b) => a.position - b.position);
  }

  // Get carousels for homepage
  async getCarousels(deviceType = 'web') {
    // Get configured carousels
    const carousels = await prisma.featuredCarousel.findMany({
      where: {
        ...(deviceType === 'mobile' ? { visibleMobile: true } : {}),
        ...(deviceType === 'tv' ? { visibleTv: true } : {}),
      },
      orderBy: { position: 'asc' },
    });

    if (carousels.length > 0) {
      // Build carousels from configuration
      const carouselData = await Promise.all(
        carousels.map(async (carousel) => {
          let items = [];

          if (carousel.type === 'genre' && carousel.genreId) {
            const genre = await prisma.genre.findUnique({
              where: { id: carousel.genreId },
            });
            if (genre) {
              const movies = await movieService.getMoviesByGenre(genre.slug, {
                limit: carousel.limit,
              });
              items = movies.movies;
            }
          } else if (carousel.type === 'trending') {
            items = await movieService.getTrendingMovies(carousel.limit);
          } else if (carousel.type === 'new') {
            items = await movieService.getNewReleases(carousel.limit);
          } else if (carousel.type === 'top_rated') {
            items = await movieService.getTopRatedMovies(carousel.limit);
          } else {
            // Custom carousel - get from featured_content
            const content = await prisma.featuredContent.findMany({
              where: { carouselId: carousel.id },
              orderBy: { position: 'asc' },
              take: carousel.limit,
            });

            items = await Promise.all(
              content.map(async (item) => {
                if (item.contentType === 'movie') {
                  return prisma.movie.findUnique({
                    where: { id: item.contentId },
                    select: {
                      id: true,
                      title: true,
                      slug: true,
                      shortDescription: true,
                      genres: true,
                      rating: true,
                      releaseYear: true,
                      duration: true,
                      posterUrl: true,
                      posterBlurhash: true,
                    },
                  });
                } else {
                  return prisma.series.findUnique({
                    where: { id: item.contentId },
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
              })
            );
          }

          return {
            id: carousel.id,
            title: carousel.title,
            slug: carousel.slug,
            type: carousel.type,
            items: items.filter(Boolean),
          };
        })
      );

      return carouselData.filter((c) => c.items.length > 0);
    }

    // Fallback: create default carousels
    return this.getDefaultCarousels();
  }

  // Get default carousels
  async getDefaultCarousels() {
    const [
      trendingMovies,
      newReleases,
      topRated,
      trendingSeries,
      featuredSeries,
    ] = await Promise.all([
      movieService.getTrendingMovies(20),
      movieService.getNewReleases(20),
      movieService.getTopRatedMovies(20),
      seriesService.getTrendingSeries(20),
      seriesService.getFeaturedSeries(),
    ]);

    return [
      {
        title: 'Lo más popular',
        slug: 'trending',
        items: trendingMovies,
      },
      {
        title: 'Estrenos',
        slug: 'new-releases',
        items: newReleases,
      },
      {
        title: 'Mejor valorados',
        slug: 'top-rated',
        items: topRated,
      },
      {
        title: 'Series populares',
        slug: 'trending-series',
        items: trendingSeries,
      },
      {
        title: 'Series destacadas',
        slug: 'featured-series',
        items: featuredSeries,
      },
    ];
  }

  // Get genres with counts
  async getGenresWithCounts() {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    });

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

    return genresWithCounts;
  }
}

module.exports = new HomeService();
