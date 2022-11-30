import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const catalogPage = async (ctx) => {
  const data = await getItems();

  ctx.render(catalogTemplate(data));
};

const catalogTemplate = (items) => html`
  <main id="main-content">
    <section id="catalog-page">
      <h1>All Games</h1>
      ${items.length > 0
        ? items.map(memeTemplate)
        : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
  </main>
`;

const memeTemplate = (card) => html`
  <div class="allGames">
    <div class="allGames-info">
      <img src="${card.imageUrl}" />
      <h6>${card.category}</h6>
      <h2>${card.title}</h2>
      <a href="/details/${card._id}" class="details-button">Details</a>
    </div>
  </div>
`;
