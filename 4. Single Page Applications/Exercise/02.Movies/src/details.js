import { checkUserLikes, getRequest, likesRequest } from './requests.js';
import { createDetailsPreview } from './dom.js';
import { getUserData } from './auth.js';
import { refreshPage } from './refreshPage.js';

const container = document.getElementById('container');
const footer = document.querySelector('.page-footer');

export async function onDetails(e) {
  const movieOwnerId = e.target.getAttribute('data-owner-id');
  const movieId = e.target.getAttribute('data-id');

  const movie = await getRequest('data/movies/' + movieId);

  const permissions = ownerCheck(movieOwnerId);
  let isLikedByUser = null;

  if (permissions != 'user is not logged') {
    isLikedByUser = await checkUserLikes(movieId);
  }
  // const userId = getUserData().userDataInfo._id;
  const totalLikes = await likesRequest(movieId);
  const movieElement = createDetailsPreview(movie, permissions, totalLikes, isLikedByUser);

  refreshPage()
  container.insertBefore(movieElement, footer);
}

function ownerCheck(movieOwner) {
  const data = getUserData();
  let sessionOwner = null;

  if (!data.userDataInfo) {
    return 'user is not logged';
  }

  sessionOwner = data.userDataInfo._id;
  
  if (sessionOwner == movieOwner) {
    return 'bazinga!';
  }

  return false;
}