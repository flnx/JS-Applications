import { deleteItem, getItemDetails } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const owner = getUser()?._id;

  const data = await getItemDetails(ctx.params.id);

  const session = {
    hasLoggedUser: owner ? true : false,
    memeOwnerId: data._ownerId,
    isOwner() { return owner == this.memeOwnerId ? true : false },
    ctx
  };

  ctx.render(detailsTemplate(onDelete, data, session));
};

const onDelete = async (ctx, e) => {
  e.preventDefault();
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(ctx.params.id);
    ctx.page.redirect('/all-memes');
  }
};

const detailsTemplate = (onDelete, data, session) => html`
  <main>
    <section id="meme-details">
      <h1>Meme Title: ${data.title}</h1>
      <div class="meme-details">
        <div class="meme-img">
          <img alt="meme-alt" src="${data.imageUrl}" />
        </div>
        <div class="meme-description">
          <h2>Meme Description</h2>
          <p>${data.description}</p>

          ${session.isOwner()
            ? html`<a class="button warning" href="/edit/${data._id}">Edit</a>
                <button class="button danger" @click=${onDelete.bind(null, session.ctx)}>Delete</button>`
            : nothing}
        </div>
      </div>
    </section>
  </main>
`;
