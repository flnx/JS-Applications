import { userProfile } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const myProfilePage = async (ctx) => {
  const user = getUser();
  
  const data = await userProfile(user._id);

  ctx.render(myProfileTemplate(data, user));
};

const myProfileTemplate = (data, user) => html`
  <main>
    <section id="user-profile-page" class="user-profile">
      <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender == 'male' ? 'male' : 'female'}.png" />
        <div class="user-content">
          <p>Username: ${user.username}</p>
          <p>Email: ${user.email}</p>
          <p>My memes count: ${data.length}</p>
        </div>
      </article>
      <h1 id="user-listings-title">User Memes</h1>
      <div class="user-meme-listings">
        ${data.length > 0
        ? data.map(cardTemplate)
        : html`<p class="no-memes">No memes in database.</p>`}   
      </div>
    </section>
  </main>
`;

const cardTemplate = (card) => html`
<div class="user-meme">
  <p class="user-meme-title">${card.title}</p>
  <img class="userProfileImage" alt="meme-img" src="${card.imageUrl}" />
  <a class="button" href="/details/${card._id}">Details</a>
</div>
`;
