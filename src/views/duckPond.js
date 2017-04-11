const html = require('choo/html');
const onload = require('on-load');
const moment = require('moment');
const seedRandom = require('seed-random');

const helpers = require('../helpers.js');
const duckPondData = require('../data/duckPond.yaml');
helpers.dataContext = duckPondData;

module.exports = (state, emit) => {
  helpers.setRandomSeed(state.dateStamp);

  const feed = (numberOfDucks) => {
    let message = '';

    if (state.pellets > 0) {
      seedRandom.resetGlobal();

      message = html`<span>${duckPondData.actions.feed.text}<br>${helpers.randomArrayElement(duckPondData.actions.feed.possibilities)}</span>`;

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

  return html`
    <section class="hero is-info is-fullheight" onload=${() => helpers.scrollDescription()}>
      <div class="hero-head">
        <div class="container">
          <div class="level">
            
            <div class="level-item">
              <h1 class="title">
                Duck Pond
              </h1>
            </div>

            <div class="level-item">
              <h3 class="subtitle">
                It's ${helpers.getAppropriateArticle(state.weather)} ${state.weather} day and it feels ${state.temperature}
              </h3>
            </div>

          </div>
        </div>
      </div>

      <div class="hero-body duck-pond">
        <div class="container">
          <div class="container">
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
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  `;
}