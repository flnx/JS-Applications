const form = document.querySelector('form');
form.addEventListener('submit', onRegister);

async function onRegister(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email, password, rePass } = Object.fromEntries(formData.entries());

  if (password == '' || email == '') {
    return console.error("All fields are required!");
  }

  if (password !== rePass) {
    return console.error("Passwords don't match!");
  }

  try {
    const res = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok == false) {
      throw new Error(data.message);
    }

    sessionStorage.setItem('accessToken', data.accessToken);
    window.location = 'index.html'
  } catch (err) {
    alert(err.message);
  }
}