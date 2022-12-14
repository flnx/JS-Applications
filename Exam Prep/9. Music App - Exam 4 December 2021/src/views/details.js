import { deleteItem, getItemDetails } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const owner = getUser()?._id;

  const data = await getItemDetails(ctx.params.id);

  const session = {
    itemOwnerId: data._ownerId,
    isOwner() { return owner == this.itemOwnerId ? true : false; },
    ctx
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
  <main id="main-content">
    <section id="detailsPage">
      <div class="wrapper">
        <div class="albumCover">
          <img src="${data.imgUrl}" />
        </div>
        <div class="albumInfo">
          <div class="albumText">
            <h1>Name: ${data.name}</h1>
            <h3>Artist: ${data.artist}</h3>
            <h4>Genre: ${data.genre}</h4>
            <h4>Price: $${data.price}</h4>
            <h4>Date: ${data.releaseDate}</h4>
            <p>${data.description}</p>
          </div>
          ${session.isOwner()
            ? html`<div class="actionBtn">
                <a href="/edit/${data._id}" class="edit">Edit</a>
                <a href="/delete" class="remove" @click=${onDelete.bind(null, session.ctx)}>Delete</a>
              </div>`
            : nothing}
        </div>
      </div>
    </section>
  </main>
`;
