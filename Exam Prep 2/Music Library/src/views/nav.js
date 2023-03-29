import { html } from '../lib.js';

export const navTemplate = (auth) => {
    const isAuthenticated = auth();

    return html`
        <header>
            <!-- Navigation -->
            <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

            <nav>
                <div>
                    <a href="/catalog">Dashboard</a>
                </div>
                ${isAuthenticated
                    ? html`<div class="user">
                          <a href="/create">Add Album</a>
                          <a href="/logout">Logout</a>
                      </div>`
                    : html` <div class="guest">
                          <a href="/login">Login</a>
                          <a href="/register">Register</a>
                      </div>`}
            </nav>
        </header>
    `;
};
