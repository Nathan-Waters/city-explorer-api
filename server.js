'use strict';

// REQUIRE////////////////////////////
require('dotenv').config();//not app specific
const express = require('express');//not app specific
const cors = require('cors');//not app specific
const axios = require('axios');


//USE////////////////////////////
const app = express();//not app specific
app.use(cors());//not app specific
//define and validate .env file
const PORT = process.env.PORT || 3002;//not app specific


//ROUTES////////////////////////////

app.get('/', (req, res) => {
  res.send('This B the Main page, ARR');
});

app.get('/weather', async (request, response) => {
  let weatherQuery = request.query.weatherQuery;

  let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);

  let dataRecieved = await axios.get(url);

  let weatherDisplay = [];
  dataRecieved.data.data.forEach(date => {
    let forecast = new Forecast(date);
    weatherDisplay.push(forecast);
  });
  // console.log(weatherDisplay);
  response.send(weatherDisplay);
});


app.get('*', (req, res) => {
  res.send('this is not the page you are looking for');
});


//ERRORS////////////////////////////
//(error, req, res, next)// next is broken
app.use((error, req, res) => {
  res.status(500).sent(error.message);
});

//CLASSES/////////////////////////////
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

//LISTENER////////////////////////////
//listen is an express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));//not app specific

// app.get('/weather', (req, res) => {
//   try{
//     let city = req.query.city;
//     console.log(city);
//     let cityWeather = data.find(location => location.city_name === city);
//     console.log(cityWeather);
//   } catch(error) {
//     // next (error);
//     (error);
//   }
// });
