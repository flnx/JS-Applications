const url = 'http://localhost:3030/';

async function request(method, path, data) {
  const session = JSON.parse(sessionStorage.getItem('userData'));
  const options = {
    method,
    headers: {}
  }

  if (session) {
   options.headers['X-Authorization'] = session.accessToken;
  }

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url + path, options);

    if (res.ok == false) {
      if (res.status == 403) {
        sessionStorage.removeItem('userData');
      }

      const error = await res.json();
      throw new Error(error.message);
    }

    if(res.status == 204) {
      return res;
    } else {
      return res.json();
    }
   
  } catch(err) {
    alert(err.message);
    throw err;
  }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
  get,
  post,
  put,
  del as delete
}