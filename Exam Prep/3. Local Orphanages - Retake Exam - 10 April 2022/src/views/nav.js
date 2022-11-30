import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`<header>
    <!-- Navigation -->
    <h1><a href="/">Orphelp</a></h1>

    <nav>
      <a href="/dashboard">Dashboard</a>

      <!-- Logged-in users -->
      ${isAuthenticated
        ? html`<div id="user">
            <a href="/my-posts">My Posts</a>
            <a href="/create">Create Post</a>
            <a href="/logout">Logout</a>
          </div>`
        : html`<div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
    </nav>
  </header>`;
};
