import { deleteItem, getItemDetails, getLikes, like, getUserLike} from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const owner = getUser()?._id;

  const data = [
    getItemDetails(ctx.params.id), 
    getLikes(ctx.params.id)
  ];

  if (owner) {
    data.push(getUserLike(ctx.params.id, owner))
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

const onLike = async (ctx, e) => {
  e.preventDefault();

  await like( { bookId: ctx.params.id } );
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

const detailsTemplate = (onDelete, data, session, likes, onLike) => html`
  <main id="site-content">
    <section id="details-page" class="details">
      <div class="book-information">
        <h3>${data.title}</h3>
        <p class="type">Type: ${data.type}</p>
        <p class="img"><img src="${data.imageUrl}" /></p>
        <div class="actions">
          <!-- Edit/Delete buttons ( Only for creator of this book )  -->
          ${session.isOwner()
            ? html`
                <a class="button" href="/edit/${data._id}">Edit</a>
                <a class="button" @click=${onDelete.bind(null, session.ctx)} href="javascript:void(0)" >Delete</a>`
            : nothing}
          <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
          ${session.hasLoggedUser && !session.isOwner() && !session.hasUserLiked
            ? html`<a class="button" @click=${onLike.bind(null, session.ctx)} href="javascript:void(0)" >Like</a>` 
            : nothing}
          <!-- ( for Guests and Users )  -->
          <div class="likes">
            <img class="hearts" src="/images/heart.png" />
            <span id="total-likes">Likes: ${likes}</span>
          </div>
        </div>
      </div>
      <div class="book-description">
        <h3>Description:</h3>
        <p>
         ${data.description}
        </p>
      </div>
    </section>
  </main>
`;