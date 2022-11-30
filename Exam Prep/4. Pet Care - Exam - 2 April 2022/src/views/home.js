import { html } from '../lib.js';

export const homePage = (ctx) => {
  ctx.render(homeTemplate())
};

const homeTemplate = (data) => html`
<main id="content"> 
  <section class="welcome-content">
    <article class="welcome-content-text">
      <h1>We Care</h1>
      <h1 class="bold-welcome">Your Pets</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
    </article>
    <article class="welcome-content-image">
      <img src="/images/header-dog.png" alt="dog" />
    </article>
  </section>
</main>
`;
