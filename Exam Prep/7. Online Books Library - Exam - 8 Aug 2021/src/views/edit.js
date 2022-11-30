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
  <main id="site-content">
    <section id="edit-page" class="edit">
      <form id="edit-form" action="#" method="" @submit=${onEdit}>
        <fieldset>
          <legend>Edit my Book</legend>
          <p class="field">
            <label for="title">Title</label>
            <span class="input">
              <input type="text" name="title" id="title" .value=${data.title} value="A Court of Thorns and Roses" />
            </span>
          </p>
          <p class="field">
            <label for="description">Description</label>
            <span class="input">
              <textarea name="description" id="description" .value=${data.description}></textarea>
            </span>
          </p>
          <p class="field">
            <label for="image">Image</label>
            <span class="input">
              <input type="text" name="imageUrl" id="image" .value=${data.imageUrl} value="/images/book1.png" />
            </span>
          </p>
          <p class="field">
            <label for="type">Type</label>
            <span class="input">
              <select id="type" name="type" .value=${data.type} value="Fiction">
                <option value="Fiction">Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Mistery">Mistery</option>
                <option value="Classic">Clasic</option>
                <option value="Other">Other</option>
              </select>
            </span>
          </p>
          <input class="button submit" type="submit" value="Save" />
        </fieldset>
      </form>
    </section>
  </main>
`;
