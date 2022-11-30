import { getItems } from '../api/data.js';
import { html } from '../lib.js';

export const dashboardPage = async (ctx) => {
  const itemsData = await getItems();

  ctx.render(dashboardTemplate(itemsData));
};

const dashboardTemplate = (items) => html`
  <main id="main-content">
    <section id="dashboard-page">
      <h1 class="title">All Posts</h1>
      ${items.length > 0
        ? html` <div class="all-posts">${items.map(cardTemplate)}</div> `
        : html` <h1 class="title no-posts-title">No posts yet!</h1> `}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="post">
    <h2 class="post-title">${card.title}</h2>
    <img class="post-image" src="${card.imageUrl}" alt="Kids clothes" />
    <div class="btn-wrapper">
      <a href="/details/${card._id}" class="details-btn btn">Details</a>
    </div>
  </div>
`;
