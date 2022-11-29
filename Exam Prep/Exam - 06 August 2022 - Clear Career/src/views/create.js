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
<main>
      <section id="create">
        <div class="form">
          <h2>Create Offer</h2>
          <form @submit=${onCreate} class="create-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
              cols="50"></textarea> 
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
</main>
`;