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
    <main id="site-content">
      <section id="login-page" class="login">
        <form id="login-form" action="" method="" @submit=${onLogin}>
          <fieldset>
            <legend>Login Form</legend>
            <p class="field">
              <label for="email">Email</label>
              <span class="input">
                <input type="text" name="email" id="email" placeholder="Email" />
              </span>
            </p>
            <p class="field">
              <label for="password">Password</label>
              <span class="input">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </span>
            </p>
            <input class="button submit" type="submit" value="Login" />
          </fieldset>
        </form>
      </section>
    </main>
  `;
};
