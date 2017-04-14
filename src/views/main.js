import html from 'choo/html';

import helpers from '../helpers.js';

// Scenes
import entrance from './scenes/entrance.js';
import duckPond from './scenes/duckPond.js';

export default (state, emit) => {
  helpers.setRandomSeed(state.dateStamp);

  switch (state.params.place) {
    case 'duckpond': {
      return duckPond(state, emit);
      break;
    }
    default: {
      return entrance(state, emit);
      break;
    }
  }
}
