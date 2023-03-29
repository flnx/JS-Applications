import * as api from '../api/user.js';
import { html } from '../lib.js';

export const registerPage = (ctx) => {
    const onRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        let { email, password, 're-password': repeatPass } = Object.fromEntries(form);

        console.log(password, repeatPass);

        email = email.trim();
        console.log(repeatPass);

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
    return html` <main id="content">
        <main>
            <!-- Register Page (Only for Guest users) -->
            <section id="register">
                <div class="form">
                    <h2>Register</h2>
                    <form class="login-form" @submit=${onRegister}>
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
        </main>
    </main>`;
};
