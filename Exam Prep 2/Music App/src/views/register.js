import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
    const onRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        let { email, password, ['conf-pass']: repeatPass } = Object.fromEntries(form);

        email = email.trim();

        if (email == '' || password == '') {
            return window.alert('All fields must be filled');
        }

        if (password != repeatPass) {
            return window.alert("Passwords don't match");
        }

        await api.register({ email, password });
        e.target.reset();

        ctx.page.redirect('/');
    };

    ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
    return html` <main id="main-content">
        <section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email" />

                    <label for="password" class="vhide">Password</label>
                    <input
                        id="password"
                        class="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input
                        id="conf-pass"
                        class="conf-pass"
                        name="conf-pass"
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
    </main>`;
};
