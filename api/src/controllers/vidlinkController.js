const vidlinkService = require('../integrations/vidlink/vidlinkService');
const prisma = require('../config/database');
const logger = require('../config/logger');

/**
 * Obtener URL del reproductor para película
 */
exports.getMoviePlayer = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validar que movieId esté presente
    if (!movieId) {
      return res.status(400).json({ 
        error: 'El ID de la película es requerido' 
      });
    }

    // Obtener película de la base de datos
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      return res.status(404).json({ 
        error: 'Película no encontrada' 
      });
    }

    // Verificar que tenga TMDB ID
    if (!movie.tmdbId) {
      logger.warn(`Película sin TMDB ID: ${movie.id}`);
      return res.status(400).json({ 
        error: 'Esta película no tiene TMDB ID configurado' 
      });
    }

    // Generar URL de Vidlink
    const embedUrl = vidlinkService.getMovieUrl(movie.tmdbId);

    logger.info(`Reproductor de película solicitado: ${movie.title} (${movie.id})`);

    res.json({
      success: true,
      embedUrl: embedUrl,
      movieTitle: movie.title,
      movieId: movie.id
    });
  } catch (error) {
    logger.error(`Error en getMoviePlayer: ${error.message}`);
    res.status(500).json({ 
      error: error.message || 'Error al obtener el reproductor' 
    });
  }
};

/**
 * Obtener URL del reproductor para serie
 */
exports.getTvPlayer = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const { season, episode } = req.query;

    // Validar parámetros
    if (!seriesId) {
      return res.status(400).json({ 
        error: 'El ID de la serie es requerido' 
      });
    }

    if (!season || !episode) {
      return res.status(400).json({ 
        error: 'La temporada y episodio son requeridos' 
      });
    }

    // Obtener serie de la base de datos
    const series = await prisma.series.findUnique({
      where: { id: seriesId }
    });

    if (!series) {
      return res.status(404).json({ 
        error: 'Serie no encontrada' 
      });
    }

    // Verificar que tenga TMDB ID
    if (!series.tmdbId) {
      logger.warn(`Serie sin TMDB ID: ${series.id}`);
      return res.status(400).json({ 
        error: 'Esta serie no tiene TMDB ID configurado' 
      });
    }

    // Generar URL de Vidlink
    const embedUrl = vidlinkService.getTvUrl(series.tmdbId, season, episode);

    logger.info(`Reproductor de serie solicitado: ${series.title} S${season}E${episode}`);

    res.json({
      success: true,
      embedUrl: embedUrl,
      seriesTitle: series.title,
      seriesId: series.id,
      season: parseInt(season),
      episode: parseInt(episode)
    });
  } catch (error) {
    logger.error(`Error en getTvPlayer: ${error.message}`);
    res.status(500).json({ 
      error: error.message || 'Error al obtener el reproductor' 
    });
  }
};

/**
 * Obtener URL del reproductor para anime
 */
exports.getAnimePlayer = async (req, res) => {
  try {
    const { animeId } = req.params;
    const { number, type = 'sub', fallback = false } = req.query;

    // Validar parámetros
    if (!animeId) {
      return res.status(400).json({ 
        error: 'El ID del anime es requerido' 
      });
    }

    if (!number) {
      return res.status(400).json({ 
        error: 'El número de episodio es requerido' 
      });
    }

    // Obtener anime de la base de datos
    const anime = await prisma.anime.findUnique({
      where: { id: animeId }
    });

    if (!anime) {
      return res.status(404).json({ 
        error: 'Anime no encontrado' 
      });
    }

    // Verificar que tenga MAL ID
    if (!anime.malId) {
      logger.warn(`Anime sin MyAnimeList ID: ${anime.id}`);
      return res.status(400).json({ 
        error: 'Este anime no tiene MyAnimeList ID configurado' 
      });
    }

    // Generar URL de Vidlink
    const embedUrl = vidlinkService.getAnimeUrl(
      anime.malId,
      number,
      type,
      fallback === 'true'
    );

    logger.info(`Reproductor de anime solicitado: ${anime.title} EP${number}`);

    res.json({
      success: true,
      embedUrl: embedUrl,
      animeTitle: anime.title,
      animeId: anime.id,
      episode: parseInt(number),
      type: type
    });
  } catch (error) {
    logger.error(`Error en getAnimePlayer: ${error.message}`);
    res.status(500).json({ 
      error: error.message || 'Error al obtener el reproductor' 
    });
  }
};