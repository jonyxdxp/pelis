const express = require('express');
const router = express.Router();
const vidlinkController = require('../controllers/vidlinkController');
const rateLimiter = require('../middleware/rateLimiter');

/**
 * @route GET /api/vidlink/movie/:movieId
 * @description Obtener URL del reproductor para una película
 * @param {string} movieId - ID de la película
 */
router.get('/movie/:movieId', rateLimiter, vidlinkController.getMoviePlayer);

/**
 * @route GET /api/vidlink/tv/:seriesId?season=1&episode=1
 * @description Obtener URL del reproductor para una serie
 * @param {string} seriesId - ID de la serie
 * @query {number} season - Número de temporada
 * @query {number} episode - Número de episodio
 */
router.get('/tv/:seriesId', rateLimiter, vidlinkController.getTvPlayer);

/**
 * @route GET /api/vidlink/anime/:animeId?number=1&type=sub
 * @description Obtener URL del reproductor para un anime
 * @param {string} animeId - ID del anime
 * @query {number} number - Número de episodio
 * @query {string} type - 'sub' o 'dub' (default: 'sub')
 * @query {boolean} fallback - Usar fallback automático (opcional)
 */
router.get('/anime/:animeId', rateLimiter, vidlinkController.getAnimePlayer);

module.exports = router;