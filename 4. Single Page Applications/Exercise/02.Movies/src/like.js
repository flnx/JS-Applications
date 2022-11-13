import { getUserData } from './auth.js';
import { putLikeRequest, deleteReq, likesRequest, checkUserLikes} from './requests.js';

export async function onLike(e) {
  const token = getUserData().userDataInfo.accessToken;

  const movieId = e.target.getAttribute('data-id');
  const userId = getUserData().userDataInfo._id;

  const likeOrDislike = await checkUserLikes(movieId, userId);

  if (likeOrDislike.length == 0) {
    like(e, movieId, token);
  } else if (likeOrDislike.length == 1) {
    const likeId = likeOrDislike[0]._id;
    dislike(e, likeId, token);
  }
}

async function like(e, movieId, token) {
  putLikeRequest('data/likes', { movieId }, token);

  const btn = e.target;
  const likes = await likesRequest(movieId);

  btn.classList.add('enrolled-span');
  btn.classList.remove('btn', 'btn-primary');
  btn.innerText = `Liked ${likes}`
}

async function dislike(e, likeId, token) {
  deleteReq(`data/likes/${likeId}`, token);
  
  const btn = e.target;

  btn.classList.add('btn', 'btn-primary');
  btn.classList.remove('enrolled-span');
  btn.innerText = `Like`

}

