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
    e.target.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  };

  ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (data, onEdit) => html`
  <main id="main-content">
    <section id="edit-page" class="auth">
      <form id="edit" @submit=${onEdit}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
          <label for="title">Post Title</label>
          <input type="title" name="title" id="title" value="" .value=${data.title} />
        </article>

        <article class="input-group">
          <label for="description">Description of the needs </label>
          <input type="text" name="description" id="description" value="" .value=${data.description}/>
        </article>

        <article class="input-group">
          <label for="imageUrl"> Needed materials image </label>
          <input type="text" name="imageUrl" id="imageUrl" value="" .value=${data.imageUrl}/>
        </article>

        <article class="input-group">
          <label for="address">Address of the orphanage</label>
          <input type="text" name="address" id="address" value="" .value=${data.address}/>
        </article>

        <article class="input-group">
          <label for="phone">Phone number of orphanage employee</label>
          <input type="text" name="phone" id="phone" value="" .value=${data.phone}/>
        </article>

        <input type="submit" class="btn submit" value="Edit Post" />
      </form>
    </section>
  </main>
`;
