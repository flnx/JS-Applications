import { deleteItem, getItemDetails, donate, allDonations, specificDonation } from '../api/data.js';
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

  console.log(totalDonations);

  const session = {
    hasLoggedUser: owner ? true : false,
    offerOwnerId: data._ownerId,
    isOwner() { return owner == this.offerOwnerId ? true : false },
    hasUserDonated: hasUserDonated == 0 ? false : true,
    totalDonations,
  };

  ctx.render(detailsTemplate(onDelete, onDonate, data, session));
};

const detailsTemplate = (onDelete, onDonate, data, session) => html`
  <main id="content">
  <section id="detailsPage">
      <div class="details">
        <div class="animalPic">
          <img src="${data.image}">
        </div>
        <div>
          <div class="animalInfo">
            <h1>Name: ${data.name}</h1>
            <h3>Breed: ${data.breed}</h3>
            <h4>Age: ${data.age}</h4>
            <h4>Weight: ${data.weight}</h4>
            <h4 class="donation">Donation: ${session.totalDonations * 100}$</h4>
          </div>
          <!-- if there is no registered user, do not display div-->
          ${session.hasLoggedUser 
          ? html`<div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${session.isOwner() 
              ? html`<a href="/edit/${data._id}" class="edit">Edit</a>
                     <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>` 
              : nothing}
            <!--(Bonus Part) Only for no creator and user-->
            ${!session.isOwner() && session.hasLoggedUser && !session.hasUserDonated
            ? html`<a href="javascript:void(0)" @click=${onDonate} class="donate">Donate</a>`
            : nothing}
          </div>` 
          : nothing}
        </div>
      </div>
    </section>
  </main>
`;

const onDelete = async (e) => {
  e.preventDefault();
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(context.params.id);
    context.page.redirect('/');
  }
};

const onDonate = async (e) => {
  e.preventDefault();

  await donate({ petId: context.params.id });
  context.page.redirect(`/details/${context.params.id}`);
};
