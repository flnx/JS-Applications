import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password, 're-password': repass } = Object.fromEntries(form);

    email = email.trim();

    if (email == '' || password == '' || repass == '') {
      return alert('All fields must be filled');
    }

    await api.register({ email, password });
    e.target.reset();

    ctx.page.redirect('/');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` <main id="main-content">
    <section id="register-page" class="auth">
      <form @submit=${onRegister} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
          <label for="register-email">Email: </label>
          <input type="email" id="register-email" name="email" />
        </article>

        <article class="input-group">
          <label for="register-password">Password: </label>
          <input type="password" id="register-password" name="password" />
        </article>

        <article class="input-group">
          <label for="repeat-password">Repeat Password: </label>
          <input type="password" id="repeat-password" name="repeatPassword" />
        </article>

        <input type="submit" class="btn submit-btn" value="Register" />
      </form>
    </section>
  </main>`;
};
