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
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (data, onEdit) => html`
  <main id="main-content">
    <section id="edit-page" class="auth">
      <form id="edit" @submit=${onEdit}>
        <div class="container">
          <h1>Edit Game</h1>
          <label for="leg-title">Legendary title:</label>
          <input type="text" id="title" name="title" .value=${data.title} value="" />

          <label for="category">Category:</label>
          <input type="text" id="category" name="category" .value=${data.category} value="" />

          <label for="levels">MaxLevel:</label>
          <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${data.maxLevel} value="" />

          <label for="game-img">Image:</label>
          <input type="text" id="imageUrl" name="imageUrl" .value=${data.imageUrl} value="" />

          <label for="summary">Summary:</label>
          <textarea name="summary" id="summary" .value=${data.summary}></textarea>
          <input class="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  </main>
`;
