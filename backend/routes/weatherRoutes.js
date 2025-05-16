import express from 'express';
import {
  getWeatherByCity,
  getWeatherByCoordinates,
  saveSearch,
  getSearches,
} from '../controllers/weatherController.js';

const router = express.Router();

router.get('/weather', getWeatherByCity);
router.get('/weather/current', getWeatherByCoordinates);
router.post('/search', saveSearch);
router.get('/searches', getSearches);

export default router;
