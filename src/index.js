require('./styles/main.scss');

import html from 'choo/html';
import choo from 'choo';

const app = choo();

import moment from 'moment';

import helpers from './helpers';
import weatherData from './data/weather.yaml';

// Import views
import duckPond from './views/duckPond';

// Import controllers
import {DuckPondController} from './controllers/DuckPondController.js';

const dateStamp = moment().format('YYYYMMDD');
helpers.setRandomSeed(dateStamp);

// App state and emitters
app.use((state, emitter) => {
  state.dateStamp = dateStamp;
  state.pellets = 10;
  state.userActions = [];
  state.weather = helpers.randomArrayElement(weatherData.sky);
  state.temperature = helpers.randomArrayElement(weatherData.temperature);

  const duckPondController = new DuckPondController(state, emitter);

  // Listeners
  emitter.on('DOMContentLoaded', () => {
    emitter.on('feed', (message) => {
      duckPondController.feed(message);
    });
  });
});

// Routes accessed with hashes
app.route('/:anything', duckPond);

app.mount('#place');
