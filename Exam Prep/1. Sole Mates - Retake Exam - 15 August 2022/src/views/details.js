import { deleteItem, getItemDetails } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
  const data = await getItemDetails(ctx.params.id);
  const owner = getUser()?._id;

  const onDelete = async () => {
    const confirmMessage = confirm('Are you sure you want to delete that item?');

    if (confirmMessage) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect('/dashboard');
    }
  };

  ctx.render(detailsTemplate(data, onDelete, owner));
};

const detailsTemplate = (item, onDelete, owner) => html`
  <main>
    <section id="details">
      <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
          <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>Brand: <span id="details-brand">${item.brand}</span></p>
          <p>Model: <span id="details-model">${item.model}</span></p>
          <p>Release date: <span id="details-release">${item.release}</span></p>
          <p>Designer: <span id="details-designer">${item.designer}</span></p>
          <p>Value: <span id="details-value">${item.value}</span></p>
        </div>

        <!--Edit and Delete are only for creator-->
        ${owner == item._ownerId
          ? html`
              <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
              </div>
            `
          : nothing}
      </div>
    </section>
  </main>
`;
