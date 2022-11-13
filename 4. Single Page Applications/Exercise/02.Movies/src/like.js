import { getUserData } from './auth.js';
import { errorHandler, likeRequest, deleteReq} from './requests.js';

const url = 'http://localhost:3030/data/likes?where=movieId%3D%22';

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
  likeRequest('data/likes', { movieId }, token);

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

export async function checkUserLikes(movieId) {
  const userId = getUserData().userDataInfo._id;

  const res = await fetch(`${url}${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
  const likeOrDislike = await errorHandler(res);

  return likeOrDislike;
}

export async function likesRequest(movieId) {
  try {
    const res = await fetch(`${url}${movieId}%22&distinct=_ownerId&count`);
    const likesData = await res.json();

    if (res.ok == false) {
      throw new Error(likesData.message);
    }
    return likesData;
  } catch (err) {
    console.log(err.message);
  }
}
