const form = document.querySelector('form');
form.addEventListener('submit', onLogin);

async function onLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');

  if (email == '' || password == '') {
    return console.log('Fields must not be empty!');
  }

  try {
    const response = await fetch('http://localhost:3030/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok == false) {
      throw new Error(data.message);
    }

    sessionStorage.setItem('accessToken', data.accessToken);
    window.location = 'index.html';
  } catch (err) {
    alert(err.message);
  }
}