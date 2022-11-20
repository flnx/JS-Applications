const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function require(method, text) {
  const options = {
    method,
    headers: {},
  };

  if (text !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify({ text });
  }

  try {
    const res = await fetch(url, options);

    if (res.ok == false) {
      const error = res.json();
      throw new Error(error);
    }

    return res.json();
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

const get = require.bind(null, 'get');
const post = require.bind(null, 'post');

export { get, post };
