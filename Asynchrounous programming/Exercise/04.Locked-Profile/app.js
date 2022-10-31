async function lockedProfile() {
  const mainEl = document.getElementById('main');
  document.querySelector('.profile').remove();

  const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
  const data = await res.json();

  const profiles = Object.values(data);
  profiles.map((p, i) => mainEl.appendChild(createProfile(p, i + 1)));

  function createProfile({ username, email, age }, id) {
    const div = document.createElement('div');
    div.classList.add('profile');

    div.innerHTML = `
      <img src="./iconProfile2.png" class="userIcon" />
      <label>Lock</label>
      <input type="radio" name="user${id}Locked" value="lock" checked>
      <label>Unlock</label>
      <input type="radio" name="user${id}Locked" value="unlock"><br>
      <hr>
      <label>Username</label>
      <input type="text" name="user${id}Username" value="${username}" disabled readonly />
      <div id="user${id}HiddenFields" class="hiddenInfo">
        <hr>
        <label>Email:</label>
        <input type="email" name="user${id}Email" value="${email}" disabled readonly />
        <label>Age:</label>
        <input type="email" name="user${id}Age" value="${age}" disabled readonly />
      </div>
      <button>Show more</button>
      `;
      const btn = div.querySelector('button');
      btn.addEventListener('click', () => {
      const check = div.querySelector('input[type=radio]:checked');
      const hiddenDiv = div.querySelector('div');

      if (check.value === 'unlock' && btn.textContent == 'Show more') {
        hiddenDiv.classList.toggle('hiddenInfo');
        btn.textContent = 'Show less';
      } else if (check.value === 'unlock' && btn.textContent == 'Show less'){
        hiddenDiv.classList.toggle('hiddenInfo');
        btn.textContent = 'Show more';
      }
    });
    return div;
  }
}
