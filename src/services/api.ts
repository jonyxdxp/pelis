const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_VERSION = 'v1';

const buildUrl = (path: string) => `${API_URL}/${API_VERSION}${path}`;

export const api = {
  getMovies: async () => {
    const response = await fetch(buildUrl('/movies'));
    return response.json();
  },

  getTrendingMovies: async (limit = 10) => {
    const response = await fetch(buildUrl(`/movies?trending=true&limit=${limit}`));
    return response.json();
  },

  getNewReleases: async (limit = 10) => {
    const response = await fetch(buildUrl(`/movies?new=true&limit=${limit}`));
    return response.json();
  },

  getMovieById: async (id: string) => {
    const response = await fetch(buildUrl(`/movies/${id}`));
    return response.json();
  },

  getSeries: async () => {
    const response = await fetch(buildUrl('/series'));
    return response.json();
  },

  getSeriesById: async (id: string) => {
    const response = await fetch(buildUrl(`/series/${id}`));
    return response.json();
  },

  getMoviePlayer: async (movieId: string) => {
    const response = await fetch(buildUrl(`/vidlink/movie/${movieId}`));
    return response.json();
  },

  getTvPlayer: async (seriesId: string, season: number, episode: number) => {
    const response = await fetch(
      buildUrl(`/vidlink/tv/${seriesId}?season=${season}&episode=${episode}`)
    );
    return response.json();
  },

  getAnimePlayer: async (animeId: string, number: number, type: string = 'sub') => {
    const response = await fetch(
      buildUrl(`/vidlink/anime/${animeId}?number=${number}&type=${type}`)
    );
    return response.json();
  },

  search: async (query: string) => {
    const response = await fetch(buildUrl(`/search?query=${query}`));
    return response.json();
  },

  getGenres: async () => {
    const response = await fetch(buildUrl('/genres'));
    return response.json();
  }
};