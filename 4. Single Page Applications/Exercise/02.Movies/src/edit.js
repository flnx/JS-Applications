import { refreshPage } from './refreshPage.js';
import { getRequest, putRequest } from './requests.js';
import { getUserData } from './auth.js';
import { onDetails } from './details.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
const btn = form.querySelector('button');

export async function editPage(e, container, footer) {
  const movieId = e.target.getAttribute('data-id');
  const [title, textarea, image] = form.querySelectorAll('input, textarea');

  const movieData = await getRequest(`data/movies/${movieId}`);

  btn.dataset.id = movieData._id;
  btn.setAttribute('data-owner-id', movieData._ownerId);

  title.value = movieData.title;
  textarea.textContent = movieData.description;
  image.value = movieData.img;

  refreshPage();
  container.insertBefore(section, footer);
}

export function onEdit(e) {
  const movieId = e.target.getAttribute('data-id');
  const token = getUserData().userDataInfo.accessToken;
  const formData = new FormData(form);

  const { title, description, img } = Object.fromEntries(formData);

  const body = {
    title,
    description,
    img,
  };

  putRequest(`data/movies/${movieId}`, body, token);
  setTimeout(() => {
    onDetails(e)
  }, 25);
}
