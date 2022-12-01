import { html } from '../lib.js';

export const homePage = async (ctx) => {
  ctx.render(homeTemplate());
};

const homeTemplate = () => html`
  <main id="main-content">
    <section id="welcomePage">
      <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Music Application!</h1>
      </div>

      <div class="music-img">
        <img src="/images/musicIcons.webp" />
      </div>
    </section>
  </main>
`;
