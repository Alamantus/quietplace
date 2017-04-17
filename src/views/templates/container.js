import html from 'choo/html';

import helpers from '../../helpers';

import header from './header';
import footer from './footer';

export default (title, subtitle, content, {contentClass = 'scene', showBack = false, emit = undefined} = {}) => {
  return html`
    <section class="hero is-blue is-fullheight">

      ${header(title, subtitle, showBack, emit)}

      <div class="hero-body ${contentClass}">
        <div class="container">
          <div class="container">
            ${content}
          </div>
        </div>
      </div>

      ${footer()}

    </section>
  `;
}
