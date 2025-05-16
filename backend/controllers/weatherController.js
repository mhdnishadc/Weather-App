import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const dataFile = './data/searches.json';

export const getWeatherByCity = async (req, res) => {
  const city = req.query.city;
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );
  const data = await response.json();
  res.json(data);
};

export const getWeatherByCoordinates = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
};


export const saveSearch = (req, res) => {
  const { city } = req.body;
  const dir = './data';
  const dataFile = `${dir}/searches.json`;

  let searches = [];

  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Read existing searches if file exists
  if (fs.existsSync(dataFile)) {
    searches = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  }

  // Add new search if not already in the list
  if (!searches.includes(city)) searches.push(city);

  // Write updated searches to file
  fs.writeFileSync(dataFile, JSON.stringify(searches));
  res.json({ message: 'Saved' });
};


export const getSearches = (req, res) => {
  const searches = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile))
    : [];
  res.json(searches);
};
