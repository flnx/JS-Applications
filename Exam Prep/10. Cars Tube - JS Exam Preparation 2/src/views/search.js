import { search } from '../api/data.js';
import { html, nothing } from '../lib.js';

export const searchPage = async (ctx) => {
  const query = new URLSearchParams(ctx.querystring);
  const result = query.get('search');

  if(result) {
    if (isNaN(result) || result == '') {
      return alert('Invalid number');
    }

    return showResult(ctx, result);
  }

  ctx.render(searchBarTemplate(ctx, onSearch));
};

const showResult = async(ctx, result) => {
  const data = await search(result);
  ctx.render(searchBarTemplate(ctx, onSearch, data));  
} 

const onSearch = async(ctx, e) => {
  const result = e.target.parentElement.querySelector('#search-input').value;
  const parsed = Number(result);

  if (isNaN(parsed) || result == '') {
    return alert('Invalid number');
  }

  ctx.page.redirect(`/search-page/?search=${result}`);
}

const searchBarTemplate = (ctx, searchFn, data) => html`
  <main id="site-content">
    <section id="search-cars">
      <h1>Filter by year</h1>

      <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" />
        <button class="button-list" @click=${searchFn.bind(null, ctx)}>Search</button>
      </div>

      <h2>Results:</h2>
      ${data ? resultTemplate(data) : nothing}
    </section>
  </main>
`;

const resultTemplate = (result) => html`
  <div class="listings">
    <!-- Display all records -->
    ${result.length > 0 
      ? result.map(resultCard) 
      : html`<p class="no-cars">No results.</p>`}
  </div>
`;

const resultCard = (card) => html`
  <div class="listing">
    <div class="preview">
      <img src="${card.imageUrl}" />
    </div>
    <h2>${card.brand} ${card.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${card.year}</h3>
        <h3>Price: ${card.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/details/${card._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;
