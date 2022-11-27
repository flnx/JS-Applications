
import * as user from '../api.js/user.js';

let html = null;

export const createPage = (ctx) => {
  html = ctx.html;

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const { name, logoUrl, description } = Object.fromEntries(form);

    let error = null;

    if (name.length < 4) {
      error = 'Name must contain at least 4 characters';
    } else if (logoUrl.length == '' || !logoUrl.includes('.')) {
      error = 'Invalid URL';
    } else if (description.length < 10) {
      error = 'description must contain at least 10 characters';
    }

    if (error) {
      ctx.render(template(ctx.authCheck, onSubmit, error));
      return;
    }

    const data = await user.createTeam({ name, logoUrl, description });

    if (data === false) {
      ctx.render(template(ctx.authCheck, onSubmit, 'A server error has occured, please try again later.'));
      return;
    } 

    const creatorData = await setCreatorAsAMember(data);

    if (creatorData === false) {
      return alert('A server error has occured, please try again later.')
    }

    ctx.page.redirect('/browse');
  };

  ctx.render(template(ctx.authCheck, onSubmit));
};

const setCreatorAsAMember = async (teamData) => {
  const data = await user.memberRequest(teamData);

  if (data === false) {
    return alert('A server error has occured, please try again later.')
  }

  data.status = "member";
  return await user.approveRequest(data);
}


const template = (authCheck, onSubmit, error) => {
  return html`${authCheck ? createTemplate(onSubmit, error) : notFound()}`;
}
  
const notFound = () => html` <main>
  <section>
    <h1>404 Not Found</h1>
  </section>
</main>`;

const createTemplate = (onSubmit, error) => html`
  <main>
    <section id="create">
      <article class="narrow">
        <header class="pad-med">
          <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
          ${error ? html`<div class="error">${error}</div>` : null}
          <label>Team name: <input type="text" name="name" /></label>
          <label>Logo URL: <input type="text" name="logoUrl" /></label>
          <label>Description: <textarea name="description"></textarea></label>
          <input class="action cta" type="submit" value="Create Team" />
        </form>
      </article>
    </section>
  </main>
`;
