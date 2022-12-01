import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { username, password, repeatPass } = Object.fromEntries(form);

    username = username.trim();

    if (username == '' || password == '' || repeatPass == '') {
      return alert('All fields must be filled');
    }

    if (password != repeatPass) {
      return alert("Password don't match");
    }

    await api.register({ username, password });
    e.target.reset();

    ctx.page.redirect('/catalog');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` 
  <main id="site-content">
    <section id="register">
      <div class="container">
        <form id="register-form" @submit=${onRegister}>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <p>Username</p>
          <input type="text" placeholder="Enter Username" name="username" required />

          <p>Password</p>
          <input type="password" placeholder="Enter Password" name="password" required />

          <p>Repeat Password</p>
          <input type="password" placeholder="Repeat Password" name="repeatPass" required/>
          <hr />

          <input type="submit" class="registerbtn" value="Register" />
        </form>
        <div class="signin">
          <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
      </div>
    </section>
  </main>`;
};
