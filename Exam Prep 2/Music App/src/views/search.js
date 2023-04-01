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
    <main>
        <!-- Search page -->
        <section id="search">
            <div class="form">
                <h2>Search</h2>
                <form class="search-form">
                    <input type="text" name="search" id="search-input" />
                    <button class="button-list">Search</button>
                </form>
            </div>
            <h4>Results:</h4>
            <div class="search-result">
                <p class="no-result">No result.</p>
                <!--If there are matches display a div with information about every fruit-->
                <div class="fruit">
                    <img src="./images/fruit 1.png" alt="example1" />
                    <h3 class="title">Pineapple</h3>
                    <p class="description">
                        The pineapple is a tropical plant with an edible fruit. It is the most
                        economically significant plant in the family Bromeliaceae.The pineapple is
                        indigenous to South America. Pineapples grow as a small shrub, the
                        individual flowers of the unpollinated plant fuse to form a multiple fruit.
                        The plant is normally propagated from the offset produced at the top of the
                        fruit,or from a side shoot, and typically matures within a year.
                    </p>
                    <a class="details-btn" href="">More Info</a>
                </div>
            </div>
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
