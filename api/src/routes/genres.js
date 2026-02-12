const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const movieController = require('../controllers/movieController');
const seriesController = require('../controllers/seriesController');

// GET /genres - List all genres
router.get('/', genreController.getAllGenres);

// GET /genres/:slug - Get genre with content
router.get('/:slug', genreController.getGenreBySlug);

// GET /genres/:slug/movies - Get movies by genre
router.get('/:slug/movies', movieController.getMoviesByGenre);

// GET /genres/:slug/series - Get series by genre
router.get('/:slug/series', seriesController.getSeriesByGenre);

module.exports = router;
