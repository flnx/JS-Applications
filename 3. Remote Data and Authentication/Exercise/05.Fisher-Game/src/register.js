document.querySelector('#home').classList.remove('active');
document.querySelectorAll('#guest a')[1].classList.add('active');
document.querySelector('form button').addEventListener('click', submitData);

const userData = JSON.parse(sessionStorage.getItem('userdata'));

if (userData !== null && userData.accessToken) {
  document.getElementById('guest').style.display = 'none';
  document.getElementById('guest').style.display = 'none';
} else {
  document.getElementById('user').style.display = 'none';
}

async function submitData(e) {
  e.preventDefault();
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const notification = document.querySelector('.notification');
  
  const { email, password, rePass } = Object.fromEntries(formData.entries());

  try {
    if (email == '' || password == '' || rePass == '') {
      throw new Error('All fields are required!');
    }

    if (password !== rePass) {
      throw new Error("Passwords don't match!");
    }

    const res = await fetch('http://localhost:3030/users/register', {
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
