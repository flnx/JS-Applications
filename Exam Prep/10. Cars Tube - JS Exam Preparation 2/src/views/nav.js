import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`
    <header>
      <nav>
        <a class="active" href="/">Home</a>
        <a href="/catalog">All Listings</a>
        <a href="/search-page">By Year</a>
        ${!isAuthenticated
          ? html` <div id="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>`
          : html`<div id="profile">
              <a>Welcome ${isAuthenticated.username}</a>
              <a href="/my-listings">My Listings</a>
              <a href="/create">Create Listing</a>
              <a href="/logout">Logout</a>
            </div>`}
      </nav>
    </header>
  `;
};
