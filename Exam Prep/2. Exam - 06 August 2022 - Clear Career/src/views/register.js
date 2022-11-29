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
    ctx.page.redirect('/');
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
  return html`
  <main>
   <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${onRegister} class="login-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password"/>
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
        <button type="submit">login</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
   </section>;
  </main>`
};