import { html } from '../lib.js';

export const navTemplate = (auth) => {
  const isAuthenticated = auth();

  return html`
    <header>
      <nav>
        <section class="logo">
          <img src="../images/logo.png" alt="logo" />
        </section>
        <ul>
          <!--Users and Guest-->
          <li><a href="/home">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          ${isAuthenticated
            ? html` <li><a href="/create">Create Postcard</a></li>
                    <li><a href="/logout">Logout</a></li>`
            : html` <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`}
        </ul>
      </nav>
    </header>
  `;
};
