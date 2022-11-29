import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password } = Object.fromEntries(form);
    email = email.trim();

    if (email == '' || password == '') {
      return alert('Fields must not be empty');
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
      <section id="login-page" class="auth">
        <form @submit=${onLogin} id="login">
          <h1 class="title">Login</h1>

          <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email" />
          </article>

          <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password" />
          </article>

          <input type="submit" class="btn submit-btn" value="Log In" />
        </form>
      </section>
    </main>
  `;
};
