import { html } from '../lib.js';
import { getItems } from '../api/data.js';

export const welcomePage = async(ctx) => {
  const data = await getItems();
  ctx.render(welcomeTemplate(data));
};

const welcomeTemplate = (data) => html`
  <main id="content">
    <section class="welcomePage">
      <div id="welcomeMessage">
        <h1>My Theater</h1>
        <p>
          Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating
          Members, theatre professionals, theatre organizations, theatre universities and
          theatre lovers all over the world on the 27th of March. This day is a
          celebration for those who can see the value and importance of the art form
          “theatre”, and acts as a wake-up-call for governments, politicians and
          institutions which have not yet recognised its value to the people and to the
          individual and have not yet realised its potential for economic growth.
        </p>
      </div>
      <div id="events">
        <h1>Future Events</h1>
        <div class="theaters-container">
          <!--Created Events-->
          ${data.length > 0
            ? data.map(cardTemplate)
            : html`<h4 class="no-event">No Events Yet...</h4>`}
        </div>
      </div>
    </section>
  </main>
`;

const cardTemplate = (data) => html`
  <div class="eventsInfo">
    <div class="home-image">
      <img src="${data.imageUrl}" />
    </div>
    <div class="info">
      <h4 class="title">${data.title}</h4>
      <h6 class="date">${data.date}</h6>
      <h6 class="author">${data.author}</h6>
      <div class="info-buttons">
        <a class="btn-details" href="/details/${data._id}">Details</a>
      </div>
    </div>
  </div>
`;
