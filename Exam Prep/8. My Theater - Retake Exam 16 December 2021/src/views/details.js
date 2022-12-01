import { deleteItem, getItemDetails, getLikes, like, getUserLike } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

let ctx = null;

export const detailsPage = async (context) => {
  ctx = context;
  const owner = getUser()?._id;

  const data = [
      getItemDetails(ctx.params.id), 
      getLikes(ctx.params.id)
      ];

  if (owner) {
    data.push(getUserLike(ctx.params.id, owner));
  }

  const [book, likes, userLike] = await Promise.all(data);

  const session = {
    hasLoggedUser: owner ? true : false,
    bookOwnerId: book._ownerId,
    isOwner() {
      return owner == this.bookOwnerId ? true : false;
    },
    hasUserLiked: userLike == 0 ? false : true,
    ctx,
  };

  ctx.render(detailsTemplate(onDelete, book, session, likes, onLike));
};

const onLike = async(e) => {
  await like({ theaterId: ctx.params.id });
  ctx.page.redirect(`/details/${ctx.params.id}`);
};

const onDelete = async(e) => {
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(ctx.params.id);
    ctx.page.redirect('/profile');
  }
};

const detailsTemplate = (onDelete, data, session, likes, onLike) => html`
  <main id="content">
    <section id="detailsPage">
      <div id="detailsBox">
        <div class="detailsInfo">
          <h1>Title: ${data.title}</h1>
          <div>
            <img src="${data.imageUrl}" />
          </div>
        </div>

        <div class="details">
          <h3>Theater Description</h3>
          <p>${data.description}</p>
          <h4>Date: ${data.date}</h4>
          <h4>Author: ${data.author}</h4>
          <div class="buttons">
            ${session.isOwner()
              ? html`
                  <a class="btn-delete" href="javascript:void(0)" @click=${onDelete}>Delete</a>
                  <a class="btn-edit" href="/edit/${data._id}">Edit</a>`
              : nothing}
            ${!session.isOwner() && session.hasLoggedUser && !session.hasUserLiked 
              ? html`<a class="btn-like" href="#" @click=${onLike}>Like</a>`
              : nothing} 
          </div>
          <p class="likes">Likes: ${likes}</p>
        </div>
      </div>
    </section>
  </main>
`;

