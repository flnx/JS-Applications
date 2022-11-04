const personField = document.getElementById('person');
const numberField = document.getElementById('phone');
const phoneBook = document.getElementById('phonebook');
const url = 'http://localhost:3030/jsonstore/phonebook';

function attachEvents() {
  document.getElementById('btnLoad').addEventListener('click', onLoad);
  document.getElementById('btnCreate').addEventListener('click', onCreate);
}

async function onCreate() {
  if (person.value == '' || numberField.value == '') {
    alert('Fields must not be empty');
  }

  const contact = {
    person: personField.value,
    phone: numberField.value,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (err) {
    alert(err.message);
  }
  onLoad();
  personField.value = '';
  numberField.value = '';
}

async function onLoad() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok == false) {
      throw new Error(data.message);
    }

    phoneBook.replaceChildren();

    Object.values(data).forEach((x) => create(x.person, x.phone, x._id));
  } catch (err) {
    alert(err.message);
  }
}

async function onDelete(e) {
  const id = e.target.id;

  await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });

  e.target.parentElement.remove();
}

function create(name, phone, id) {
  const li = document.createElement('li');
  li.textContent = `${name}: ${phone}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.id = id;
  deleteBtn.addEventListener('click', onDelete);

  li.appendChild(deleteBtn);
  phoneBook.appendChild(li);
}

attachEvents();