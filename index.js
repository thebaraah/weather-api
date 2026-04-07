const express = require('express');
const axios = require('axios');

const app = express();

app.get('/weather/:location', async (req, res) => {
  try {
    const city = req.params.location;

    const geoRes = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    if (!geoRes.data.results) {
      return res.status(404).send('City not found');
    }

    const { latitude, longitude } = geoRes.data.results[0];

    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    res.json(weatherRes.data.current_weather);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching weather');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});