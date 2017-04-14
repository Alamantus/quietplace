import html from 'choo/html';
import onload from 'on-load';
import moment from 'moment';
import seedRandom from 'seed-random';

import helpers from '../../helpers.js';

import container from '../templates/container';

import {DuckPondController} from '../../controllers/DuckPondController.js';
import duckPondData from '../../data/duckPond.yaml';
helpers.dataContext = duckPondData;

export default (state, emit, controller) => {
  helpers.setRandomSeed(state.dateStamp);

  const duckPondController = new DuckPondController(state, emit);

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

    emit('duckpond-feed', duckPondController.feed(message));
  }

  const numberOfDucks = helpers.randomIntInRange(0, 30);

  const event = helpers.randomArrayElement(duckPondData.events);
  const possibility = helpers.randomArrayElement(event.possibilities);

  const title = 'Duck Pond'
  , subtitle = `It's ${helpers.getAppropriateArticle(state.weather)} ${state.weather} day and it feels ${state.temperature}`
  , contentClass = 'duck-pond';

  const content = html`
    <div class="columns">

      <div class="field column is-one-quarter">
        <div class="box">
          <label class="label has-text-centered">
            You have ${(state.pellets === 0) ? 'no' : state.pellets.toString()}
            duck pellet${(state.pellets === 1) ? '' : 's'}.
          </label>
          <p class="control">
            <a class="button is-fullwidth is-success" onclick=${() => feed(numberOfDucks)} ${(state.pellets < 1) ? 'disabled' : ''}>
              Feed
            </a>
          </p>
        </div>
      </div>

      <div class="column is-three-quarters">
        <div class="box description">
          <div class="content">
            
            ${state.userActions.map(action => {
              let momentTime = moment(action.time);
              let output = html`
              <p>
                <small>
                  ${(momentTime.isBefore(moment().subtract(5, 'minutes')))
                    ? momentTime.format('h:mm:ss a')
                    : momentTime.fromNow()}
                </small>
                <br>
              </p>
              `;
              // Append the action string, which may contain HTML.
              output.innerHTML += action.action;

              return output;
            })}

            <p>
              <small>
                Today
              </small>
              <br>
              There ${(numberOfDucks === 1) ? 'is' : 'are'} ${(numberOfDucks === 0) ? 'no' : numberOfDucks.toString()}
              duck${(numberOfDucks === 1) ? '' : 's'} floating lazily in the pond.
            </p>
            <p>
              ${helpers.fillTemplateString(event.text, false)} ${possibility ? helpers.fillTemplateString(possibility, false) : ''}
            </p>
          </div>
        </div>
      </div>

    </div>
  `;

  return html`${container(title, subtitle, content, {contentClass: contentClass, showBack: true, emit: emit})}`;
}
