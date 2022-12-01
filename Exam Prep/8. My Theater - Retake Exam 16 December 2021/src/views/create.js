import { createItem } from '../api/data.js';
import { html } from '../lib.js';

export const createPage = (ctx) => {
  const onCreate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));

    const hasEmptyField = Object.values(item).some((x) => x == '');

    if (hasEmptyField) {
      return alert('All fields are required');
    }
    
    e.target.reset();
    await createItem(item);
    ctx.page.redirect('/');
  };

  ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
  <main id="content">
  <section id="createPage">
      <form class="create-form" @submit=${onCreate}>
        <h1>Create Theater</h1>
        <div>
          <label for="title">Title:</label>
          <input id="title" name="title" type="text" placeholder="Theater name" value="">
        </div>
        <div>
          <label for="date">Date:</label>
          <input id="date" name="date" type="text" placeholder="Month Day, Year">
        </div>
        <div>
          <label for="author">Author:</label>
          <input id="author" name="author" type="text" placeholder="Author">
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="Description"></textarea>
        </div>
        <div>
          <label for="imageUrl">Image url:</label>
          <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
        </div>
        <button class="btn" type="submit">Submit</button>
      </form>
    </section>
  </main>
`;
