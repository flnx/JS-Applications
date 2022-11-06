const catches = document.getElementById('catches');
const addForm = document.getElementById('addForm');
let userData = null;

window.addEventListener('load', () => {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  catches.innerHTML = '';

  if (userData !== null) {
    document.querySelector('.add').disabled = false;
    document.getElementById('guest').style.display = 'none';
    document.querySelector('.email span').textContent = userData.email;
    onLoad();
  } else {
    document.getElementById('user').style.display = 'none';
  }

  addForm.addEventListener('submit', onAdd);
  catches.addEventListener('click', onDeleteOrUpdate);
  document.querySelector('.load').addEventListener('click', onLoad);
  document.getElementById('logout').addEventListener('click', onLogout);
});

async function onLoad() {
  const res = await fetch('http://localhost:3030/data/catches');
  const users = await res.json();

  catches.replaceChildren();
  users.forEach((user) => catches.appendChild(createElements(user)));
}

async function onAdd(e) {
  e.preventDefault();

  const formData = new FormData(addForm);

  for (let field of formData.values()) {
    if (field == '') {
      return alert('All fieelds are required!');
    }
  }

  const newCatch = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:3030/data/catches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken,
      },
      body: JSON.stringify(newCatch),
    });

    const data = await res.json();
    catches.appendChild(createElements(data));
    addForm.reset();
  } catch (err) {
    alert(err.message);
  }
}

async function onLogout() {
  await fetch('http://localhost:3030/users/logout', {
    method: 'GET',
    headers: {
      'X-Authorization': userData.accessToken,
    },
  });
  sessionStorage.clear();
  window.location = 'index.html';
}

async function onDeleteOrUpdate(e) {
  if (e.target.nodeName != 'BUTTON') {
    return;
  }

  const id = e.target.parentElement.getAttribute('data-id');
  console.log(id);

  if (e.target.textContent == 'Delete') {
    await fetch(`http://localhost:3030/data/catches/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken,
      },
    });

    e.target.parentElement.remove();
    
  } else if (e.target.textContent == 'Update') {
    const selectedElem = e.target.parentElement;
    const elemFields = selectedElem.querySelectorAll('input');

    const [angler, weight, species, location, bait, captureTime] = elemFields;

    const updateUserData = {
      angler: angler.value,
      weight: weight.value,
      species: species.value,
      location: location.value,
      bait: bait.value,
      captureTime: captureTime.value,
    };

    await fetch(`http://localhost:3030/data/catches/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.accessToken,
      },
      body: JSON.stringify(updateUserData),
    });
  }
}

function createElements(user) {
  const div = document.createElement('div');
  div.classList.add('catch');
  div.setAttribute('data-id', user._id);

  div.innerHTML = `
  <label>Angler</label>
  <input type="text" class="angler" value="${user.angler}">
  <label>Weight</label>
  <input type="text" class="weight" value='${user.weight}'>
  <label>Species</label>
  <input type="text" class="species" value="${user.species}">
  <label>Location</label>
  <input type="text" class="location" value="${user.location}">
  <label>Bait</label>
  <input type="text" class="bait" value="${user.bait}">
  <label>Capture Time</label>
  <input type="number" class="captureTime" value="${user.captureTime}">
  <button class="update" data-id="${user._id}">Update</button>
  <button class="delete" data-id="${user._id}">Delete</button>
  `;

  const hasPermission = userData && userData.id == user._ownerId;

  if (!hasPermission) {
    Array.from(div.children)
      .filter((x) => x.nodeName == 'INPUT' || 'BUTTON')
      .map((x) => (x.disabled = true));
  }
  return div;
}