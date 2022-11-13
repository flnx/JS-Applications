import { refreshPage } from "./refreshPage.js";
import { putLikeRequest } from "./requests.js";
import { getUserData } from "./auth.js"
import { homePage } from "./home.js"

const section = document.getElementById('add-movie');
const form = section.querySelector('form');

export function addMoviePage(_, container, footer) {
  refreshPage();
  container.insertBefore(section, footer);
}

export async function onAdd() {
  const formData = new FormData(form);

  const { title, description, img } = Object.fromEntries(formData);

  if (title == '' || description == '' || img == '') {
    return alert('All fields are required!')
  }

  const token = getUserData().userDataInfo.accessToken;

  const body = {
    title,
    description,
    img
  }
  
  putLikeRequest('data/movies', body, token);
  homePage();
  form.reset()
}