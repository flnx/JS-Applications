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
            <h2>Fruits</h2>
            <section id="dashboard">
                ${hasAlbums ? items.map(fruitTemplate) : html`<h2>No fruit info yet.</h2>`}
                <!-- Display a div with information about every post (if any)-->
            </section>
        </main>
    `;
};

const fruitTemplate = (card) => {
    return html`
        <div class="fruit">
            <img src="${card.imageUrl}" alt="example1" />
            <h3 class="title">${card.name}</h3>
            <p class="description">${card.description}</p>
            <a class="details-btn" href=${`/details/${card._id}`}>More Info</a>
        </div>
    `;
};
