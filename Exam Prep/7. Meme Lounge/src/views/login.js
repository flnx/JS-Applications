import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password } = Object.fromEntries(form);
    email = email.trim();

    if (email == '' || password == '') {
      return ctx.notify('All fields are required!')
    }

    await api.login({ email, password });
    e.target.reset();
    ctx.page.redirect('/all-memes');
  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
  return html`
    <main>
      <section id="login">
        <form id="login-form" @submit=${onLogin}>
          <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text" />
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password" />
            <input type="submit" class="registerbtn button" value="Login" />
            <div class="container signin">
              <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
          </div>
        </form>
      </section>
    </main>
  `;
};
