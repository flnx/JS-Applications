import { deleteItem, getItemDetails } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const owner = getUser()?._id;

  const data = await getItemDetails(ctx.params.id);

  const session = {
    itemOwnerId: data._ownerId,
    isOwner() {
      return owner == this.itemOwnerId ? true : false;
    },
    ctx,
  };

  ctx.render(detailsTemplate(onDelete, data, session));
};

const onDelete = async (ctx, e) => {
  e.preventDefault();
  const confirmMessage = confirm('Are you sure you want to delete this song?');

  if (confirmMessage) {
    await deleteItem(ctx.params.id);
    ctx.page.redirect('/catalog');
  }
};

const detailsTemplate = (onDelete, data, session) => html`
  <main id="site-content">
    <section id="listing-details">
      <h1>Details</h1>
      <div class="details-info">
        <img src="${data.imageUrl}" />
        <hr />
        <ul class="listing-props">
          <li><span>Brand:</span>${data.brand}</li>
          <li><span>Model:</span>${data.model}</li>
          <li><span>Year:</span>${data.year}</li>
          <li><span>Price:</span>${data.price}$</li>
        </ul>

        <p class="description-para">${data.description}</p>

        ${session.isOwner()
          ? html` <div class="listings-buttons">
              <a href="/edit/${data._id}" class="button-list">Edit</a>
              <a href="#" class="button-list" @click=${onDelete.bind(null, session.ctx)}>Delete</a>
            </div>`
          : nothing}
      </div>
    </section>
  </main>
`;
