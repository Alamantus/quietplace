import html from 'choo/html';
import onload from 'on-load';
import moment from 'moment';
import seedRandom from 'seed-random';

import container from '../templates/container';

import helpers from '../../helpers';
import duckPondData from '../../data/duckPond.yaml';
helpers.dataContext = duckPondData;

export default (state, emit) => {
  helpers.setRandomSeed(state.dateStamp);

  const feed = (numberOfDucks) => {
    let message = '';

    if (state.pellets > 0) {
      seedRandom.resetGlobal();

      message = `${duckPondData.actions.feed.text}<br>${helpers.randomArrayElement(duckPondData.actions.feed.possibilities)}`;

      helpers.setRandomSeed();
    } else {
      message = `You don't have any more duck pellets, but `;

      if (numberOfDucks > 0 ) {
        message += `the duck${(numberOfDucks === 1) ? '' : 's'} feel${(numberOfDucks === 1) ? 's' : ''} grateful anyway.`;
      } else {
        message += 'you feel a sense of gratitude in your heart.'
      }
    }

    emit('feed', message);
  }

  const numberOfDucks = helpers.randomIntInRange(0, 30);

  const event = helpers.randomArrayElement(duckPondData.events);
  const possibility = helpers.randomArrayElement(event.possibilities);

  const title = 'Welcome to the quietplace'
  , subtitle = `It's ${helpers.getAppropriateArticle(state.weather)} ${state.weather} day and it feels ${state.temperature}`
  , contentClass = 'entrance';

  const content = html`
    <div class="columns">
      <div class="column">

        <h3 class="title">
          Please choose a place to visit
        </h3>

        <div class="tile is-ancestor">
          
          <div class="tile">
            <a href="./#duckpond" class="button is-primary">
              The Duck Pond
            </a>
          </div>

        </div>

      </div>
    </div>
  `;

  return container(title, subtitle, content, {contentClass: contentClass});
}
