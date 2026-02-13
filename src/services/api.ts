const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_VERSION = 'v1';
const API_URL = `${API_BASE}/api/${API_VERSION}`;

export const api = {
  // Películas
  getMovies: async () => {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();
    return data.data?.movies || [];
  },

  getMovieById: async (id: string) => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    const data = await response.json();
    return data.data || data;
  },

  getTrendingMovies: async (limit: number = 10) => {
    const response = await fetch(`${API_URL}/movies?trending=true&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    const data = await response.json();
    return data.data?.movies || [];
  },

  getNewReleases: async (limit: number = 10) => {
    const response = await fetch(`${API_URL}/movies?new=true&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch new releases');
    const data = await response.json();
    return data.data?.movies || [];
  },

  // Series
  getSeries: async () => {
    const response = await fetch(`${API_URL}/series`);
    if (!response.ok) throw new Error('Failed to fetch series');
    const data = await response.json();
    return data.data?.series || [];
  },

  getSeriesById: async (id: string) => {
    const response = await fetch(`${API_URL}/series/${id}`);
    if (!response.ok) throw new Error('Failed to fetch series');
    const data = await response.json();
    return data.data || data;
  },

  // Home
  getHome: async () => {
    const response = await fetch(`${API_URL}/home`);
    if (!response.ok) throw new Error('Failed to fetch home');
    const data = await response.json();
    return data.data || data;
  },

  // Featured Content
  getFeaturedContent: async () => {
    const response = await fetch(`${API_URL}/home`);
    if (!response.ok) throw new Error('Failed to fetch featured content');
    const data = await response.json();
    return data.data?.featuredContent || [];
  },

  // Géneros
  getGenres: async () => {
    const response = await fetch(`${API_URL}/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres');
    const data = await response.json();
    return data.data?.genres || data.data || [];
  },

  // Búsqueda
  search: async (query: string) => {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search');
    const data = await response.json();
    return data.data?.movies || data.data?.series || [];
  },

  // Recomendaciones
  getRecommendations: async (contentId: string, contentType: string = 'movie') => {
    const response = await fetch(`${API_URL}/recommendations/${contentId}?type=${contentType}`);
    if (!response.ok) throw new Error('Failed to fetch recommendations');
    const data = await response.json();
    return data.data || [];
  },

  // Analytics
  trackView: async (contentId: string, contentType: string) => {
    const response = await fetch(`${API_URL}/analytics/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId, contentType }),
    });
    return response.json();
  },

  // Vidlink Players
  getMoviePlayer: async (movieId: string) => {
    const response = await fetch(`${API_URL}/vidlink/movie/${movieId}`);
    if (!response.ok) throw new Error('Failed to get movie player');
    return response.json();
  },

  getTvPlayer: async (seriesId: string, season: number, episode: number) => {
    const response = await fetch(
      `${API_URL}/vidlink/tv/${seriesId}?season=${season}&episode=${episode}`
    );
    if (!response.ok) throw new Error('Failed to get TV player');
    return response.json();
  },

  getAnimePlayer: async (animeId: string, number: number, type: string = 'sub') => {
    const response = await fetch(
      `${API_URL}/vidlink/anime/${animeId}?number=${number}&type=${type}`
    );
    if (!response.ok) throw new Error('Failed to get anime player');
    return response.json();
  },
};

export default api;