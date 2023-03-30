import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const catalogPage = async (ctx) => {
    const session = getUser();
    const data = await getItems();

    ctx.render(catalogTemplate(data, session));
};

const catalogTemplate = (data, session) => html`
    <main id="main-content">
        <section id="catalogPage">
            <h1>All Albums</h1>
            ${data.length > 0
                ? data.map((x) => cardTemplate(x, session))
                : html`<p>No Albums in Catalog!</p>`}
        </section>
    </main>
`;

const cardTemplate = (card, session) => {
    return html` <div class="card-box">
        <img src="${card.imgUrl}" />
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genre}</p>
                <p class="price">Price: $${card.price}</p>
                <p class="date">Release Date: ${card.releaseDate}</p>
            </div>
            ${session
                ? html` <div class="btn-group">
                      <a href="/details/${card._id}" id="details">Details</a>
                  </div>`
                : null}
        </div>
    </div>`;
};
