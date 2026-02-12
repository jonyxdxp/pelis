const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { validate, schemas } = require('../middleware/validation');

// GET /movies - List all movies
router.get('/', validate(schemas.movieFilters), movieController.getMovies);

// GET /movies/trending - Get trending movies
router.get('/trending', movieController.getTrending);

// GET /movies/new - Get new releases
router.get('/new', movieController.getNewReleases);

// GET /movies/rated - Get top rated movies
router.get('/rated', movieController.getTopRated);

// GET /movies/featured - Get featured movies
router.get('/featured', movieController.getFeatured);

// GET /movies/:slug - Get movie by slug
router.get('/:slug', validate(schemas.slugParam, 'params'), movieController.getMovieBySlug);

module.exports = router;
