import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`
    <header>
      <!-- Navigation -->
      <h1><a class="home" href="/">GamesPlay</a></h1>
      <nav>
        <a href="/catalog">All games</a>
        ${isAuthenticated
          ? html`<div id="user">
              <a href="/create">Create Game</a>
              <a href="/logout">Logout</a>
            </div>`
          : html` <div id="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>`}
      </nav>
    </header>
  `;
};
