import * as api from '../api/user.js';
import { html } from '../lib.js';

export const loginPage = (ctx) => {
    const onLogin = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        let { email, password } = Object.fromEntries(form);
        email = email.trim();

        if (email == '' || password == '') {
            return alert('All fields are required!');
        }

        await api.login({ email, password });
        e.target.reset();
        ctx.page.redirect('/');
    };

    ctx.render(loginTemplate(onLogin));
};

const loginTemplate = (onLogin) => {
    return html`
        <main>
            <!-- Login Page (Only for Guest users) -->
            <section id="login">
                <div class="form">
                    <h2>Login</h2>
                    <form class="login-form" @submit=${onLogin}>
                        <input type="text" name="email" id="email" placeholder="email" />
                        <input type="password" name="password" id="password" placeholder="password" />
                        <button type="submit">login</button>
                        <p class="message">
                            Not registered? <a href="/register">Create an account</a>
                        </p>
                    </form>
                </div>
            </section>
            </main>
    `;
};
