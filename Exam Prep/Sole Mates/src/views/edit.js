import { editItem, getItemDetails } from '../api/data.js';
import { html } from '../lib.js';

export const editPage = async (ctx) => {
  const data = await getItemDetails(ctx.params.id);

  const onEdit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));

    const hasEmptyField = Object.values(item).some((x) => x == '');

    if (hasEmptyField) {
      return alert('All fields are required');
    }

    await editItem(ctx.params.id, item);
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (item, onEdit) => html`
  <main>
    <section id="edit">
      <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onEdit} class="edit-form">
          <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${item.brand}/>
          <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${item.model}/>
          <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${item.imageUrl}/>
          <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${item.release}/>
          <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${item.designer}/>
          <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${item.value}/>
          <button type="submit">post</button>
        </form>
      </div>
    </section>
  </main>
`;
