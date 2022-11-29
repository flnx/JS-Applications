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

    await createItem(item);
    ctx.page.redirect('dashboard');
  };

  ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
<main>
  <section id="create">
    <div class="form">
      <h2>Add item</h2>
      <form @submit=${onCreate} class="create-form">
        <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
        <input type="text" name="model" id="shoe-model" placeholder="Model" />
        <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
        <input type="text" name="release" id="shoe-release" placeholder="Release date" />
        <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
        <input type="text" name="value" id="shoe-value" placeholder="Value" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
</main>
`;