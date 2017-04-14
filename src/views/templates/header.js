import html from 'choo/html';

export default (title, subtitle, showBack) => {
  return html`
    <div class="hero-head">
      <div class="container">
        <div class="level">

          ${(showBack) ? html`
            <div class="level-item">
              <a href="./" class="button is-link">
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
