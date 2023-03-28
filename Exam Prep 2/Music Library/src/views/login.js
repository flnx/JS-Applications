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
      <section id="login-page" class="auth">
        <form id="login" @submit=${onLogin}>
          <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password" />
            <input type="submit" class="btn submit" value="Login" />
            <p class="field">
              <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
          </div>
        </form>
      </section>
    </main>
  `;
};
