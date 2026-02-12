const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');
const { validate, schemas } = require('../middleware/validation');

// GET /series - List all series
router.get('/', validate(schemas.seriesFilters), seriesController.getAllSeries);

// GET /series/trending - Get trending series
router.get('/trending', seriesController.getTrending);

// GET /series/new - Get new series
router.get('/new', seriesController.getNewSeries);

// GET /series/rated - Get top rated series
router.get('/rated', seriesController.getTopRated);

// GET /series/featured - Get featured series
router.get('/featured', seriesController.getFeatured);

// GET /series/:slug - Get series by slug
router.get('/:slug', validate(schemas.slugParam, 'params'), seriesController.getSeriesBySlug);

// GET /series/:slug/seasons/:season_number - Get season episodes
router.get('/:slug/seasons/:season_number', seriesController.getSeasonEpisodes);

// GET /series/:slug/episodes/:episode_slug - Get episode by slug
router.get('/:slug/episodes/:episode_slug', seriesController.getEpisodeBySlug);

module.exports = router;
