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
  <main id="main-content">
  <section id="create-page" class="auth">
      <form id="create" @submit=${onCreate}>
        <div class="container">

          <h1>Create Game</h1>
          <label for="leg-title">Legendary title:</label>
          <input type="text" id="title" name="title" placeholder="Enter game title...">

          <label for="category">Category:</label>
          <input type="text" id="category" name="category" placeholder="Enter game category...">

          <label for="levels">MaxLevel:</label>
          <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

          <label for="game-img">Image:</label>
          <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

          <label for="summary">Summary:</label>
          <textarea name="summary" id="summary"></textarea>
          <input class="btn submit" type="submit" value="Create Game">
        </div>
      </form>
    </section>
  </main>
`;
