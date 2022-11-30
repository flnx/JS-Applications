import { getUserPosts } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const myPostsPage = async (ctx) => {
  const user = getUser();
  const data = await getUserPosts(user._id);

  ctx.render(myPostsTemplate(data));
};


const myPostsTemplate = (items) => html`
  <main id="main-content">
   <section id="my-posts-page">
      <h1 class="title">My Posts</h1>
      ${items.length > 0
        ? html` <div class="my-posts">${items.map(cardTemplate)}</div> `
        : html` <h1 class="title no-posts-title">You have no posts yet!</h1>`}
    </section>
  </main>
`;

const cardTemplate = (card) => html`
  <div class="post">
    <h2 class="post-title">${card.title}</h2>
    <img class="post-image" src="${card.imageUrl}" alt="Kids clothes" />
    <div class="btn-wrapper">
      <a href="/details/${card._id}" class="details-btn btn">Details</a>
    </div>
  </div>
`;
