'use strict';

const axios = require('axios');

async function getWeather(request, response) {
  try {
    let weatherQuery = request.query.weatherQuery;
    // console.log(weatherQuery);
    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);

    let dataRecieved = await axios.get(url);

    let weatherDisplay = [];
    dataRecieved.data.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
    });
    // console.log(weatherDisplay);
    response.send(weatherDisplay);
  } catch (error){
    console.log(error);
  }
}

class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

module.exports = getWeather;
