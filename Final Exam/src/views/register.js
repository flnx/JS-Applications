import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
    const onRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        let { email, password, 're-password': repeatPass } = Object.fromEntries(form);

        email = email.trim();

        if (email == '' || password == '' || repeatPass == '') {
            return alert('All fields must be filled');
        }

        if (password != repeatPass) {
            return alert("Password don't match");
        }

        await api.register({ email, password });
        e.target.reset();

        ctx.page.redirect('/');
    };

    ctx.render(registerTemplate(onRegister));
};

export const registerTemplate = (onRegister) => {
    return html` <main>
        <!-- Register Page (Only for Guest users) -->
        <section id="register" @submit=${onRegister}>
            <div class="form">
                <h2>Register</h2>
                <form class="register-form">
                    <input type="text" name="email" id="register-email" placeholder="email" />
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                    />
                    <input
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                    />
                    <button type="submit">register</button>
                    <p class="message">Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </section>
    </main>`;
};
