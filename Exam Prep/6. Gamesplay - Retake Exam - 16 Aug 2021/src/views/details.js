import { deleteItem, getComments, getItemDetails, postAComment } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const owner = getUser()?._id;

  const [data, comments] = await Promise.all([
    await getItemDetails(ctx.params.id),
    await getComments(ctx.params.id),
  ]);

  const session = {
    hasLoggedUser: owner ? true : false,
    memeOwnerId: data._ownerId,
    isOwner() {
      return owner == this.memeOwnerId ? true : false;
    },
    ctx,
  };

  ctx.render(detailsTemplate(onDelete, data, session, comments, onComment));
};

const onComment = async (ctx, e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const comment = formData.get('comment');

  
  if (comment == '') {
    return alert('You can\'t leave a blank comment')
  }
  
  await postAComment({ gameId: ctx.params.id, comment });

  ctx.page.redirect(`/details/${ctx.params.id}`);
};

const onDelete = async (ctx, e) => {
  e.preventDefault();
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(ctx.params.id);
    ctx.page.redirect('/');
  }
};

const detailsTemplate = (onDelete, data, session, comments, onComment) => html`
  <main id="main-content">
    <section id="game-details">
      <h1>Game Details</h1>
      <div class="info-section">
        <div class="game-header">
          <img class="game-img" src="${data.imageUrl}" />
          <h1>${data.title}</h1>
          <span class="levels">MaxLevel: ${data.maxLevel}</span>
          <p class="type">${data.category}</p>
        </div>

        <p class="text">${data.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
          <h2>Comments:</h2>
          ${comments.length > 0
            ? html` <ul>${comments.map(commentsTemplate)}</ul>`
            : html`<p class="no-comment">No comments.</p>`}
        </div>
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${session.isOwner() ? buttons(onDelete, data, session) : nothing}
      </div>
      <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
      ${session.hasLoggedUser && !session.isOwner()
        ? html` <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${onComment.bind(null, session.ctx)}>
              <textarea name="comment" placeholder="Comment......"></textarea>
              <input class="btn submit" type="submit" value="Add Comment" />
            </form>
          </article>`
        : nothing}
    </section>
  </main>
`;

const commentsTemplate = (user) => html`
  <li class="comment">
    <p>Content: ${user.comment}</p>
  </li>
`;

const buttons = (onDelete, data, session) => html` 
<div class="buttons">
  <a href="/edit/${data._id}" class="button">Edit</a>
  <a href="javascript:void(0)" class="button" @click=${onDelete.bind(null, session.ctx)}>Delete</a>
</div>`;
