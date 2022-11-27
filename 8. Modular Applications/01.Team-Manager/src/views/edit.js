import { getDetails, updateTeamRequest } from '../api.js/data.js';

let html = null;

export const editPage = async (ctx) => {
  html = ctx.html;

  const data = await getDetails(ctx.params.id);
  const owner = ctx.authCheck._id;

  if (data._ownerId != owner) {
    alert('Unauthorized!');
    ctx.page.redirect('/');
  }

  const { description, logoUrl, name } = data;

  const onSave = async(e) => {
    e.preventDefault();
    
    const { name, logoUrl, description } = Object.fromEntries(new FormData(e.target));
    
    let error = null;

    if (name.length < 4) {
      error = 'Name must contain at least 4 characters';
    } else if (logoUrl.length == '' || !logoUrl.includes('.')) {
      error = 'Invalid URL';
    } else if (description.length < 10) {
      error = 'description must contain at least 10 characters';
    }

    if (error) {
      ctx.render(editTemplate(description, logoUrl, name, onSave, error))
      return;
    }
    console.log(logoUrl);
    await updateTeamRequest(ctx.params.id, { name, logoUrl, description });
    ctx.page.redirect(`/details/${ctx.params.id}`);
  }

  ctx.render(editTemplate(description, logoUrl, name, onSave));
};

const editTemplate = (description, logoUrl, name, onSave, error) => html`
  <main>
    <section id="edit">
      <article class="narrow">
        <header class="pad-med">
          <h1>Edit Team</h1>
        </header>
        <form @submit=${onSave} id="edit-form" class="main-form pad-large">
          ${error ? html`<div class="error">${error}</div>` : null}
          <label>Team name: <input type="text" name="name" .value=${name}></label>
          <label>Logo URL: <input type="text" name="logoUrl" .value=${logoUrl}></label>
          <label>Description: <textarea name="description">${description}</textarea></label>
          <input class="action cta" type="submit" value="Save Changes" />
        </form>
      </article>
    </section>
  </main>
`;
