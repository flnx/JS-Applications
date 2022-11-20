const url = 'http://localhost:3030/jsonstore/collections/books';

async function require(method, path, data) {
  const options = {
    method,
    headers : {},
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url + path, options);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    if (res.status == 204) {
      return res;
    } else {
      return res.json();
    }


  } catch (err) {
    alert(err.message);
    throw err;
  }
}

const get = require.bind(null, 'get');
const post = require.bind(null, 'post');
const put = require.bind(null, 'put');
const del = require.bind(null, 'delete');

export { get, post, put, del as delete };