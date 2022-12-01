import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`
    <header>
      <nav>
        <a href="/">Theater</a>
        <ul>
          ${isAuthenticated
            ? html`<li><a href="/profile">Profile</a></li>
                <li><a href="/create">Create Event</a></li>
                <li><a href="/logout">Logout</a></li>`
            : html`<li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>`}
        </ul>
      </nav>
    </header>
  `;
};
