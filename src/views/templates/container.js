import html from 'choo/html';

import $ from 'jquery';

import helpers from '../../helpers';

import header from './header';

export default (title, subtitle, content, {contentClass = 'scene', showBack = false} = {}) => {
  return html`
    <section class="hero is-blue is-fullheight" id="quietplace">

      ${header(title, subtitle, showBack)}

      <div class="hero-body ${contentClass}">
        <div class="container">
          <div class="container">
            ${content}
          </div>
        </div>
      </div>

    </section>
  `;
}
