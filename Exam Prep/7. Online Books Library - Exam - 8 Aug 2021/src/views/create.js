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
  <main id="site-content">
    <section id="create-page" class="create">
      <form id="create-form" action="" method="" @submit=${onCreate}>
        <fieldset>
          <legend>Add new Book</legend>
          <p class="field">
            <label for="title">Title</label>
            <span class="input">
              <input type="text" name="title" id="title" placeholder="Title" />
            </span>
          </p>
          <p class="field">
            <label for="description">Description</label>
            <span class="input">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
              ></textarea>
            </span>
          </p>
          <p class="field">
            <label for="image">Image</label>
            <span class="input">
              <input type="text" name="imageUrl" id="image" placeholder="Image" />
            </span>
          </p>
          <p class="field">
            <label for="type">Type</label>
            <span class="input">
              <select id="type" name="type">
                <option value="Fiction">Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Mistery">Mistery</option>
                <option value="Classic">Clasic</option>
                <option value="Other">Other</option>
              </select>
            </span>
          </p>
          <input class="button submit" type="submit" value="Add Book" />
        </fieldset>
      </form>
    </section>
  </main>
`;
