const url = 'http://localhost:3030/';

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
      'X-Authorization': token
    },
    body: JSON.stringify(userData),
  });

  const status = errorHandler(response);

  return status;
}

export async function likeRequest(path, userData, token) {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
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
      'X-Authorization': token
    }
  });

  const status = errorHandler(response);
  return status;
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