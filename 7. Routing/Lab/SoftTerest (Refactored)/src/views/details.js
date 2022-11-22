import { deleteCard, getDetailsById } from '../api/cardData.js';

const section = document.getElementById('detailsView');
let ctx = null;

export async function showDetails(context) {
  ctx = context;

  const data = await getDetailsById(context.params._id);
  const preview = createDetailsPreview(data);

  ctx.render2(preview(), section);
  context.render(section);
}

export function createDetailsPreview(data) {
  const sessionOwner = JSON.parse(sessionStorage.getItem('userData'));
  const isOwner = sessionOwner && sessionOwner._id == data._ownerId;

  const template = () => ctx.html`
    <img class="det-img" src="/${data.img}" />
    <div class="desc">
      <h2 class="display-5">${data.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${data.description}</p>
    </div>
    ${isOwner ? ctx.html`
      <div class="text-center">
        <a class="btn detb" data-id="${data._id}" href="" @click=${onDelete}>
          Delete
        </a>
      </div>
     ` : '' 
    }`;

  return template;
}

async function onDelete(e) {
  e.preventDefault();

  const popUp = confirm('Do you really want to delete this card?');

  if (popUp) {
    const target = e.target;
    const id = target.dataset.id;

    await deleteCard(id);
    ctx.page.redirect('/dashboard');
  }
}