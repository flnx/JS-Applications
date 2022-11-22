import { getIdeas } from '../api/cardData.js';

const section = document.getElementById('dashboard-holder');

export async function showDashboard(ctx) {
  const cardData = await getIdeas();
  const cards = cardData.map((x) => createCardPreview(x, ctx));

  if (cards.length == 0) {
    const template = ctx.html`<h1>No ideas yet! Be the first one :)</h1>`
    ctx.render2(template, section);
  } else {
    ctx.render2(cards, section);
  }
  ctx.render(section);
}

function createCardPreview(data, ctx) {
  return ctx.html`
  <div class="card overflow-hidden current-card details" width="20rem" height="18rem">
    <div class="card-body">
      <p class="card-text">${data.title}</p>
    </div>
    <img class="card-image" src="${data.img}" alt="Card image cap">
    <a class="btn" data-id="${data._id}" href="/dashboard/${data._id}">Details</a>
  </div>
  `;
}
