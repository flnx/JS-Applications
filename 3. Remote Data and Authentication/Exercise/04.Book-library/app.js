const url = 'http://localhost:3030/jsonstore/collections/books';
const table = document.querySelector('table tbody');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
const h3 = document.querySelector('form h3');
let saveId = '';

document.getElementById('loadBooks').addEventListener('click', getBooksData);
form.addEventListener('submit', submitData);

async function getBooksData() {
  try {
    const res = await fetch(url);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    table.replaceChildren();

    const entries = Object.entries(data);
    entries.forEach(([id, { author, title }]) => create(id, author, title));
  } catch (err) {
    alert(err.message);
  }
}

async function submitData(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author } = Object.fromEntries(formData.entries());

  if (title == '' || author == '') {
    alert('All fields must be filled!');
    return;
  }

  if (submitBtn.textContent == 'Save') {
    editData({ author, title });
    return;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaction/json',
      },
      body: JSON.stringify({ author, title }),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    getBooksData();
  } catch (err) {
    alert(err.message);
  }
  form.reset();
}

async function editData(body) {
  try {
    const res = await fetch(`${url}/${saveId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (err) {
    alert(err.message);
  }
  h3.textContent = 'Edit';
  submitBtn.textContent = 'Submit';
  form.reset();
  getBooksData();
}

function create(id, author, title) {
  const tr = document.createElement('tr');
  tr.id = id;

  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');

  td1.textContent = author;
  td2.textContent = title;

  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  editBtn.addEventListener('click', () => onEdit(id));
  deleteBtn.addEventListener('click', () => onDelete(id));

  [editBtn, deleteBtn].forEach((x) => td3.appendChild(x));
  [td2, td1, td3].forEach((x) => tr.appendChild(x));
  table.appendChild(tr);
}

async function onDelete(id) {
  await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  getBooksData();
}

function onEdit(id) {
  saveId = id;
  const element = document.getElementById(id).children;
  const [title, author] = element;
  h3.textContent = 'Edit FORM';
  submitBtn.textContent = 'Save';
  form.querySelector('input[name=author]').value = author.textContent;
  form.querySelector('input[name=title]').value = title.textContent;
}
