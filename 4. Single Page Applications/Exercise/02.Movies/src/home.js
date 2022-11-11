const homePage = document.getElementById('home-page');
const movieListElem = homePage.querySelector('.card-deck');


import { createElement } from './dom.js';
import { getRequest, postRequest, putRequest, delRequest } from './requests.js';


loadMovies();

async function loadMovies() {
  const moviesData = await getRequest('movies');
  const fragment = document.createDocumentFragment()
  

  if (!moviesData) {
    return
  }

  fragment.append(...moviesData.map(createElement));
  [...container.children].slice(2, -1).map(x => x.remove());
  movieListElem.appendChild(fragment);

}
