import { getSearchResult } from '../api/data.js';
import { html } from '../lib.js';

export const searchPage = async (ctx) => {
    const query = Object.fromEntries(new URLSearchParams(ctx.querystring));

    const results = [];
    const initialRender = query.where ? false : true;

    if (!initialRender) {
        const allResults = await getSearchResult(query.where.trim());
        allResults.map((x) => results.push(x));
    }

    const onSearchHandler = (e) => {
        e.preventDefault();

        const searchResult = Object.fromEntries(new FormData(e.target));

        if (searchResult.search == '') {
            window.alert('You must enter an album name');
            return ctx.page.redirect('/search');
        }

        ctx.page.redirect(`/search?where=${searchResult.search}`);
    };

    ctx.render(searchTemplate(results, initialRender, onSearchHandler));
};

const searchTemplate = (results, initialRender, handleSearch) => html`
    <main>
        <!-- Search page -->
        <section id="search">
            <div class="form" @submit=${handleSearch}>
                <h2>Search</h2>
                <form class="search-form">
                    <input type="text" name="search" id="search-input" />
                    <button class="button-list">Search</button>
                </form>
            </div>
            <h4>Results:</h4>

            ${initialRender
                ? null
                : html`
                      ${results.length == 0
                          ? html`<p class="no-result">No result.</p>`
                          : html`<div class="search-result">${results.map(searchCard)}</div>`}
                  `}
        </section>
    </main>
`;

const searchCard = (card) => html`
    <div class="fruit">
        <img src="${card.imageUrl}" alt="example1" />
        <h3 class="title">${card.name}</h3>
        <p class="description">${card.description}</p>
        <a class="details-btn" href="/details/${card._id}">More Info</a>
    </div>
`;
