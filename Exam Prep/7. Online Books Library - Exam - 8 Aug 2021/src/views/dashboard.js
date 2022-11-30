import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const dashboardPage = async (ctx) => {
  const data = await getItems();

  ctx.render(dashboardTemplate(data));
};

const dashboardTemplate = (items) => html`
  <main id="site-content">
    <section id="dashboard-page" class="dashboard">
      <h1>Dashboard</h1>
      ${items.length > 0 
      ? html`<ul class="other-books-list">${items.map(bookTemplate)}</ul>`
      : html`<p class="no-books">No books in database!</p>`}
    </section>
  </main>
`;

const bookTemplate = (card) => html`
  <li class="otherBooks">
    <h3>${card.title}</h3>
    <p>Type: ${card.type}</p>
    <p class="img"><img src="${card.imageUrl}" /></p>
    <a class="button" href="/details/${card._id}">Details</a>
  </li>
`;
