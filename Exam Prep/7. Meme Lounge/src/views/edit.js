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
      return ctx.notify('All fields are required');
    }

    await editItem(ctx.params.id, item);
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (card, onEdit) => html`
  <main>
    <section id="edit-meme">
      <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Title"
            name="title"
            .value=${card.title}
          />
          <label for="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            name="description"
            .value=${card.description}
          >
          </textarea>
          <label for="imageUrl">Image Url</label>
          <input
            id="imageUrl"
            type="text"
            placeholder="Enter Meme ImageUrl"
            name="imageUrl"
            .value=${card.imageUrl}
          />
          <input type="submit" class="registerbtn button" value="Edit Meme" />
        </div>
      </form>
    </section>
  </main>
`;
