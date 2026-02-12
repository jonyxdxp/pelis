// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_VERSION = 'v1';
const API_URL = `${API_BASE}/${API_VERSION}`;

// Helper: Fetch wrapper con manejo de errores
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error on ${endpoint}:`, error);
    throw error;
  }
}

// Types
export interface Genre {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseYear: number;
  duration: number;
  genres: string[];
  tmdbId?: number;
  featured?: boolean;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  totalSeasons: number;
  totalEpisodes: number;
  genres: string[];
  tmdbId?: number;
  featured?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  duration: number;
  description?: string;
}

export interface VidlinkResponse {
  success: boolean;
  embedUrl: string;
  movieTitle?: string;
  seriesTitle?: string;
  error?: string;
}

// API Service
export const api = {
  // ==================== GENRES ====================
  getGenres: async (): Promise<Genre[]> => {
    return fetchAPI<Genre[]>('/genres');
  },

  // ==================== MOVIES ====================
  getMovies: async (limit?: number, offset?: number): Promise<Movie[]> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI<Movie[]>(`/movies${query}`);
  },

  getMovieById: async (id: string): Promise<Movie> => {
    return fetchAPI<Movie>(`/movies/${id}`);
  },

  getMoviesByGenre: async (genreName: string): Promise<Movie[]> => {
    return fetchAPI<Movie[]>(`/movies?genre=${encodeURIComponent(genreName)}`);
  },

  getTrendingMovies: async (limit: number = 10): Promise<Movie[]> => {
    return fetchAPI<Movie[]>(`/movies?trending=true&limit=${limit}`);
  },

  getNewReleases: async (limit: number = 10): Promise<Movie[]> => {
    return fetchAPI<Movie[]>(`/movies?new=true&limit=${limit}`);
  },

  getFeaturedMovies: async (): Promise<Movie[]> => {
    return fetchAPI<Movie[]>('/movies?featured=true');
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];
    return fetchAPI<Movie[]>(`/search?query=${encodeURIComponent(query)}&type=movie`);
  },

  // ==================== SERIES ====================
  getSeries: async (limit?: number, offset?: number): Promise<Series[]> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI<Series[]>(`/series${query}`);
  },

  getSeriesById: async (id: string): Promise<Series> => {
    return fetchAPI<Series>(`/series/${id}`);
  },

  getSeriesByGenre: async (genreName: string): Promise<Series[]> => {
    return fetchAPI<Series[]>(`/series?genre=${encodeURIComponent(genreName)}`);
  },

  getTrendingSeries: async (limit: number = 10): Promise<Series[]> => {
    return fetchAPI<Series[]>(`/series?trending=true&limit=${limit}`);
  },

  getFeaturedSeries: async (): Promise<Series[]> => {
    return fetchAPI<Series[]>('/series?featured=true');
  },

  searchSeries: async (query: string): Promise<Series[]> => {
    if (!query.trim()) return [];
    return fetchAPI<Series[]>(`/search?query=${encodeURIComponent(query)}&type=series`);
  },

  // ==================== EPISODES ====================
  getEpisodes: async (seriesId: string, seasonNumber: number): Promise<Episode[]> => {
    return fetchAPI<Episode[]>(`/series/${seriesId}/episodes?season=${seasonNumber}`);
  },

  getAllSeasons: async (seriesId: string): Promise<number[]> => {
    return fetchAPI<number[]>(`/series/${seriesId}/seasons`);
  },

  // ==================== VIDLINK PLAYERS ====================
  getMoviePlayer: async (movieId: string): Promise<VidlinkResponse> => {
    return fetchAPI<VidlinkResponse>(`/vidlink/movie/${movieId}`);
  },

  getTvPlayer: async (
    seriesId: string,
    season: number,
    episode: number
  ): Promise<VidlinkResponse> => {
    return fetchAPI<VidlinkResponse>(
      `/vidlink/tv/${seriesId}?season=${season}&episode=${episode}`
    );
  },

  getAnimePlayer: async (
    animeId: string,
    number: number,
    type: string = 'sub'
  ): Promise<VidlinkResponse> => {
    return fetchAPI<VidlinkResponse>(
      `/vidlink/anime/${animeId}?number=${number}&type=${type}`
    );
  },

  // ==================== FEATURED CONTENT ====================
  getFeaturedContent: async (): Promise<(Movie | Series)[]> => {
    return fetchAPI<(Movie | Series)[]>('/home');
  },

  // ==================== ADVANCED SEARCH ====================
  search: async (params: {
    query?: string;
    genre?: string;
    year?: number;
    type?: 'movie' | 'series';
    minRating?: number;
    sortBy?: 'rating' | 'newest' | 'oldest';
  }): Promise<(Movie | Series)[]> => {
    const queryParams = new URLSearchParams();
    
    if (params.query) queryParams.append('query', params.query);
    if (params.genre) queryParams.append('genre', params.genre);
    if (params.year) queryParams.append('year', params.year.toString());
    if (params.type) queryParams.append('type', params.type);
    if (params.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchAPI<(Movie | Series)[]>(`/search${query}`);
  },

  // ==================== SIMILAR CONTENT ====================
  getSimilarContent: async (
    type: 'movie' | 'series',
    id: string,
    limit: number = 6
  ): Promise<(Movie | Series)[]> => {
    return fetchAPI<(Movie | Series)[]>(
      `/${type === 'movie' ? 'movies' : 'series'}/${id}/similar?limit=${limit}`
    );
  },

  // ==================== RECOMMENDATIONS ====================
  getRecommendations: async (
    contentId: string,
    contentType: 'movie' | 'series'
  ): Promise<(Movie | Series)[]> => {
    return fetchAPI<(Movie | Series)[]>(
      `/recommendations?contentId=${contentId}&contentType=${contentType}`
    );
  },

  // ==================== ANALYTICS ====================
  trackView: async (
    contentId: string,
    contentType: 'movie' | 'series',
    deviceType: string = 'web'
  ): Promise<{ success: boolean }> => {
    return fetchAPI<{ success: boolean }>('/analytics/views', {
      method: 'POST',
      body: JSON.stringify({ contentId, contentType, deviceType }),
    });
  },

  // ==================== UTILITY ====================
  getContentById: async (
    type: 'movie' | 'series',
    id: string
  ): Promise<Movie | Series | undefined> => {
    try {
      if (type === 'movie') {
        return await api.getMovieById(id);
      } else {
        return await api.getSeriesById(id);
      }
    } catch (error) {
      console.error(`Error fetching ${type} ${id}:`, error);
      return undefined;
    }
  },

  // Health check
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE.replace('/api', '')}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};

export default api;