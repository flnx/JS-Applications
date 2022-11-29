import { searchItem } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const searchPage = async (ctx) => {
  ctx.render(searchTemplate(onSearch.bind(null, ctx)));
};

export const showResult = async (ctx) => {
  const [_, value] = ctx.querystring.split('=');

  const search = value
    ?.split(' ')
    .filter((x) => x != '')
    .join(' ');

  const data = search ? await searchItem(search) : [];
  console.log(data);

  ctx.render(searchTemplate(onSearch.bind(null, ctx), data));
};

const onSearch = (ctx, e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const search = formData.get('search');

  if (search == '') {
    alert('Fields should not be empty!');
  }

  ctx.page.redirect(`/search/result?=${search}`);
};

const searchTemplate = (onSearch, data) => html`
  <main>
    <section id="search">
      <h2>Search by Brand</h2>

      <form @submit=${onSearch} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required/>
        <button type="submit">Search</button>
      </form>

      <h3>Results:</h3>
      ${data ? searchResult(data) : nothing}
    </section>
  </main>
`;

const searchResult = (data) => html`
  ${data.length > 0
    ? html`
        <div id="search-container">
          <ul class="card-wrapper">
            ${data.map((c) => cardTemplate(c))}
          </ul>
        </div>
      `
    : notFoundTemplate}
`;

const cardTemplate = (card) => html`
  <li class="card">
    <img src="${card.imageUrl}" alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${card.model}</span></p>
    <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
    ${getUser() 
    ? html`<a href="/details/${card._id}" class="details-btn" href="">Details</a>`
    : nothing
    }
  </li>
`;





const notFoundTemplate = html`
  <div id="search-container">
    <h2>There are no results found.</h2>
  </div>
`;
