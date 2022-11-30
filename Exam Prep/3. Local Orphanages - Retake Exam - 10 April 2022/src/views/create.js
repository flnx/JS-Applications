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
    ctx.page.redirect('/dashboard');
  };

  ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
  <main id="main-content">
    <section id="create-page" class="auth">
      <form @submit=${onCreate} id="create">
        <h1 class="title">Create Post</h1>

        <article class="input-group">
          <label for="title">Post Title</label>
          <input type="title" name="title" id="title" />
        </article>

        <article class="input-group">
          <label for="description">Description of the needs </label>
          <input type="text" name="description" id="description" />
        </article>

        <article class="input-group">
          <label for="imageUrl"> Needed materials image </label>
          <input type="text" name="imageUrl" id="imageUrl" />
        </article>

        <article class="input-group">
          <label for="address">Address of the orphanage</label>
          <input type="text" name="address" id="address" />
        </article>

        <article class="input-group">
          <label for="phone">Phone number of orphanage employee</label>
          <input type="text" name="phone" id="phone" />
        </article>

        <input type="submit" class="btn submit" value="Create Post" />
      </form>
    </section>
  </main>
`;
