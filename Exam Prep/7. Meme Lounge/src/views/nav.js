import { html } from '../lib.js';

export const navTemplate = (auth, ctx) => {
  const isAuthenticated = auth();

  return html`
    <nav>
      <a href="/all-memes">All Memes</a>
      <!-- Logged users -->
      ${isAuthenticated
        ? html` 
          <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
              <span>Welcome, ${isAuthenticated.email}</span>
              <a href="/my-profile">My Profile</a>
              <a href="/logout">Logout</a>
            </div>
          </div>`
        : html` 
          <div class="guest">
            <div class="profile">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
            <a class="active" href="/">Home Page</a>
          </div>`}
      <!-- Guest users -->
    </nav>
  `;
};
