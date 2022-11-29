import { getItems } from '../api/data.js';
import { html } from '../lib.js';

export const dashboardPage = async (ctx) => {
  const data = await getItems();
  ctx.render(dashboardTemplate(data));
};

const dashboardTemplate = (items) => html`
  <main id="content">
    <section id="dashboard">
      <h2 class="dashboard-title">Services for every animal</h2>
      ${items.length > 0
        ? html`<div class="animals-dashboard">${items.map(cardTemplate)}</div>`
        : html`<div><p class="no-pets">No pets in dashboard</p></div>`}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="animals-board">
    <article class="service-img">
      <img class="animal-image-cover" src="${card.image}" />
    </article>
    <h2 class="name">${card.name}</h2>
    <h3 class="breed">${card.breed}</h3>
    <div class="action">
      <a class="btn" href="/details/${card._id}">Details</a>
    </div>
  </div>
`;
