import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const catalogPage = async (ctx) => {
  const data = await getItems();
  ctx.render(catalogTemplate(data));
};

const catalogTemplate = (items) => html`
  <main id="main-content">
    <section id="catalogPage">
      <h1>All Albums</h1>
      ${items.length > 0 ? items.map(cardTemplate) : html`<p>No Albums in Catalog!</p>`}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="card-box">
    <img src="${card.imgUrl}" />
    <div>
      <div class="text-center">
        <p class="name">Name: ${card.name}</p>
        <p class="artist">Artist: ${card.artist}</p>
        <p class="genre">Genre: ${card.genre}</p>
        <p class="price">Price: $${card.price}</p>
        <p class="date">Release Date: ${card.releaseDate}</p>
      </div>
      ${getUser()
        ? html`<div class="btn-group">
            <a href="/details/${card._id}" id="details">Details</a>
          </div>`
        : nothing}
    </div>
  </div>
`;
