import { getSearchResult } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const searchPage = async (ctx) => {
    const session = getUser();
    const query = Object.fromEntries(new URLSearchParams(ctx.querystring));

    const results = [];
    const initialRender = query.where ? false : true;

    if (!initialRender) {
        const allResults = await getSearchResult(query.where.trim());
        allResults.map((x) => results.push(x));
    }

    const onSearch = (e) => {
        e.preventDefault();

        const searchResult = e.target.parentElement.querySelector('#search-input').value;

        if (searchResult == '') {
            window.alert('You must enter an album name');
            return ctx.page.redirect('/search');
        }

        ctx.page.redirect(`/search?where=${searchResult}`);
    };

    ctx.render(searchTemplate(results, initialRender, onSearch, session));
};

const searchTemplate = (results, initialRender, onSearch, session) => html`
    <main id="main-content">
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input
                    id="search-input"
                    type="text"
                    name="search"
                    placeholder="Enter desired albums's name"
                />
                <button class="button-list" @click=${onSearch}>Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            ${initialRender
                ? null
                : html`<div class="search-result">
                      ${results.length > 0
                          ? results.map((x) => searchCard(x, session))
                          : html`<p class="no-result">No result.</p>`}
                  </div>`}
        </section>
    </main>
`;

const searchCard = (card, session) => html`
    <div class="card-box">
        <img src="${card.imgUrl}" />
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genre}</p>
                <p class="price">Price: ${card.price}</p>
                <p class="date">Release Date: ${card.releaseDate}</p>
            </div>
            ${session
                ? html`<div class="btn-group">
                      <a href="/details/${card._id}" id="details">Details</a>
                  </div>`
                : null}
        </div>
    </div>
`;
