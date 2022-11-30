import { getLatestGames } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const homePage = async(ctx) => {
  const data = await getLatestGames();

  ctx.render(homeTemplate(data));
};

const homeTemplate = (data) => html`
  <main id="main-content">
    <section id="welcome-world">
      <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="./images/four_slider_img01.png" alt="hero" />

      <div id="home-page">
        <h1>Latest Games</h1>
        ${data.length > 0
          ? data.map(cardTemplate)
          : html`<p class="no-articles">No games yet</p>`}
      </div>
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="game">
    <div class="image-wrap">
      <img src="${card.imageUrl}" />
    </div>
    <h3>${card.title}</h3>
    <div class="rating">
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
      <a href="/details/${card._id}" class="btn details-btn">Details</a>
    </div>
  </div>
`;
