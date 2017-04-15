require('./styles/main.scss');

import html from 'choo/html';
import choo from 'choo';

const app = choo();

import moment from 'moment';

import helpers from './helpers';
import weatherData from './data/weather.yaml';

// Import views
import main from './views/main';

// Import controllers
// import {DuckPondController} from './controllers/DuckPondController.js';

const dateStamp = moment().format('YYYYMMDD');
helpers.setRandomSeed(dateStamp);

// App state and emitters
app.use((state, emitter) => {
  state.dateStamp = dateStamp;
  state.pellets = 10;
  state.userActions = [];
  state.weather = helpers.randomArrayElement(weatherData.sky);
  state.temperature = helpers.randomArrayElement(weatherData.temperature);

  // Listeners
  emitter.on('DOMContentLoaded', () => {
    emitter.on('duckpond-feed', (method) => {
      method();
    });
  });
});

// Routes accessed with hashes
app.route('/:place', main);

app.mount('#place');
