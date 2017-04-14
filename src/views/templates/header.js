import html from 'choo/html';

import helpers from '../../helpers';

export default (title, subtitle, showBack, emit = () => {}) => {
  return html`
    <div class="hero-head">
      <div class="container">
        <div class="level">

          ${(showBack) ? html`
            <div class="level-item">
              <a class="button is-link" onclick=${() => {
                helpers.fadeOut(() => {
                  emit('pushState', './');
                  emit('render');
                });
              }}>
                \u2190 Entrance
              </a>
            </div>
            `
            : ''}
          
          <div class="level-item">
            <h1 class="title">
              ${title}
            </h1>
          </div>

          <div class="level-item">
            <h3 class="subtitle">
              ${subtitle}
            </h3>
          </div>

        </div>
      </div>
    </div>
  `;
}
