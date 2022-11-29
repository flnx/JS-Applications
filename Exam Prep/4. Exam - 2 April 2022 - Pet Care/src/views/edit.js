import { editItem, getItemDetails } from '../api/data.js';
import { html } from '../lib.js';

export const editPage = async (ctx) => {
  const data = await getItemDetails(ctx.params.id);

  console.log(data);

  const onEdit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const item = Object.assign({}, Object.fromEntries(form));

    const hasEmptyField = Object.values(item).some((x) => x == '');

    
    if (hasEmptyField) {
      return alert('All fields are required');
    }
    
    await editItem(ctx.params.id, item);
    console.log(data);
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (card, onEdit) => html`
  <main id="content">
    <section id="editPage">
      <form @submit=${onEdit} class="editForm">
        <img src="${card.image}" />
        <div>
          <h2>Edit PetPal</h2>
          <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" value="Max" .value=${card.name} />
          </div>
          <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" value="Shiba Inu" .value=${card.breed}>
          </div>
          <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" value="2 years" .value=${card.age}>
          </div>
          <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" value="5kg" .value=${card.weight}>
          </div>
          <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" value="../image/dog.jpeg" .value=${card.image} />
          </div>
          <button class="btn" type="submit">Edit Pet</button>
        </div>
      </form>
    </section>
  </main>
`;
