
import { getUserItems } from '../api/data.js';
import { getSessionInfo } from '../auth.js';

let html = null;

export async function furniturePage(ctx) {
  html = ctx.html;

  const id = getSessionInfo();
  const data = await getUserItems(id);

  const section = template(data);
  ctx.render(section);
}

const template = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>

  <div class="row space-top">${data.map(cardTemplate)}</div>
`;

const cardTemplate = (card) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${card.img}" />
        <p>${card.description}</p>
        <footer>
          <p>Price: <span>${card.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${card._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;
