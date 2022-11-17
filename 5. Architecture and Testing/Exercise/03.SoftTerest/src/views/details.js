import { deleteCard, getDetailsById } from '../api/cardData.js';
import { createElement } from './dom.js';

const section = document.getElementById('detailsView');

let ctx = null;

export async function showDetails(context, id) {
  ctx = context;
  const data = await getDetailsById(id);

  const preview = createDetailsPreview(data);

  section.replaceChildren(preview);
  context.showSection(section);
}

export function createDetailsPreview(data) {
  const fragment = document.createDocumentFragment();

  const img = createElement('img', 'det-img');
  img.src = data.img;

  const div = createElement('div', 'desc');
  const h2 = createElement('h2', 'display-5', data.tile);
  const p = createElement('p', 'infoType', 'Description:');
  const p2 = createElement('p', 'info-description', data.description);

  div.append(h2, p, p2);
  fragment.append(img, div);

  const sessionOwner = JSON.parse(sessionStorage.getItem('userData'));
  const isOwner = sessionOwner && sessionOwner._id == data._ownerId;

  if (isOwner) {
    const div2 = createElement('div', 'text-center');
    div2.className = 'text-center';

    const deleteBtn = createElement('a', '', 'Delete');
    deleteBtn.classList.add('btn', 'detb');
    deleteBtn.href = '';

    deleteBtn.addEventListener('click', onDelete);
    deleteBtn.dataset.id = data._id;

    div2.appendChild(deleteBtn);
    fragment.appendChild(div2);
  }

  return fragment;
}

async function onDelete(e) {
  e.preventDefault();

  const popUp = confirm('Do you really want to delete this card?');

  if (popUp) {
    const target = e.target;
    const id = target.dataset.id;

    await deleteCard(id);
    ctx.goTo('/dashboard');
  }
}
