import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password, 'confirm-pass': repeatPass } = Object.fromEntries(form);

    email = email.trim();

    if (email == '' || password == '' || repeatPass == '') {
      return alert('All fields must be filled');
    }

    if (password != repeatPass) {
      return alert("Password don't match");
    }

    await api.register({ email, password });
    e.target.reset();

    ctx.page.redirect('/');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` <main id="site-content">
    <section id="register-page" class="register">
      <form id="register-form" action="" method="" @submit=${onRegister}>
        <fieldset>
          <legend>Register Form</legend>
          <p class="field">
            <label for="email">Email</label>
            <span class="input">
              <input type="text" name="email" id="email" placeholder="Email" />
            </span>
          </p>
          <p class="field">
            <label for="password">Password</label>
            <span class="input">
              <input type="password" name="password" id="password" placeholder="Password"/>
            </span>
          </p>
          <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
              <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password"/>
            </span>
          </p>
          <input class="button submit" type="submit" value="Register" />
        </fieldset>
      </form>
    </section>
  </main>`;
};
