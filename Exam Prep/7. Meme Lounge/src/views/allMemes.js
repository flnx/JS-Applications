import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const allMemesPage = async (ctx) => {
  const data = await getItems();

  ctx.render(allMemesTemplate(data));
};

const allMemesTemplate = (items) => html`
  <main>
    <section id="meme-feed">
      <h1>All Memes</h1>
      ${items.length > 0
        ? html`<div id="memes">${items.map(memeTemplate)}</div>`
        : html`<p class="no-memes">No memes in database.</p>`}
    </section>
  </main>
`;

const memeTemplate = (card) => html`
  <div class="meme">
    <div class="card">
      <div class="info">
        <p class="meme-title">${card.title}</p>
        <img class="meme-image" alt="meme-img" src="${card.imageUrl}" />
      </div>
      <div id="data-buttons">
        <a class="button" href="/details/${card._id}">Details</a>
      </div>
    </div>
  </div>
`;
