async function loadCommits() {
  // read input fieds
  const username = document.getElementById('username').value;
  const repo = document.getElementById('repo').value;
  const list = document.getElementById('commits');

  try {
    // send request
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);

    // check for errors
    if (res.ok == false) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    // display results
    const data = await res.json();
    list.innerHTML = '';

    for (let { commit } of data) {
      list.innerHTML += `<li>${commit.author.name}: ${commit.message}</li>`;
    }
  } catch (err) {
    list.innerHTML = `Error: ${err.message}`;
  }
}

