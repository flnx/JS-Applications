import { createItem } from '../api/data.js';
import { html } from '../lib.js';

export const createPage = (ctx) => {
  const onCreate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));
    item.price = Number(item.price);
    item.year = Number(item.year);
    
    const hasEmptyField = Object.values(item).some((x) => x == '');

    if (hasEmptyField) {
      return alert('All fields are required');
    }

    await createItem(item);
    e.target.reset();
    ctx.page.redirect('/catalog');
  };

  ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
  <main id="site-content">
    <section id="create-listing">
      <div class="container">
        <form id="create-form" @submit=${onCreate}>
          <h1>Create Car Listing</h1>
          <p>Please fill in this form to create an listing.</p>
          <hr />

          <p>Car Brand</p>
          <input type="text" placeholder="Enter Car Brand" name="brand" />

          <p>Car Model</p>
          <input type="text" placeholder="Enter Car Model" name="model" />

          <p>Description</p>
          <input type="text" placeholder="Enter Description" name="description" />

          <p>Car Year</p>
          <input type="number" placeholder="Enter Car Year" name="year" />

          <p>Car Image</p>
          <input type="text" placeholder="Enter Car Image" name="imageUrl" />

          <p>Car Price</p>
          <input type="number" placeholder="Enter Car Price" name="price" />

          <hr />
          <input type="submit" class="registerbtn" value="Create Listing" />
        </form>
      </div>
    </section>
  </main>
`;
