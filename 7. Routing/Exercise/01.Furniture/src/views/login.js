import * as user from '../api/user.js';

let context = null;

export function loginPage(ctx) {
  context = ctx;
  ctx.render(loginTemplate(ctx.html));
  
}

async function onSubmit(e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const { email, password } = Object.fromEntries(form);
  
  await user.login({ email, password });
  context.page.redirect('/');
}

const loginTemplate = (html) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input class="form-control" id="password" type="password" name="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;
