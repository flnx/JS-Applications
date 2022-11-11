const url = 'http://localhost:3030/data/';

export async function getRequest(path, id) {
  try {
    const response = await fetch(url + path);

    if (response.ok == false) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const movies = await response.json();
    return movies;
  } catch (error) {
    alert(error.message);
  }
}

export async function postRequest(url, id) {}

export async function putRequest(url, id) {}

export async function delRequest(url, id) {
  const response = await fetch(url, {});

  return await response.json();
}
