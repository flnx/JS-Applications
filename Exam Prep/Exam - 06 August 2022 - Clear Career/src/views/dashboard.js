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
      ${items.length > 0
        ? html`${items.map(cardTemplate)}`
        : html`<h2>No offers yet.</h2>`}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <h2>Job Offers</h2>
  <!-- Display a div with information about every post (if any)-->
  <div class="offer">
    <img src="${card.imageUrl}" alt="example1" />
    <p><strong>Title: </strong><span class="title">${card.title}</span></p>
    <p><strong>Salary:</strong><span class="salary">${card.salary}</span></p>
    <a class="details-btn" href="/details/${card._id}">Details</a>
  </div>
`;
