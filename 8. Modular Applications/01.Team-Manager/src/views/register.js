import * as api from '../api.js/user.js';

let html = null;
const emailPattern = /^[\w]+@[\w]+\.+[\w]+(\.?[\w]+)*$/;

export const registerPage = (ctx) => {
  html = ctx.html;

  const onRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, username, password, repass } = Object.fromEntries(form);

    email = email.trim();
    username = username.trim();

    const validateEmail = emailPattern.exec(email);
    const error = ctx.inputValidator('reg', email, password, validateEmail, username, repass);

    if (error) {
      return ctx.render(registerTemplate(onRegister, error));
    }

    const response = await api.register({ email, password, username });

    if (response === true) {
      ctx.page.redirect('/');
    } else {
      ctx.render(loginTemplate(onRegister, response));
    }
  };

  ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister, error) => {
  return html` <main>
    <section id="register">
      <article class="narrow">
        <header class="pad-med">
          <h1>Register</h1>
        </header>
        <form @submit=${onRegister} id="register-form" class="main-form pad-large">
          ${error ? html`<div class="error">${error}</div>` : null}
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Username: <input type="text" name="username" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <label>Repeat: <input type="password" name="repass" /></label>
          <input class="action cta" type="submit" value="Create Account" />
        </form>
        <footer class="pad-small">
          Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
      </article>
    </section>
  </main>`;
};
