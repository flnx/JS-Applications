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
          <h2>Edit Offer</h2>
          <form @submit=${onEdit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${item.title}/>
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${item.imageUrl}/>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${item.category}/>
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50" .value=${item.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"cols="50" .value=${item.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${item.salary}/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>
  </main>
`;
