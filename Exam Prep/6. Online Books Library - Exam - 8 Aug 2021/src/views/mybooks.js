import { getItems, getMyBooks } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const myBooksPage = async (ctx) => {
  const ownerId = getUser()?._id;
  const data = await getMyBooks(ownerId);

  ctx.render(myBooksTemplate(data));
};

const myBooksTemplate = (data) => html`
  <main id="site-content">
    <section id="my-books-page" class="my-books">
      <h1>My Books</h1>
      <!-- Display ul: with list-items for every user's books (if any) -->
      ${data.length > 0
        ? html`<ul class="my-books-list">${data.map(cardTemplate)}</ul>`
        : html`<p class="no-books">No books in database!</p>`}
      </section>
  </main>
`;

const cardTemplate = (card) => html`
  <li class="otherBooks">
    <h3>${card.title}</h3>
    <p>Type: ${card.type}</p>
    <p class="img"><img src="${card.imageUrl}" /></p>
    <a class="button" href="/details/${card._id}">Details</a>
  </li>
`;
