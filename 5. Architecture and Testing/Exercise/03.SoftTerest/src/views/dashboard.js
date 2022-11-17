import { getIdeas } from "../api/cardData.js";

const section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetails);

let ctx = null;

export async function showDashboard(context) {
  ctx = context;
  context.showSection(section);

  const cardData = await getIdeas();

  if (cardData.length == 0) {
    section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`
  } else {
    const cards = cardData.map(createCardPreview);
    section.replaceChildren(...cards);
  }
}

function createCardPreview(data) {
  const div = document.createElement('div');
  div.classList.add('card', 'overflow-hidden', 'current-card', 'details');
  div.style.width = '20rem';
  div.style.height = '18rem';

  div.innerHTML = `
    <div class="card-body">
      <p class="card-text">${data.title}</p>
    </div>
    <img class="card-image" src="${data.img}" alt="Card image cap">
    <a class="btn" data-id="${data._id}" href="">Details</a>`;
    return div;
}

export async function onDetails(e) {
  e.preventDefault();
  const target = e.target;

  if (target.tagName != 'A') {
    return;
  }

  const id = e.target.dataset.id;
  ctx.goTo('/details', id);
}
