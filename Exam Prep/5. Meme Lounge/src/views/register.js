import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { username, email, password, repeatPass, gender } = Object.fromEntries(form);

    email = email.trim();

    if (username == '' || email == '' || password == '' || repeatPass == '') {
      return ctx.notify('All fields must be filled');
    }

    await api.register({ username, email, password, gender });
    e.target.reset();

    ctx.page.redirect('/all-memes');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html` <main>
    <section id="register">
      <form id="register-form" @submit=${onRegister}>
        <div class="container">
          <h1>Register</h1>
          <label for="username">Username</label>
          <input id="username" type="text" placeholder="Enter Username" name="username" />
          <label for="email">Email</label>
          <input id="email" type="text" placeholder="Enter Email" name="email" />
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Enter Password" name="password"/>
          <label for="repeatPass">Repeat Password</label>
          <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass"/>
          <div class="gender">
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked />
            <label for="male">Male</label>
          </div>
          <input type="submit" class="registerbtn button" value="Register" />
          <div class="container signin">
            <p>Already have an account?<a href="/login">Sign in</a>.</p>
          </div>
        </div>
      </form>
    </section>
  </main>`;
};
