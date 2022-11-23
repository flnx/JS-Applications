let html;
import { getAllFurniture } from '../api/data.js'

export async function catalogPage(ctx) {
  html = ctx.html;

  const data = await getAllFurniture();
  const cards = wrapper(data);

  ctx.render(cards);
}

const wrapper = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>

  <div class="row space-top">
     ${data.map(cardTemplate)}
  </div>`;

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
