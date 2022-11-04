const table = document.querySelector("#results tbody");
const submit = document.getElementById('submit');
const url = 'http://localhost:3030/jsonstore/collections/students';
document.getElementById('form').addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  for (const field of formData) {
    if (field[1] == '') {
      alert('All fields must be filled!')
      return;
    }
  }

  const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData);

  submitData({ firstName, lastName, facultyNumber, grade });
}

async function submitData(student) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message)
    }

    const data = await res.json();
    table.replaceChildren();
    getStudents();
  } catch(err) {

  }
}

async function getStudents() {
  const res = await fetch(url);
  const data = await res.json();

  Object.values(data).forEach(x => {
    create(x.firstName, x.lastName, x.facultyNumber, x.grade)
  })
}

function create(fname, lname, facNum, grade) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td')
  const td2 = document.createElement('td')
  const td3 = document.createElement('td')
  const td4 = document.createElement('td')

  td1.textContent = fname;
  td2.textContent = lname;
  td3.textContent = facNum;
  td4.textContent = grade;

  [td1, td2, td3, td4].forEach(x => tr.appendChild(x));
  table.appendChild(tr);
}

getStudents();