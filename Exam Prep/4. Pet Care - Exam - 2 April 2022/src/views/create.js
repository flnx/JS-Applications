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
  <main id="content">
    <section id="createPage">
      <form @submit=${onCreate} class="createForm">
        <img src="/images/cat-create.jpg" />
        <div>
          <h2>Create PetPal</h2>
          <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" placeholder="Max" />
          </div>
          <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
          </div>
          <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" placeholder="2 years" />
          </div>
          <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" placeholder="5kg" />
          </div>
          <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" placeholder="./image/dog.jpeg" />
          </div>
          <button class="btn" type="submit">Create Pet</button>
        </div>
      </form>
    </section>
  </main>
`;
