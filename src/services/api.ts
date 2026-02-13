const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_VERSION = 'v1';
const API_URL = `${API_BASE}/api/${API_VERSION}`;

export const api = {
  getMovies: async () => {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
  },

  getSeriesById: async (id: string) => {
    const response = await fetch(`${API_URL}/series/${id}`);
    if (!response.ok) throw new Error('Failed to fetch series');
    return response.json();
  },

  getMovieById: async (id: string) => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
  },

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

  search: async (query: string) => {
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search');
    return response.json();
  },

  getGenres: async () => {
    const response = await fetch(`${API_URL}/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres');
    return response.json();
  },

  getSeries: async () => {
    const response = await fetch(`${API_URL}/series`);
    if (!response.ok) throw new Error('Failed to fetch series');
    return response.json();
  },

  getHome: async () => {
    const response = await fetch(`${API_URL}/home`);
    if (!response.ok) throw new Error('Failed to fetch home');
    return response.json();
  },
};

export default api;