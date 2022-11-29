import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const dashboardPage = async (ctx) => {
  const itemsData = await getItems();

  ctx.render(dashboardTemplate(itemsData));
};

const dashboardTemplate = (items) => html`
  <main>
    <section id="dashboard">
      <h2>Collectibles</h2>
      ${items.length > 0
        ? html`
            <ul class="card-wrapper">
              ${items.map(cardTemplate)}
            </ul>
          `
        : html` <h2>There are no items added yet.</h2> `}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <!-- Display a li with information about every post (if any)-->
  <li class="card">
    <img src="${card.imageUrl}" alt="eminem" />
    <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${card.model}</span></p>
    <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
    <a class="details-btn" href="/details/${card._id}">Details</a>
  </li>
`;
