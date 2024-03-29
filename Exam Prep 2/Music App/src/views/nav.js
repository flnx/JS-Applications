import { html } from '../lib.js';

export const navTemplate = (auth, ctx) => {
    const isAuthenticated = auth();

    return html`
        <header>
            <nav>
                <img src="/images/headphones.png" />
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    ${isAuthenticated
                        ? html`<li><a href="/create">Create Album</a></li>
                              <li><a href="/logout">Logout</a></li>`
                        : html` <li><a href="/login">Login</a></li>
                              <li><a href="/register">Register</a></li>`}
                </ul>
            </nav>
        </header>
    `;
};
