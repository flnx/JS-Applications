import { getItems } from '../api/data.js';
import { html } from '../lib.js';

export const catalogPage = async (ctx) => {
  const data = await getItems();
  ctx.render(catalogTemplate(data));
};

const catalogTemplate = (items) => html`
  <main id="site-content">
    <section id="car-listings">
      <h1>Car Listings</h1>
      <div class="listings">
        ${items.length > 0
          ? items.map(cardTemplate)
          : html`<p class="no-cars">No cars in database.</p>`}
      </div>
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="listing">
    <div class="preview">
      <img src="${card.imageUrl}" />
    </div>
    <h2>${card.brand} ${card.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${card.year}</h3>
        <h3>Price: ${card.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${card._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;
