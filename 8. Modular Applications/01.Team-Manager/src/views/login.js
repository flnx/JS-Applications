import * as api from '../api.js/user.js';

let html = null;
const emailPattern = /^[\w]+@[\w]+\.+[\w]+(\.?[\w]+)*$/;

export const loginPage = (ctx) => {
  html = ctx.html;

  const onLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    let { email, password } = Object.fromEntries(form);
    email = email.trim();

    const validateEmail = emailPattern.exec(email);

    let error = ctx.inputValidator('log', email, password, validateEmail);
    
    if (error) {
      return ctx.render(loginTemplate(onLogin, error));
    }
    
    const response = await api.login({ email, password });

    if (response === true) {
      ctx.page.redirect('/');
    } else {
      ctx.render(loginTemplate(onLogin, response));
    }  

  };

  ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin, error) => {
  return html` <main>
    <section id="login">
      <article class="narrow">
        <header class="pad-med">
          <h1>Login</h1>
        </header>
        <form @submit=${onLogin} id="login-form" class="main-form pad-large">
          ${error ? html`<div class="error">${error}</div>` : null}
          <label>E-mail: <input type="text" name="email" /></label>
          <label>Password: <input type="password" name="password" /></label>
          <input class="action cta" type="submit" value="Sign In" />
        </form>
        <footer class="pad-small">
          Don't have an account? <a href="#" class="invert">Sign up here</a>
        </footer>
      </article>
    </section>
  </main>`;
};
