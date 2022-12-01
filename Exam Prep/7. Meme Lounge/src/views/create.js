import { createItem } from '../api/data.js';
import { html } from '../lib.js';

export const createPage = (ctx) => {
  const onCreate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));

    const hasEmptyField = Object.values(item).some((x) => x == '');

    if (hasEmptyField) {
      return ctx.notify('All fields are required');
    }
    
    e.target.reset();
    await createItem(item);
    ctx.page.redirect('/all-memes');
  };

  ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
  <main>
    <section id="create-meme">
      <form @submit=${onCreate} id="create-form">
        <div class="container">
          <h1>Create Meme</h1>
          <label for="title">Title</label>
          <input id="title" type="text" placeholder="Enter Title" name="title" />
          <label for="description">Description</label>
          <textarea id="description" placeholder="Enter Description" name="description"></textarea>
          <label for="imageUrl">Meme Image</label>
          <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl"/>
          <input type="submit" class="registerbtn button" value="Create Meme" />
        </div>
      </form>
    </section>
  </main>
`;
