const router = require("express").Router();
const axios = require("axios");

require('dotenv').config();

router.get('getCurrentWeather', async (req, res) => {
    const {lat, lon} = req.body
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
    
    const data = await axios.get(weatherURL);
    res.json(data)
})

module.exports = router