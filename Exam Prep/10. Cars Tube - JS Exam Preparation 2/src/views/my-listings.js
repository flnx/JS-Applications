import { getMyListings } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const myListingsPage = async(ctx) => {
  const ownerId = getUser()._id;
  const data = await getMyListings(ownerId);
  ctx.render(myListingsTemplate(data));
};

const myListingsTemplate = (data) => html`
  <main id="site-content">
    <section id="my-listings">
      <h1>My car listings</h1>
      <div class="listings">
        ${data.length > 0
          ? data.map(card)
          : html`<p class="no-cars">You haven't listed any cars yet.</p>`}
      </div>
    </section>
  </main>
`;

const card = (card) => html`
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
