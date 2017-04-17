import html from 'choo/html';

import aboutPage from './aboutPage';

export default () => {
  return html`
    <div class="hero-foot">
      <div class="container">
        <div class="level">
          
          <div class="level-left">
            <div class="level-item">
              <p>
                quietplace is only guaranteed to be completely functional on the most up-to-date
                web browsers.
              </p>
            </div>
          </div>
          
          <div class="level-right">
            <div class="level-item">
              ${aboutPage()}
            </div>
            <div class="level-item">
              <a href="https://github.com/Alamantus/quietplace/issues" class="button is-link is-small">
                Report an Issue
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}
