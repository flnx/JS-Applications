import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`
    <header id="site-header">
      <!-- Navigation -->
      <nav class="navbar">
        <section class="navbar-dashboard">
          <a href="/">Dashboard</a>
          ${isAuthenticated
            ? html` <div id="user">
                <span>Welcome, ${isAuthenticated.email}</span>
                <a class="button" href="/my-books">My Books</a>
                <a class="button" href="/create">Add Book</a>
                <a class="button" href="/logout">Logout</a>
              </div>`
            : html` <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
              </div>`}
        </section>
      </nav>
    </header>
  `;
};
