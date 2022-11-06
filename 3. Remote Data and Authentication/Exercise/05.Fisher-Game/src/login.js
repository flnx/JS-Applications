document.querySelector('#home').classList.remove('active');
document.querySelectorAll('#guest a')[0].classList.add('active');
document.querySelector('form button').addEventListener('click', submitData);

const userData = JSON.parse(sessionStorage.getItem('userdata'));

if (userData !== null && userData.accessToken) {
  document.getElementById('guest').style.display = 'none';
  document.getElementById('user').style.display = 'inline-block';
} else {
  document.getElementById('guest').style.display = 'inline-block';
  document.getElementById('user').style.display = 'none';
}

async function submitData(e) {
  e.preventDefault();
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const { email, password } = Object.fromEntries(formData.entries());
  const notification = document.querySelector('.notification');

  try {
    if (email == '' || password == '') {
      throw new Error('All fields are required!');
    }

    const res = await fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    const userData = {
      email: data.email,
      id: data._id,
      accessToken: data.accessToken,
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
    window.location = 'index.html';
  } catch (err) {
    notification.textContent = err.message;
  }
}
