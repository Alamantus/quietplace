import html from 'choo/html';

import helpers from '../../helpers';

export default () => {
  const modalId = 'aboutModal';

  const open = () => {
    document.getElementById(modalId).className += ' is-active';
  }
  
  const close = () => {
    const modal = document.getElementById(modalId);
    modal.className = modal.className.replace(' is-active', '');
  }

  return html`
    <div>
      <a class="button is-small is-link" onclick=${open}>
        About
      </a>
      <div class="modal" id="${modalId}">
        <div class="modal-background" onclick=${close}></div>
        <div class="modal-card">

          <header class="modal-card-head">
            <p class="modal-card-title">About quietplace</p>

            <button class="delete" onclick=${close}></button>
          </header>

          <section class="modal-card-body">
            <div class="content">
              <p>
                quietplace is a digital space to relax in and enjoy light interaction,
                where every day highlights a different focus in each place you visit.
              </p>
              <p>
                All music is taken from <a href="https://freemusicarchive.org" target="_blank">freemusicarchive.org</a>
                and all sound effects are taken from <a href="https://freesound.org" target="_blank">freesound.org</a>.
                Each respective item is accessed by the API provided by its
                source.
              </p>
              <p>
                Any music, sound effects, and images used on this site are assumed to be
                in the public domain or creative commons—if this is incorrect, please
                contact us at dev (at) alamantus (dot) com so we can correct the problem
                as quickly as possible.
              </p>
            </div>
          </section>

          <footer class="modal-card-foot">
            <a class="button" onclick=${close}>Cool, thanks</a>
          </footer>

        </div>
      </div>
    </div>
  `;
}
