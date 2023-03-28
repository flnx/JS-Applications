import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password, 'confirm-password': repeatPass } = Object.fromEntries(form);

    email = email.trim();
    console.log(repeatPass);

    if (email == '' || password == '' || repeatPass == '') {
      return alert('All fields must be filled');
    }

    if (password != repeatPass) {
      return alert('Password don\'t match')
    }

    await api.register({ email, password });
    e.target.reset();

    ctx.page.redirect('/');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` <main id="content">
    <section id="register-page" class="content auth">
      <form id="register" @submit=${onRegister}>
        <div class="container">
          <div class="brand-logo"></div>
          <h1>Register</h1>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="maria@email.com" />

          <label for="pass">Password:</label>
          <input type="password" name="password" id="register-password" />

          <label for="con-pass">Confirm Password:</label>
          <input type="password" name="confirm-password" id="confirm-password" />

          <input class="btn submit" type="submit" value="Register" />

          <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
          </p>
        </div>
      </form>
    </section>
  </main>`;
};
