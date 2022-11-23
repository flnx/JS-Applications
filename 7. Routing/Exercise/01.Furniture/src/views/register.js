import * as user from '../api/user.js';
let html = null;
let context = null;

export function registerPage(ctx) {
  context = ctx;
  html = ctx.html;

  ctx.render(registerTemplate(ctx.html));
}

async function onSubmit(e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const { email, password, rePass } = Object.fromEntries(form);

  if (email == '' || password == '') {
    return alert('All Fields Are Required!');
  }

  if (password != rePass) {
    return alert("Passwords don't match");
  }

  await user.register({ email, password });
  context.page.redirect('/');
}

const registerTemplate = () => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
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
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input class="form-control" id="rePass" type="password" name="rePass" />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>
`;
