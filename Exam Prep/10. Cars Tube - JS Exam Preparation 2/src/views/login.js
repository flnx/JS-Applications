import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { username, password } = Object.fromEntries(form);
    username = username.trim();

    if (username == '' || password == '') {
      return alert('All fields are required!');
    }

    await api.login({ username, password });
    e.target.reset();
    ctx.page.redirect('/catalog');
  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
  return html`
    <main id="site-content">
      <section id="login">
        <div class="container">
          <form id="login-form" action="#" method="post" @submit=${onLogin}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr />

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text" />

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" />
            <input type="submit" class="registerbtn" value="Login" />
          </form>
          <div class="signin">
            <p>Dont have an account? <a href="/register">Sign up</a>.</p>
          </div>
        </div>
      </section>
    </main>
  `;
};
