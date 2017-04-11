require('./styles/main.scss');

const html = require('choo/html');
const choo = require('choo');
let app = choo();

const moment = require('moment');

const helpers = require('./helpers');
const weatherData = require('./data/weather.yaml');

// Import views
const duckPond = require('./views/duckPond');

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
    emitter.on('feed', (message) => {
      state.pellets -= (state.pellets > 0) ? 1 : 0;
      state.userActions.push(message);
      emitter.emit('render');
      // TODO: Figure out how to run AFTER the render completes.
      // helpers.scrollDescription();
    });
  });
});

// Routes accessed with hashes
app.route('/:anything', duckPond);

app.mount('#place');
