const html = require('choo/html');
const moment = require('moment');
const seedRandom = require('seed-random');

const helpers = require('../helpers.js');
const duckPondData = require('../data/duckPond.yaml');
helpers.dataContext = duckPondData;

module.exports = (state, emit) => {
  const dateStamp = moment().format('YYYYMMDD');
  const setRandomSeed = () => seedRandom(dateStamp, {global: true});
  setRandomSeed();

  const feed = (numberOfDucks) => {
    let message = '';

    if (state.pellets > 0) {
      seedRandom.resetGlobal();

      message = html`<span>${duckPondData.actions.feed.text}<br>${helpers.randomArrayElement(duckPondData.actions.feed.possibilities)}</span>`;

      setRandomSeed();
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

  return html`<div>
    <header class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Duck Pond
          </h1>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="content column is-three-quarters" id="scene">
            <p>
              There ${(numberOfDucks === 1) ? 'is' : 'are'} ${(numberOfDucks === 0) ? 'no' : numberOfDucks.toString()}
              duck${(numberOfDucks === 1) ? '' : 's'} floating lazily in the pond.
            </p>
            <p>
              ${helpers.fillTemplateString(event.text, false)} ${possibility ? helpers.fillTemplateString(possibility, false) : ''}
            </p>
            ${state.userActions.map(action => {
              return html`
              <p>
                ${action}
              </p>
              `;
            })}
          </div>
          <div class="field column is-one-quarter">
            <label class="label">
              You have ${(state.pellets === 0) ? 'no' : state.pellets.toString()}
              duck pellet${(state.pellets === 1) ? '' : 's'}.
            </label>
            <p class="control">
              <a class="button" onclick=${() => feed(numberOfDucks)} ${(state.pellets < 1) ? 'disabled' : ''}>
                Feed
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}