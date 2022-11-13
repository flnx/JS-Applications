const url = 'http://localhost:3030/';

const url2 = 'http://localhost:3030/data/likes?where=movieId%3D%22';

export async function getRequest(path) {
  const response = await fetch(url + path);

  const moviesData = errorHandler(response);
  return moviesData;
}

export async function loginOrRegisterReq(path, userData) {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const status = errorHandler(response);

  return status;
}

export async function putRequest(path, userData, token) {
  const response = await fetch(url + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify(userData),
  });

  const status = errorHandler(response);

  return status;
}

export async function deleteReq(path, token) {
  const response = await fetch(url + path, {
    method: 'DELETE',
    headers: {
      'X-Authorization': token,
    },
  });

  const status = errorHandler(response);
  return status;
}

export async function logoutRequest(token) {
  await fetch(url + 'users/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  });
}

export async function putLikeRequest(path, userData, token) {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify(userData),
  });

  const status = errorHandler(response);

  return status;
}

export async function likesRequest(movieId) {
  const res = await fetch(`${url2}${movieId}%22&distinct=_ownerId&count`);
  const likesData = await errorHandler(res);

  return likesData;
}

export async function checkUserLikes(movieId, userId) {
  const res = await fetch(`${url2}${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
  const likeOrDislike = await errorHandler(res);

  return likeOrDislike;
}

export async function errorHandler(res) {
  try {
    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return res.json();
  } catch (error) {
    alert(error.message);
  }
}