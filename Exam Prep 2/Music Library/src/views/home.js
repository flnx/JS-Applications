import { html } from '../lib.js';

export const homePage = async (ctx) => {
    ctx.render(homeTemplate());
};

const homeTemplate = (data) => html`
    <!-- Home page -->
    <main>
        <section id="home">
            <img src="./images/landing.png" alt="home" />

            <h2 id="landing-text">
                <span>Add your favourite albums</span> <strong>||</strong>
                <span>Discover new ones right here!</span>
            </h2>
        </section>
    </main>
`;