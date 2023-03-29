import { getItems } from '../api/data.js';
import { html } from '../lib.js';

export const catalogPage = async (ctx) => {
    const data = await getItems();

    ctx.render(catalogTemplate(data));
};

const catalogTemplate = (items) => {
    const hasAlbums = items.length > 0;

    return html`
        <main>
            <!-- Dashboard page -->
            <section id="dashboard">
                <h2>Albums</h2>
                ${hasAlbums
                    ? html`<ul class="card-wrapper">
                          ${items.map(memeTemplate)}
                      </ul>`
                    : html`<h2>There are no albums added yet.</h2>`}
            </section>
        </main>
    `;
};

const memeTemplate = (card) => html`
    <li class="card">
        <img src="${card.imageUrl}" alt="travis" />
        <p><strong>Singer/Band: </strong><span class="singer">${card.singer}</span></p>
        <p><strong>Album name: </strong><span class="album">${card.album}</span></p>
        <p><strong>Sales:</strong><span class="sales">${card.sales}</span></p>
        <a class="details-btn" href="/details/${card._id}">Details</a>
    </li>
`;
