import { search } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const searchPage = async (ctx) => {
  ctx.render(searchBarTemplate(ctx));
};

const onSearch = (ctx, e) => {
  e.preventDefault();

  const rawResult = e.target.parentElement.querySelector('#search-input').value;

  if (rawResult == '') {
    return alert('Field should not be empty');
  }

  ctx.page.redirect(`/search-page/result?search=${rawResult}`);
};

export const showResult = async (ctx) => {
  const query = new URLSearchParams(ctx.querystring);
  const rawResult = query.get('search');

  const finalResult = rawResult
    .split(' ')
    .filter((x) => x != '')
    .join(' ');

  const data = await search(finalResult);
  ctx.render(searchBarTemplate(ctx, data));
};

const searchBarTemplate = (ctx, result) => html`
  <main id="main-content">
    <section id="searchPage">
      <h1>Search by Name</h1>
      <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" />
        <button class="button-list" @click=${onSearch.bind(null, ctx)}>Search</button>
      </div>
      <h2>Results:</h2>
      <div class="search-result">${result ? resultTemplate(result) : nothing}</div>
    </section>
  </main>
`;

const resultTemplate = (result) => html`
  ${result.length > 0
    ? result.map(resultCard)
    : html`<p class="no-result">No result.</p>`}
`;

const resultCard = (card) => html`
  <div class="card-box">
    <img src="${card.imgUrl}" />
    <div>
      <div class="text-center">
        <p class="name">Name: ${card.name}</p>
        <p class="artist">Artist: ${card.artist}</p>
        <p class="genre">Genre: ${card.genre}</p>
        <p class="price">Price: $${card.price}</p>
        <p class="date">Release Date: ${card.releaseDate}</p>
      </div>
      ${getUser()
        ? html`<div class="btn-group">
            <a href="/details/${card._id}" id="details">Details</a>
          </div>`
        : nothing}
    </div>
  </div>
`;
