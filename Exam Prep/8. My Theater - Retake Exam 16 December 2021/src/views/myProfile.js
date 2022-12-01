import { getMyInfo } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const myProfilePage = async (ctx) => {
  const user = getUser();
  const data = await getMyInfo(user._id);

  ctx.render(myProfileTemplate(data, user));
};

const myProfileTemplate = (data, user) => html`
  <main id="content">
    <section id="profilePage">
      <div class="userInfo">
        <div class="avatar">
          <img src="./images/profilePic.png" />
        </div>
        <h2>${user.email}</h2>
      </div>
      <div class="board">
        ${data.length > 0
          ? data.map(cardTemplate)
          : html` <div class="no-events">
              <p>This user has no events yet!</p>
            </div>`}
      </div>
    </section>
  </main>
`;

const cardTemplate = (data) => html`
<div class="eventBoard">
  <div class="event-info">
    <img src="${data.imageUrl}" />
    <h2>${data.title}</h2>
    <h6>${data.date}</h6>
    <a href="/details/${data._id}" class="details-button">Details</a>
  </div>
</div>
`;
