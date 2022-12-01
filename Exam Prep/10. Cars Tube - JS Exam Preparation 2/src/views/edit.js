import { editItem, getItemDetails } from '../api/data.js';
import { html } from '../lib.js';

export const editPage = async (ctx) => {
  const data = await getItemDetails(ctx.params.id);

  const onEdit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));
    item.price = Number(item.price);
    item.year = Number(item.year);

    const hasEmptyField = Object.values(item).some((x) => x == '');

    if (hasEmptyField) {
      return alert('All fields are required');
    }

    await editItem(ctx.params.id, item);
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (data, onEdit) => html`
  <main id="site-content">
   <section id="edit-listing">
      <div class="container">

        <form id="edit-form" @submit=${onEdit}>
          <h1>Edit Car Listing</h1>
          <p>Please fill in this form to edit an listing.</p>
          <hr>

          <p>Car Brand</p>
          <input type="text" placeholder="Enter Car Brand" name="brand" .value="${data.brand}">

          <p>Car Model</p>
          <input type="text" placeholder="Enter Car Model" name="model" .value="${data.model}">

          <p>Description</p>
          <input type="text" placeholder="Enter Description" name="description" .value="${data.description}">

          <p>Car Year</p>
          <input type="number" placeholder="Enter Car Year" name="year" .value="${data.year}">

          <p>Car Image</p>
          <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${data.imageUrl}">

          <p>Car Price</p>
          <input type="number" placeholder="Enter Car Price" name="price" .value="${data.price}">

          <hr>
          <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
      </div>
     </section>
  </main>
`;