import { authCheck } from "../views/auth.js";
const url = 'http://localhost:3030/';

async function request(method, path, data) {
  const session = authCheck();
  const token = session.accessToken || null;

  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers['X-Authorization'] = token;
  }
  
  try {
    const response = await fetch(url + path, options);

    if (!response.ok) {
      if (response.status == 403) {
        sessionStorage.removeItem('userData');
      }

      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    }

    return response.json();
  } catch (error) {
    return error.message;
  }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { get, post, put, del as delete };
