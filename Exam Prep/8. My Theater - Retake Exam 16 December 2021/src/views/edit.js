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
  <main id="content">
    <section id="editPage">
        <form class="theater-form" @submit=${onEdit}>
          <h1>Edit Theater</h1>
          <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${data.title} value="To Kill A Mockingbird">
          </div>
          <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${data.date} value="December 13, 2018">
          </div>
          <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${data.author} value="Aaron Sorkin, Fred Fordham">
          </div>
          <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
              placeholder="Description" .value=${data.description}></textarea>
          </div>
          <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" .value=${data.imageUrl} placeholder="Image Url"
              value="./images/Moulin-Rouge!-The-Musical.jpg">
          </div>
          <button class="btn" type="submit">Submit</button>
        </form>
      </section>
  </main>
`;
