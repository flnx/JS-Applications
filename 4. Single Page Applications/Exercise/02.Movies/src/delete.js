import { getUserData } from './auth.js';
import { deleteReq } from './requests.js';
import { homePage } from './home.js';

export async function onDelete(e) {
  const token = getUserData().userDataInfo.accessToken;

  const movieId = e.target.getAttribute('data-id');
  deleteReq(`data/movies/${movieId}`, token);
  
  
  setTimeout(() => {
    homePage();
  }, 1);
}
