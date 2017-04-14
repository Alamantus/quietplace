import html from 'choo/html';

import helpers from '../../helpers';

import header from './header';

export default (title, subtitle, content, {contentClass = 'scene', showBack = false, emit = undefined} = {}) => {
  return html`
    <section class="hero is-blue is-fullheight"
      onload=${() => {
        console.log('fading in');
        helpers.fadeIn();
      }}>

      ${header(title, subtitle, showBack, emit)}

      <div class="hero-body ${contentClass}">
        <div class="container">
          <div class="container">
            ${content}
          </div>
        </div>
      </div>

      <div class="fade-wall" id="fadeWall"></div>

    </section>
  `;
}
