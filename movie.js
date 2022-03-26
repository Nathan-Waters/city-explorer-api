'use strict';

const axios = require('axios');

async function getMovie(request, response) {
  try {
    let movieQuery = request.query.movieQuery;

    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}&total_results=3`);

    let dataRecieved = await axios.get(url);

    let movieDisplay = [];

    dataRecieved.data.results.forEach(i => {
      let movie = new Movies(i);
      movieDisplay.push(movie);
    });
    response.send(movieDisplay);
  } catch (error){
    console.log(error);
  }
}

class Movies {
  constructor(element) {
    this.title = element.title;
    this.description = element.overview;
    this.imgURL = element.poster_path;
  }
}

module.exports = getMovie;
