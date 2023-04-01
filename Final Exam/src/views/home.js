import { html } from '../lib.js';

export const homePage = async (ctx) => {
    ctx.render(homeTemplate());
};

const homeTemplate = () => html`
    <!-- Home page -->
    <main>
        <section id="home">
            <h1>Learn more about your favorite fruits</h1>
            <img src="/images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png" alt="home" />
        </section>
    </main>
`;
