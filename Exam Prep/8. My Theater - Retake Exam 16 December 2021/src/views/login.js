import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password } = Object.fromEntries(form);
    email = email.trim();

    if (email == '' || password == '') {
      return alert('All fields are required!')
    }

    await api.login({ email, password });
    e.target.reset();
    ctx.page.redirect('/');
  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
  return html`
    <main id="content">
      <section id="loginaPage">
        <form class="loginForm" @submit=${onLogin}>
          <h2>Login</h2>
          <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
          </div>
          <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
          </div>

          <button class="btn" type="submit">Login</button>

          <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
          </p>
        </form>
      </section>
    </main>
  `;
};
