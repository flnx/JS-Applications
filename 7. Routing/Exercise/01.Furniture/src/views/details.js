import { deleteItem, getItemDetails } from '../api/data.js';
import { getSessionInfo } from '../auth.js';

let html;
let context;

export async function showDetails(ctx) {
  html = ctx.html;
  context = ctx;

  const data = await getItemDetails(ctx.params.id);
  const section = template(data);

  ctx.render(section);
}

const template = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>

  <div class="row space-top">${card(data)}</div>
`;

const card = (card) => {
  const currentUserId = getSessionInfo();

  return html`
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src="/${card.img}" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${card.make}</span></p>
      <p>Model: <span>${card.model}</span></p>
      <p>Year: <span>${card.year}</span></p>
      <p>Description: <span>${card.description}</span></p>
      <p>Price: <span>${card.price}</span></p>
      <p>Material: <span>${card.material}</span></p>

      ${card._ownerId === currentUserId
        ? html`<div>
            <a href="/edit/${card._id}" data-id="${card._id}" class="btn btn-info">Edit</a>
            <a href="" @click=${onDelete} data-id="${card._id}" class="btn btn-red">Delete</a>
          </div>`
        : ''}
    </div>
  `;
};

async function onDelete(e) {
  e.preventDefault();
  await deleteItem(e.target.dataset.id);
  context.page.redirect('/');
}

