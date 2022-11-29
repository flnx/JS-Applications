import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html` <header>
    <!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="/images/logo.jpg" alt="" /></a>

    <nav>
      <div>
        <a href="/dashboard">Dashboard</a>
      </div>
      ${isAuthenticated
        ? html` <!-- Logged-in users -->
            <div class="user">
              <a href="/create">Create Offer</a>
              <a href="/logout">Logout</a>
            </div>`
        : html` <!-- Guest users -->
            <div class="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>`}
    </nav>
  </header>`;
};
