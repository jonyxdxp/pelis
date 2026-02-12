class VidlinkService {
  // Generar URL para películas
  getMovieUrl(tmdbId) {
    if (!tmdbId) {
      throw new Error('TMDB ID es requerido');
    }
    return `https://vidlink.pro/movie/${tmdbId}`;
  }

  // Generar URL para series
  getTvUrl(tmdbId, season, episode) {
    if (!tmdbId || !season || !episode) {
      throw new Error('TMDB ID, temporada y episodio son requeridos');
    }
    
    // Validar que sean números válidos
    const seasonNum = parseInt(season);
    const episodeNum = parseInt(episode);
    
    if (isNaN(seasonNum) || isNaN(episodeNum)) {
      throw new Error('Temporada y episodio deben ser números');
    }
    
    return `https://vidlink.pro/tv/${tmdbId}/${seasonNum}/${episodeNum}`;
  }

  // Generar URL para anime
  getAnimeUrl(malId, number, subOrDub, fallback = false) {
    if (!malId || !number || !subOrDub) {
      throw new Error('MyAnimeList ID, número y tipo (sub/dub) son requeridos');
    }

    if (!['sub', 'dub'].includes(subOrDub.toLowerCase())) {
      throw new Error('El tipo debe ser "sub" o "dub"');
    }

    let url = `https://vidlink.pro/anime/${malId}/${number}/${subOrDub.toLowerCase()}`;
    
    if (fallback) {
      url += '?fallback=true';
    }

    return url;
  }

  // Método genérico para validar y obtener URL
  getEmbedUrl(type, params) {
    switch(type.toLowerCase()) {
      case 'movie':
        return this.getMovieUrl(params.tmdbId);
      case 'tv':
        return this.getTvUrl(params.tmdbId, params.season, params.episode);
      case 'anime':
        return this.getAnimeUrl(params.malId, params.number, params.subOrDub, params.fallback);
      default:
        throw new Error('Tipo de contenido no soportado');
    }
  }
}

module.exports = new VidlinkService();