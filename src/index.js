require('./styles/main.scss');

const html = require('choo/html');
const choo = require('choo');
let app = choo();

// Import views
const duckPond = require('./views/duckPond');

// App state and emitters
app.use((state, emitter) => {
  state.pellets = 10;
  state.userActions = [];

  // Listeners
  emitter.on('DOMContentLoaded', () => {
    emitter.on('feed', (message) => {
      state.pellets -= (state.pellets > 0) ? 1 : 0;
      state.userActions.push(message);
      emitter.emit('render');
    });
  });
});

// Routes accessed with hashes
app.route('/:anything', duckPond);

app.mount('#place');
