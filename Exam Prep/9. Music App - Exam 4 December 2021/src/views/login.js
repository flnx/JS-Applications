import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password } = Object.fromEntries(form);
    email = email.trim();

    if (email == '' || password == '') {
      return alert('All fields are required!');
    }

    await api.login({ email, password });
    e.target.reset();
    ctx.page.redirect('/');
  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
  return html`
    <main id="main-content">
      <section id="loginPage">
        <form @submit=${onLogin}>
          <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email"/>

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password"/>

            <button type="submit" class="login">Login</button>

            <p class="field">
              <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
          </fieldset>
        </form>
      </section>
    </main>
  `;
};
