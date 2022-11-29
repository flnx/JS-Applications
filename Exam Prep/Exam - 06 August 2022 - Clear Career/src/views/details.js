import { apply, applyCount, deleteItem, getItemDetails, getTotalApplications } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

let context = null;

export const detailsPage = async (ctx) => {
  context = ctx;
  const owner = getUser()?._id;

  const [data, hasUserApplied, totalApplications] = await Promise.all([
    getItemDetails(ctx.params.id),
    applyCount(ctx.params.id, owner),
    getTotalApplications(ctx.params.id)
  ]);

  const session = {
    hasLoggedUser: owner ? true : false,
    offerOwnerId: data._ownerId,
    isOwner() { return owner == this.offerOwnerId ? true : false },
    hasUserApplied: hasUserApplied == 1 ? true : false,
    totalApplications,
    ctx
  };

  ctx.render(detailsTemplate(data, onDelete, onApply, session));
};

const onApply = async (e) => {
  e.preventDefault();
  await apply({ offerId: context.params.id });
  context.page.redirect(`/details/${context.params.id}`);
};

const onDelete = async (e) => {
  e.preventDefault();
  const confirmMessage = confirm('Are you sure you want to delete this offer?');

  if (confirmMessage) {
    await deleteItem(context.params.id);
    context.page.redirect('/dashboard');
  }
};

const detailsTemplate = (item, onDelete, onApply, session) => html`
  <main>
    <section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="${item.imageUrl}" alt="example1" />
        <p id="details-title">${item.title}</p>
        <p id="details-category">
          Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-salary">Salary: <span id="salary-number">${item.salary}</span></p>
        <div id="info-wrapper">
          <div id="details-description">
            <h4>Description</h4>
            <span>${item.description}</span>
          </div>
          <div id="details-requirements">
            <h4>Requirements</h4>
            <span>${item.requirements}</span>
          </div>
        </div>
        <p>Applications: <strong id="applications">${session.totalApplications}</strong></p>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${session.isOwner()
            ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                   <a href="javascript:void(0)" @click="${onDelete}" id="delete-btn">Delete</a>`
            : nothing}
           ${!session.isOwner() && session.hasLoggedUser && !session.hasUserApplied
            ? html`<a href="/" @click=${onApply} id="apply-btn">Apply</a>`
            : nothing}
          <!--Bonus - Only for logged-in users ( not authors )-->
        </div>
      </div>
    </section>
  </main>
`;


