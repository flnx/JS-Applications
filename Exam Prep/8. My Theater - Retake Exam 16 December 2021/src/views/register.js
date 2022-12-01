import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password, repeatPassword} = Object.fromEntries(form);

    email = email.trim();

    if (email == '' || password == '' || repeatPassword == '') {
      return alert('All fields must be filled');
    }

    if (password !== repeatPassword) {
      return alert('Passwords don\'t match')
    }

    await api.register({ email, password });
    e.target.reset();
    ctx.page.redirect('/');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` 
  <main id="content">
    <section id="registerPage">
      <form class="registerForm" @submit=${onRegister}>
        <h2>Register</h2>
        <div class="on-dark">
          <label for="email">Email:</label>
          <input id="email" name="email" type="text" placeholder="steven@abv.bg" value=""/>
        </div>

        <div class="on-dark">
          <label for="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="********" value=""/>
        </div>

        <div class="on-dark">
          <label for="repeatPassword">Repeat Password:</label>
          <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value=""/>
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
          <span>If you have profile click <a href="/login">here</a></span>
        </p>
      </form>
    </section>
  </main>`;
};
