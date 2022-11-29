import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html` <header>
    <!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="" /></a>
    <nav>
      <div>
        <a href="/dashboard">Dashboard</a>
        <a href="/search">Search</a>
      </div>

      ${isAuthenticated
        ? html`<div class="user">
            <a href="/add">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>`
        : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
      <!-- Logged-in users -->

      <!-- Guest users -->
    </nav>
  </header>`;
};
