import {
  deleteItem,
  getItemDetails,
  donate,
  allDonations,
  specificDonation,
} from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

let context = null;

export const detailsPage = async (ctx) => {
  context = ctx;
  const owner = getUser()?._id;

  const [data, totalDonations, hasUserDonated] = await Promise.all([
    getItemDetails(ctx.params.id),
    allDonations(ctx.params.id),
    specificDonation(ctx.params.id, owner),
  ]);

  const session = {
    hasLoggedUser: owner ? true : false,
    offerOwnerId: data._ownerId,
    isOwner() { return owner == this.offerOwnerId ? true : false },
    hasUserDonated: hasUserDonated == 1 ? true : false,
    totalDonations,
  };

  ctx.render(detailsTemplate(onDelete, onDonate, data, session));
};

const detailsTemplate = (onDelete, onDonate, data, session) => html`
  <main id="main-content">
    <section id="details-page">
      <h1 class="title">Post Details</h1>

      <div id="container">
        <div id="details">
          <div class="image-wrapper">
            <img src="${data.imageUrl}" alt="Material Image" class="post-image" />
          </div>
          <div class="info">
            <h2 class="title post-title">${data.title}</h2>
            <p class="post-description">Description: ${data.description}</p>
            <p class="post-address">Address: ${data.address}</p>
            <p class="post-number">Phone number: ${data.phone}</p>
            <p class="donate-Item">Donate Materials: ${session.totalDonations}</p>
            <!--Edit and Delete are only for creator-->
            <div class="btns">
              ${session.isOwner()
                ? html`<a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                       <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>`
                : nothing}
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${!session.isOwner() && session.hasLoggedUser && !session.hasUserDonated
                ? html`<a href="#" @click=${onDonate} class="donate-btn btn">Donate</a>`
                : nothing}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
`;

const onDelete = async () => {
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(context.params.id);
    context.page.redirect('/dashboard');
  }
};

const onDonate = async () => {
  await donate({ postId: context.params.id });
  context.page.redirect(`/details/${context.params.id}`);
};
