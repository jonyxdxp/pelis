import { genres, movies, seriesData, episodes, type Movie, type Series, type Episode, type Genre } from '@/data/database';

// Helper functions
const getGenreNames = (genreIds: number[]): string[] => {
  return genreIds.map(id => genres.find(g => g.id === id)?.name).filter((name): name is string => !!name);
};

const enrichContent = <T extends { genre_ids: number[] }>(item: T): T & { genres: string[] } => ({
  ...item,
  genres: getGenreNames(item.genre_ids)
});

// API Service
export const api = {
  // Genres
  getGenres: (): Genre[] => genres,

  // Movies
  getMovies: (): (Movie & { genres: string[] })[] => movies.map(enrichContent),
  
  getMovieById: (id: number): (Movie & { genres: string[] }) | undefined => {
    const movie = movies.find(m => m.id === id);
    return movie ? enrichContent(movie) : undefined;
  },

  getMoviesByGenre: (genreName: string): (Movie & { genres: string[] })[] => {
    const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
    if (!genre) return [];
    return movies.filter(m => m.genre_ids.includes(genre.id)).map(enrichContent);
  },

  getTrendingMovies: (): (Movie & { genres: string[] })[] => {
    return movies
      .filter(m => m.rating >= 8.0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map(enrichContent);
  },

  getNewReleases: (): (Movie & { genres: string[] })[] => {
    return movies
      .sort((a, b) => b.release_year - a.release_year)
      .slice(0, 10)
      .map(enrichContent);
  },

  getFeaturedMovies: (): (Movie & { genres: string[] })[] => {
    return movies.filter(m => m.featured).map(enrichContent);
  },

  searchMovies: (query: string): (Movie & { genres: string[] })[] => {
    if (!query) return [];
    const filtered = movies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.map(enrichContent);
  },

  // Series
  getSeries: (): (Series & { genres: string[] })[] => seriesData.map(enrichContent),
  
  getSeriesById: (id: number): (Series & { genres: string[] }) | undefined => {
    const s = seriesData.find(s => s.id === id);
    return s ? enrichContent(s) : undefined;
  },

  getSeriesByGenre: (genreName: string): (Series & { genres: string[] })[] => {
    const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
    if (!genre) return [];
    return seriesData.filter(s => s.genre_ids.includes(genre.id)).map(enrichContent);
  },

  getTrendingSeries: (): (Series & { genres: string[] })[] => {
    return seriesData
      .filter(s => s.rating >= 8.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
      .map(enrichContent);
  },

  getFeaturedSeries: (): (Series & { genres: string[] })[] => {
    return seriesData.filter(s => s.featured).map(enrichContent);
  },

  searchSeries: (query: string): (Series & { genres: string[] })[] => {
    if (!query) return [];
    const filtered = seriesData.filter(s => 
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.map(enrichContent);
  },

  // Episodes
  getEpisodes: (seriesId: number, seasonNumber: number): Episode[] => {
    return episodes.filter(e => e.series_id === seriesId && e.season_number === seasonNumber);
  },

  getAllSeasons: (seriesId: number): number[] => {
    const seriesEpisodes = episodes.filter(e => e.series_id === seriesId);
    const seasons = [...new Set(seriesEpisodes.map(e => e.season_number))];
    return seasons.sort((a, b) => a - b);
  },

  // Featured Content (movies + series)
  getFeaturedContent: (): ((Movie | Series) & { genres: string[] })[] => {
    const featuredMovies = movies.filter(m => m.featured).map(enrichContent);
    const featuredSeries = seriesData.filter(s => s.featured).map(enrichContent);
    return [...featuredMovies, ...featuredSeries];
  },

  // Advanced Search
  search: (params: {
    query?: string;
    genre?: string;
    year?: number;
    type?: 'movie' | 'series';
    minRating?: number;
    sortBy?: 'rating' | 'newest' | 'oldest';
  }): ((Movie | Series) & { genres: string[] })[] => {
    const { query, genre, year, type, minRating, sortBy } = params;
    
    let results: ((Movie | Series) & { genres: string[] })[] = [];
    
    if (type === 'movie' || !type) {
      results = [...results, ...movies.map(m => enrichContent(m))];
    }
    if (type === 'series' || !type) {
      results = [...results, ...seriesData.map(s => enrichContent(s))];
    }
    
    // Apply filters
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (genre) {
      const genreObj = genres.find(g => g.name.toLowerCase() === genre.toLowerCase());
      if (genreObj) {
        results = results.filter(item => item.genre_ids.includes(genreObj.id));
      }
    }
    
    if (year) {
      results = results.filter(item => item.release_year === year);
    }
    
    if (minRating) {
      results = results.filter(item => item.rating >= minRating);
    }
    
    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => b.release_year - a.release_year);
          break;
        case 'oldest':
          results.sort((a, b) => a.release_year - b.release_year);
          break;
      }
    }
    
    return results;
  },

  // Get similar content
  getSimilarContent: (type: 'movie' | 'series', id: number, limit: number = 6): ((Movie | Series) & { genres: string[] })[] => {
    let currentItem: (Movie | Series) | undefined;
    let pool: (Movie | Series)[] = [];
    
    if (type === 'movie') {
      currentItem = movies.find(m => m.id === id);
      pool = movies.filter(m => m.id !== id);
    } else {
      currentItem = seriesData.find(s => s.id === id);
      pool = seriesData.filter(s => s.id !== id);
    }
    
    if (!currentItem) return [];
    
    // Find items with similar genres
    const similar = pool
      .filter(item => item.genre_ids.some(gid => currentItem!.genre_ids.includes(gid)))
      .slice(0, limit);
    
    return similar.map(enrichContent);
  },

  // Get content by ID (generic)
  getContentById: (type: 'movie' | 'series', id: number): ((Movie | Series) & { genres: string[] }) | undefined => {
    if (type === 'movie') {
      const movie = movies.find(m => m.id === id);
      return movie ? enrichContent(movie) : undefined;
    } else {
      const s = seriesData.find(s => s.id === id);
      return s ? enrichContent(s) : undefined;
    }
  }
};

export default api;
