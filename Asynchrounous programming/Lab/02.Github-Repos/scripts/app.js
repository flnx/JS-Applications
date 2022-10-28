async function loadRepos() {
  const username = document.getElementById('username').value;
  const list = document.getElementById('repos');

  try {
    // sending a request which returns a promise and await kicks in so we get a response
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    
    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    // gets the json's body from the headers, await > response
    const data = await response.json();
    // displays data
    list.innerHTML = '';
    for (let repo of data) {
      list.innerHTML += `<li>
    <a href="${repo.html_url}" target="_blank">
      ${repo.full_name}
    </a>
  </li>`;
    }
  } catch (err) {
    list.innerHTML = `${err.message}`;
  }
}
