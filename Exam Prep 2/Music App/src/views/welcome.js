import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const welcomePage = (ctx) => {
  const isLogged = getUser();
  
  if (isLogged) {
    ctx.page.redirect('/all-memes')
  }

  ctx.render(welcomeTemplate());
};

const welcomeTemplate = (data) => html`
  <main>
    <section id="welcome">
      <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme" />
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
          <a href="/login" class="button">Login</a>
          <a href="/register" class="button">Register</a>
        </div>
      </div>
    </section>
  </main>
`;
