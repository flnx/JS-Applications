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
    ctx.page.redirect('/');
  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
  return html`
    <main>
      <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </section>
    </main>
  `;
};
