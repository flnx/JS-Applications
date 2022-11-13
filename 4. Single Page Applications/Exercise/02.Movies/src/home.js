import { checkAuthorization } from './auth.js';
import { createElement } from './dom.js';
import { refreshPage } from './refreshPage.js';
import { getRequest } from './requests.js';

const container = document.getElementById('container');
const footer = document.querySelector('.page-footer');

const homePageElem = document.getElementById('home-page');
const ulMovies = homePageElem.querySelector('#movies-list');

export async function homePage() {
  const moviesData = await getRequest('data/movies');

  if (!moviesData) {
    return;
  }

  checkAuthorization();
  refreshPage();

  const fragment = document.createDocumentFragment();
  fragment.append(...moviesData.map(createElement));

  ulMovies.replaceChildren(fragment);
  container.insertBefore(homePageElem, footer);
}
